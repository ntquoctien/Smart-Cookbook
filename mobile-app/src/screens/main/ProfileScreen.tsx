import { StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { MainTabParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { AppCard } from '../../components/ui/AppCard';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = BottomTabScreenProps<MainTabParamList, 'Profile'>;

const settings = ['Diet preferences', 'Cooking level', 'Notifications', 'Saved ingredients'];

export function ProfileScreen({ navigation }: Props) {
  const handleLogout = () => {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'AuthFlow' as never }],
    });
  };

  return (
    <ScreenContainer>
      <SectionHeader title="Profile" subtitle="Your mock cooking identity for Phase 1." />

      <AppCard style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>KE</Text>
        </View>
        <Text style={styles.name}>Kitchen Explorer</Text>
        <Text style={styles.email}>chef@smartcookbook.ai</Text>
        <View style={styles.badges}>
          <Text style={styles.badge}>Healthy focus</Text>
          <Text style={styles.badge}>Beginner-friendly</Text>
        </View>
      </AppCard>

      <View style={styles.section}>
        {settings.map((item) => (
          <AppCard key={item} style={styles.settingRow}>
            <Text style={styles.settingText}>{item}</Text>
            <Text style={styles.settingArrow}>›</Text>
          </AppCard>
        ))}
      </View>

      <AppButton label="Log out" variant="secondary" onPress={handleLogout} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    marginTop: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.chipBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xl,
    color: colors.primary,
  },
  name: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.xl,
    color: colors.textPrimary,
  },
  email: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  badge: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
  section: {
    marginVertical: spacing.xl,
    gap: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  settingArrow: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xl,
    color: colors.primary,
  },
});
