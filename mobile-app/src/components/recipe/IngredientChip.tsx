import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../styles/colors';
import { radius } from '../../styles/radius';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type IngredientChipProps = {
  label: string;
  variant?: 'available' | 'missing';
};

export function IngredientChip({
  label,
  variant = 'available',
}: IngredientChipProps) {
  const isAvailable = variant === 'available';

  return (
    <View style={[styles.chip, isAvailable ? styles.available : styles.missing]}>
      <Text style={styles.emoji}>{isAvailable ? '✓' : '•'}</Text>
      <Text style={[styles.label, isAvailable ? styles.availableLabel : styles.missingLabel]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  available: {
    backgroundColor: '#EAF8EC',
  },
  missing: {
    backgroundColor: '#FFF1DD',
  },
  emoji: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  label: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
  },
  availableLabel: {
    color: colors.secondary,
  },
  missingLabel: {
    color: colors.warning,
  },
});
