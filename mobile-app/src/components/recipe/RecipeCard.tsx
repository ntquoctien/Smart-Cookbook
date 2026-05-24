import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Recipe } from '../../types/recipe';
import { colors } from '../../styles/colors';
import { radius } from '../../styles/radius';
import { spacing } from '../../styles/spacing';
import { shadows } from '../../styles/shadows';
import { fontFamilies, fontSizes } from '../../styles/typography';
import { formatMinutes } from '../../utils/formatters';

type RecipeCardProps = {
  recipe: Recipe;
  onPress: () => void;
  compact?: boolean;
};

export function RecipeCard({
  recipe,
  onPress,
  compact = false,
}: RecipeCardProps) {
  return (
    <Pressable style={[styles.card, compact && styles.compact]} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={[styles.image, compact && styles.compactImage]} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.textContent}>
            <Text style={styles.name}>{recipe.name}</Text>
            <Text style={styles.description} numberOfLines={compact ? 2 : 3}>
              {recipe.description}
            </Text>
          </View>
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{recipe.matchScore}%</Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>⏱ {formatMinutes(recipe.cookingTimeMinutes)}</Text>
          <Text style={styles.meta}>📈 {recipe.difficulty}</Text>
          <Text style={styles.meta}>🥣 {recipe.servings}</Text>
        </View>
        <Text style={styles.ingredients}>
          Có sẵn: {recipe.availableIngredients.join(', ')}
        </Text>
        {recipe.missingIngredients.length ? (
          <Text style={styles.missing}>
            Thiếu: {recipe.missingIngredients.join(', ')}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.divider,
    ...shadows.card,
  },
  compact: {
    width: 280,
  },
  image: {
    width: '100%',
    height: 170,
  },
  compactImage: {
    height: 150,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  textContent: {
    flex: 1,
  },
  name: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.lg,
    color: colors.textPrimary,
  },
  description: {
    marginTop: 4,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  matchBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  matchText: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  meta: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.textPrimary,
  },
  ingredients: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    color: colors.secondary,
  },
  missing: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    color: colors.warning,
  },
});
