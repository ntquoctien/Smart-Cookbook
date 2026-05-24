import { StyleSheet, Text, View } from 'react-native';

import type { RecipeStep } from '../../types/recipe';
import { colors } from '../../styles/colors';
import { radius } from '../../styles/radius';
import { spacing } from '../../styles/spacing';
import { shadows } from '../../styles/shadows';
import { fontFamilies, fontSizes } from '../../styles/typography';

type CookingStepCardProps = {
  step: RecipeStep;
  totalSteps: number;
};

export function CookingStepCard({
  step,
  totalSteps,
}: CookingStepCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          Bước {step.step}/{totalSteps}
        </Text>
      </View>
      <Text style={styles.title}>{step.title}</Text>
      <Text style={styles.instruction}>{step.instruction}</Text>
      {step.timeMinutes ? (
        <Text style={styles.helper}>Thời gian gợi ý: khoảng {step.timeMinutes} phút</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
    ...shadows.card,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.chipBackground,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  badgeText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
  title: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.xl,
    color: colors.textPrimary,
  },
  instruction: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  helper: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
});
