import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'CookingCompleted'>;

export function CookingCompletedScreen({ navigation }: Props) {
  const [rating, setRating] = useState(5);
  const [saveFavorite, setSaveFavorite] = useState(true);
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const saveHistoryEntry = useAppStore((state) => state.saveHistoryEntry);
  const resetCookingFlow = useAppStore((state) => state.resetCookingFlow);
  const resetScanFlow = useAppStore((state) => state.resetScanFlow);

  const finishFlow = async () => {
    if (!selectedRecipe) {
      navigation.navigate('MainTabs', { screen: 'Home' });
      return;
    }

    const favoriteExists = favorites.some((recipe) => recipe.id === selectedRecipe.id);
    if (saveFavorite && !favoriteExists) {
      await toggleFavorite(selectedRecipe);
    }

    await saveHistoryEntry({
      id: `${selectedRecipe.id}-${Date.now()}`,
      recipeId: selectedRecipe.id,
      cookedAt: new Date().toISOString(),
      rating,
      recipeName: selectedRecipe.name,
      recipeImage: selectedRecipe.image,
      favoriteSaved: saveFavorite || favoriteExists,
    });

    resetCookingFlow();
    resetScanFlow();
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  return (
    <ScreenContainer>
      <View style={styles.center}>
        <Text style={styles.icon}>🎉</Text>
        <Text style={styles.title}>Cooking complete</Text>
        <Text style={styles.subtitle}>Rate the dish, choose whether to save it, then head back home.</Text>
      </View>

      <View style={styles.rating}>
        {[1, 2, 3, 4, 5].map((value) => (
          <Pressable key={value} onPress={() => setRating(value)}>
            <Text style={[styles.star, value <= rating && styles.activeStar]}>★</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.actions}>
        <AppButton
          label={saveFavorite ? 'Favorite will be saved' : 'Save to favorites'}
          variant={saveFavorite ? 'primary' : 'secondary'}
          onPress={() => setSaveFavorite((value) => !value)}
        />
        <AppButton label="Cook again" variant="secondary" onPress={() => navigation.navigate('RecipeRecommendation')} />
        <AppButton label="Finish and return home" variant="ghost" onPress={() => void finishFlow()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    marginTop: spacing.xxxl * 1.5,
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    fontSize: 56,
  },
  title: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  rating: {
    marginVertical: spacing.xxxl,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  star: {
    fontSize: 28,
    color: '#D1C4B5',
  },
  activeStar: {
    color: colors.warning,
  },
  actions: {
    gap: spacing.md,
  },
});
