import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { MainTabParamList } from '../../types';
import { PreferenceChip } from '../../components/recipe/PreferenceChip';
import { AppButton } from '../../components/ui/AppButton';
import { AppCard } from '../../components/ui/AppCard';
import { AppInput } from '../../components/ui/AppInput';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = BottomTabScreenProps<MainTabParamList, 'Profile'>;

const preferenceOptions = ['Healthy focus', 'Budget cooking', 'Quick meals', 'High protein'];

export function ProfileScreen({ navigation }: Props) {
  const userProfile = useAppStore((state) => state.userProfile);
  const updateUserProfile = useAppStore((state) => state.updateUserProfile);
  const [name, setName] = useState(userProfile.name);
  const [cookingLevel, setCookingLevel] = useState(userProfile.cookingLevel);
  const [dietPreferences, setDietPreferences] = useState(userProfile.dietPreferences);

  useEffect(() => {
    setName(userProfile.name);
    setCookingLevel(userProfile.cookingLevel);
    setDietPreferences(userProfile.dietPreferences);
  }, [userProfile]);

  const togglePreference = (preference: string) => {
    setDietPreferences((current) =>
      current.includes(preference)
        ? current.filter((item) => item !== preference)
        : [...current, preference]
    );
  };

  const handleLogout = () => {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'AuthFlow' as never }],
    });
  };

  return (
    <ScreenContainer>
      <SectionHeader title="Profile" subtitle="Your local cooking preferences and saved identity." />

      <AppCard style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name.slice(0, 2).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
        <View style={styles.badges}>
          {dietPreferences.map((preference) => (
            <Text key={preference} style={styles.badge}>
              {preference}
            </Text>
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.section}>
        <AppInput label="Display name" placeholder="Your name" value={name} onChangeText={setName} />
        <AppInput label="Cooking level" placeholder="Beginner-friendly" value={cookingLevel} onChangeText={setCookingLevel} />
        <Text style={styles.preferenceLabel}>Diet preferences</Text>
        <View style={styles.preferenceWrap}>
          {preferenceOptions.map((preference) => (
            <PreferenceChip
              key={preference}
              label={preference}
              selected={dietPreferences.includes(preference)}
              onPress={() => togglePreference(preference)}
            />
          ))}
        </View>
        <AppButton
          label="Save profile changes"
          onPress={() =>
            void updateUserProfile({
              name,
              cookingLevel,
              dietPreferences,
            })
          }
        />
      </AppCard>

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
  preferenceLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.textPrimary,
  },
  preferenceWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
