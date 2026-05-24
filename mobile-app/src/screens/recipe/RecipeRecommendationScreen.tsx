import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { RecipeCard } from '../../components/recipe/RecipeCard';
import { PreferenceChip } from '../../components/recipe/PreferenceChip';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { mockRecipes } from '../../data/mockRecipes';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeRecommendation'>;

const filters = ['Best Match', 'Quickest', 'Easy', 'High Protein'];

export function RecipeRecommendationScreen({ navigation }: Props) {
  const [selected, setSelected] = useState('Best Match');

  const recipes = useMemo(() => {
    if (selected === 'Quickest') {
      return [...mockRecipes].sort((a, b) => a.cookingTimeMinutes - b.cookingTimeMinutes);
    }

    if (selected === 'Easy') {
      return [...mockRecipes].sort((a, b) => Number(a.difficulty !== 'Easy') - Number(b.difficulty !== 'Easy'));
    }

    if (selected === 'High Protein') {
      return mockRecipes.filter((recipe) => recipe.tags.includes('High Protein'));
    }

    return [...mockRecipes].sort((a, b) => b.matchScore - a.matchScore);
  }, [selected]);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Recipe recommendations</Text>
      <Text style={styles.subtitle}>
        Ranked using your ingredients, preferences, and missing-item tolerance.
      </Text>

      <SectionHeader title="Sort and filter" subtitle="Placeholder controls for future advanced filtering." />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((item) => (
          <PreferenceChip key={item} label={item} selected={selected === item} onPress={() => setSelected(item)} />
        ))}
      </ScrollView>

      <View style={styles.list}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
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
