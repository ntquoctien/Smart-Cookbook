import { StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { MainTabParamList, RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { AppCard } from '../../components/ui/AppCard';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = BottomTabScreenProps<MainTabParamList, 'CameraScan'>;

export function CameraScanScreen({ navigation }: Props) {
  const rootNavigation = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Camera Scan</Text>
      <Text style={styles.subtitle}>
        Phase 1 uses a placeholder camera surface so the flow can be tested manually.
      </Text>

      <View style={styles.preview}>
        <Text style={styles.previewIcon}>📷</Text>
        <Text style={styles.previewText}>Camera preview placeholder</Text>
        <Text style={styles.previewHint}>Supports multiple ingredient photos in a later phase.</Text>
      </View>

      <AppCard style={styles.card}>
        <Text style={styles.cardTitle}>Instructions</Text>
        <Text style={styles.cardText}>Keep ingredients well lit, fill the frame, and capture from above.</Text>
        <Text style={styles.cardText}>Multiple photos selected: 2</Text>
      </AppCard>

      <View style={styles.actions}>
        <AppButton label="Capture photo" onPress={() => rootNavigation?.navigate('ImagePreview')} />
        <AppButton label="Upload from gallery" variant="secondary" onPress={() => rootNavigation?.navigate('ImagePreview')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.lg,
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  preview: {
    marginTop: spacing.xl,
    minHeight: 360,
    borderRadius: 30,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  previewIcon: {
    fontSize: 48,
  },
  previewText: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.lg,
    color: colors.white,
  },
  previewHint: {
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  card: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  cardTitle: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  cardText: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  actions: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
});
