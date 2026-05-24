import { StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { MainTabParamList, RootStackParamList } from '../../types';
import { AppCard } from '../../components/ui/AppCard';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { mockRecipes } from '../../data/mockRecipes';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';
import { formatDate } from '../../utils/formatters';

type Props = BottomTabScreenProps<MainTabParamList, 'History'>;

const historyItems = [
  { id: '1', recipeId: 'trung-xao-ca-chua', cookedAt: '2026-05-20', rating: 5 },
  { id: '2', recipeId: 'thit-bam-xao-ca-chua', cookedAt: '2026-05-18', rating: 4 },
];

export function CookingHistoryScreen({ navigation }: Props) {
  const rootNavigation = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer>
      <SectionHeader title="Cooking history" subtitle="A quick look at what you made recently." />
      <View style={styles.list}>
        {historyItems.map((item) => {
          const recipe = mockRecipes.find((entry) => entry.id === item.recipeId) ?? mockRecipes[0];
          return (
            <AppCard key={item.id} style={styles.card}>
              <View>
                <Text style={styles.name}>{recipe.name}</Text>
                <Text style={styles.meta}>Cooked on {formatDate(item.cookedAt)}</Text>
                <Text style={styles.meta}>Rating: {'⭐'.repeat(item.rating)}</Text>
              </View>
              <Text style={styles.link} onPress={() => rootNavigation?.navigate('RecipeDetail', { recipeId: recipe.id })}>
                View
              </Text>
            </AppCard>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  meta: {
    marginTop: 4,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  link: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
});
