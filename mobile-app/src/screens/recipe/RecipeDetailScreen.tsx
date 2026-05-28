import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { EmptyState } from '../../components/ui/EmptyState';
import { IngredientChip } from '../../components/recipe/IngredientChip';
import { mockRecipes } from '../../data/mockRecipes';
import { cookingMockService } from '../../services/cookingMockService';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../styles/colors';
import { radius } from '../../styles/radius';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';
import { formatMinutes } from '../../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

export function RecipeDetailScreen({ navigation, route }: Props) {
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);
  const recommendedRecipes = useAppStore((state) => state.recommendedRecipes);
  const setSelectedRecipe = useAppStore((state) => state.setSelectedRecipe);
  const setCurrentCookingSession = useAppStore((state) => state.setCurrentCookingSession);
  const recipe =
    selectedRecipe ??
    recommendedRecipes.find((item) => item.id === route.params?.recipeId) ??
    mockRecipes.find((item) => item.id === route.params?.recipeId) ??
    null;

  if (!recipe) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <EmptyState
          icon="🍽️"
          title="Recipe not available"
          message="Select a recommendation first so we can open the detail view."
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.panel}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.description}>{recipe.description}</Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{recipe.matchScore}%</Text>
            <Text style={styles.statLabel}>Match</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{formatMinutes(recipe.cookingTimeMinutes)}</Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{recipe.difficulty}</Text>
            <Text style={styles.statLabel}>Difficulty</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{recipe.servings}</Text>
            <Text style={styles.statLabel}>Servings</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available ingredients</Text>
        <View style={styles.chips}>
          {recipe.availableIngredients.map((item) => (
            <IngredientChip key={item} label={item} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Missing ingredients</Text>
        <View style={styles.chips}>
          {recipe.missingIngredients.map((item) => (
            <IngredientChip key={item} label={item} variant="missing" />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Steps preview</Text>
        <View style={styles.steps}>
          {recipe.steps.map((step) => (
            <View key={step.step} style={styles.stepRow}>
              <Text style={styles.stepNumber}>{step.step}</Text>
              <View style={styles.stepCopy}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepText}>{step.instruction}</Text>
              </View>
            </View>
          ))}
        </View>

        <AppButton
          label="Start Cooking"
          onPress={() => {
            setSelectedRecipe(recipe);
            setCurrentCookingSession(cookingMockService.createSession(recipe));
            navigation.navigate('CookingAssistant', { recipeId: recipe.id });
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 36,
  },
  image: {
    width: '100%',
    height: 320,
  },
  panel: {
    marginTop: -24,
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: spacing.screen,
  },
  title: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
  },
  description: {
    marginTop: spacing.sm,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginVertical: spacing.xl,
  },
  stat: {
    flex: 1,
    minWidth: '22%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  statLabel: {
    marginTop: 4,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.lg,
    color: colors.textPrimary,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  steps: {
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.chipBackground,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
  stepCopy: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  stepText: {
    marginTop: 4,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: 20,
    color: colors.textSecondary,
  },
});
