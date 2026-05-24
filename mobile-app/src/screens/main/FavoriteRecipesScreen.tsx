import { StyleSheet, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { MainTabParamList, RootStackParamList } from '../../types';
import { EmptyState } from '../../components/ui/EmptyState';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { SearchBar } from '../../components/ui/SearchBar';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { RecipeCard } from '../../components/recipe/RecipeCard';
import { mockRecipes } from '../../data/mockRecipes';
import { spacing } from '../../styles/spacing';

type Props = BottomTabScreenProps<MainTabParamList, 'Favorites'>;

export function FavoriteRecipesScreen({ navigation }: Props) {
  const rootNavigation = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
  const favorites = mockRecipes.slice(0, 2);

  return (
    <ScreenContainer>
      <SectionHeader title="Favorite recipes" subtitle="Saved dishes you can jump back into anytime." />
      <View style={styles.search}>
        <SearchBar value="" onChangeText={() => undefined} placeholder="Search favorites..." />
      </View>
      <View style={styles.list}>
        {favorites.length ? (
          favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onPress={() => rootNavigation?.navigate('RecipeDetail', { recipeId: recipe.id })}
            />
          ))
        ) : (
          <EmptyState icon="❤️" title="No favorites yet" message="Save recipes after cooking to see them here." />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  search: {
    marginTop: spacing.lg,
  },
  list: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
});
