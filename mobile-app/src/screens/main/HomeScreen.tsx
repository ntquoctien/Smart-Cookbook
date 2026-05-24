import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import type { MainTabParamList, RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { AppCard } from '../../components/ui/AppCard';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { SearchBar } from '../../components/ui/SearchBar';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { PreferenceChip } from '../../components/recipe/PreferenceChip';
import { RecipeCard } from '../../components/recipe/RecipeCard';
import { mockRecipes } from '../../data/mockRecipes';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

const categories = ['Healthy', 'Budget', 'High Protein', 'Under 30 min'];

export function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const rootNavigation = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();

  const filtered = useMemo(
    () =>
      mockRecipes.filter((recipe) => {
        const matchesText = recipe.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = !selectedCategory || recipe.tags.includes(selectedCategory);
        return matchesText && matchesCategory;
      }),
    [query, selectedCategory]
  );

  return (
    <ScreenContainer>
      <LinearGradient colors={['#FF9A62', '#FF7A45']} style={styles.hero}>
        <Text style={styles.eyebrow}>Good morning, Chef 👋</Text>
        <Text style={styles.heroTitle}>What are we cooking today?</Text>
        <SearchBar value={query} onChangeText={setQuery} />
      </LinearGradient>

      <AppCard style={styles.scanCard}>
        <View style={styles.scanText}>
          <Text style={styles.scanTitle}>Scan your ingredients</Text>
          <Text style={styles.scanSubtitle}>
            Capture a few ingredients and let AI build practical recipe ideas around them.
          </Text>
        </View>
        <AppButton label="Open camera" onPress={() => navigation.navigate('CameraScan')} />
      </AppCard>

      <SectionHeader title="Quick categories" subtitle="Choose a mood for your next recipe." />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rowGap}>
        {categories.map((item) => (
          <PreferenceChip
            key={item}
            label={item}
            selected={selectedCategory === item}
            onPress={() => setSelectedCategory(selectedCategory === item ? null : item)}
          />
        ))}
      </ScrollView>

      <AppCard style={styles.aiPick}>
        <View style={styles.aiCopy}>
          <Text style={styles.aiLabel}>AI pick</Text>
          <Text style={styles.aiTitle}>{mockRecipes[0].name}</Text>
          <Text style={styles.aiText}>Best match for what is already in your kitchen today.</Text>
        </View>
        <Image source={{ uri: mockRecipes[0].image }} style={styles.aiImage} />
      </AppCard>

      <SectionHeader title="Recommended recipes" actionLabel="See all" onActionPress={() => rootNavigation?.navigate('RecipeRecommendation')} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalCards}>
        {filtered.slice(0, 4).map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            compact
            onPress={() => rootNavigation?.navigate('RecipeDetail', { recipeId: recipe.id })}
          />
        ))}
      </ScrollView>

      <SectionHeader title="Recently cooked" actionLabel="History" onActionPress={() => navigation.navigate('History')} />
      <View style={styles.list}>
        {filtered.slice(0, 3).map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onPress={() => rootNavigation?.navigate('RecipeDetail', { recipeId: recipe.id })}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 28,
    padding: spacing.xl,
    gap: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  eyebrow: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.78)',
  },
  heroTitle: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xxl,
    lineHeight: 34,
    color: colors.white,
  },
  scanCard: {
    marginBottom: spacing.lg,
    gap: spacing.lg,
  },
  scanText: {
    gap: spacing.sm,
  },
  scanTitle: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.lg,
    color: colors.textPrimary,
  },
  scanSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  rowGap: {
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  aiPick: {
    marginVertical: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  aiCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  aiLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.xs,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  aiTitle: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.xl,
    color: colors.textPrimary,
  },
  aiText: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  aiImage: {
    width: 96,
    height: 96,
    borderRadius: 24,
  },
  horizontalCards: {
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  list: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
