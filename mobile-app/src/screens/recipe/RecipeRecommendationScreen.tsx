import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingState } from '../../components/ui/LoadingState';
import { RecipeCard } from '../../components/recipe/RecipeCard';
import { PreferenceChip } from '../../components/recipe/PreferenceChip';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { recipeMockService } from '../../services/recipeMockService';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeRecommendation'>;

const filters = ['Best Match', 'Fewest Missing'];

export function RecipeRecommendationScreen({ navigation }: Props) {
  const [selected, setSelected] = useState('Best Match');
  const [loading, setLoading] = useState(true);
  const confirmedIngredients = useAppStore((state) => state.confirmedIngredients);
  const selectedDietGoal = useAppStore((state) => state.selectedDietGoal);
  const selectedDifficulty = useAppStore((state) => state.selectedDifficulty);
  const recipes = useAppStore((state) => state.recommendedRecipes);
  const setRecommendedRecipes = useAppStore((state) => state.setRecommendedRecipes);
  const recommendationError = useAppStore((state) => state.recommendationError);
  const setSelectedRecipe = useAppStore((state) => state.setSelectedRecipe);

  useEffect(() => {
    let active = true;

    const loadRecipes = async () => {
      setLoading(true);
      const nextRecipes = await recipeMockService.recommendRecipes({
        ingredients: confirmedIngredients,
        dietGoal: selectedDietGoal,
        difficulty: selectedDifficulty,
      });

      if (!active) {
        return;
      }

      setRecommendedRecipes(nextRecipes);
      setLoading(false);
    };

    void loadRecipes();

    return () => {
      active = false;
    };
  }, [confirmedIngredients, selectedDietGoal, selectedDifficulty, setRecommendedRecipes]);

  const sortedRecipes =
    selected === 'Fewest Missing'
      ? [...recipes].sort((left, right) => left.missingIngredients.length - right.missingIngredients.length)
      : recipes;

  return (
    <ScreenContainer>
      <Text style={styles.title}>Recipe recommendations</Text>
      <Text style={styles.subtitle}>
        Ranked using your ingredients, preferences, and missing-item tolerance.
      </Text>

      <SectionHeader title="Sort and filter" subtitle="Results are already ranked by best match and fewest missing ingredients." />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((item) => (
          <PreferenceChip key={item} label={item} selected={selected === item} onPress={() => setSelected(item)} />
        ))}
      </ScrollView>

      {loading ? <LoadingState label="Matching recipes to your ingredients..." /> : null}
      {!loading && !sortedRecipes.length ? (
        <EmptyState
          icon="🍲"
          title="No recipes found"
          message={recommendationError ?? 'Try adjusting your ingredients or cooking preferences.'}
        />
      ) : null}
      <View style={styles.list}>
        {sortedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onPress={() => {
              setSelectedRecipe(recipe);
              navigation.navigate('RecipeDetail', { recipeId: recipe.id });
            }}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.xl,
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  filters: {
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  list: {
    marginTop: spacing.md,
    gap: spacing.md,
  },
});
