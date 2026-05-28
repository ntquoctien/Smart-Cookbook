import { StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { MainTabParamList, RootStackParamList } from '../../types';
import { AppCard } from '../../components/ui/AppCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';
import { formatDate } from '../../utils/formatters';

type Props = BottomTabScreenProps<MainTabParamList, 'History'>;

export function CookingHistoryScreen({ navigation }: Props) {
  const rootNavigation = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
  const historyItems = useAppStore((state) => state.cookingHistory);

  return (
    <ScreenContainer>
      <SectionHeader title="Cooking history" subtitle="A quick look at what you made recently." />
      {!historyItems.length ? (
        <EmptyState
          icon="🕘"
          title="No cooking history yet"
          message="Complete a recipe to build your local cooking history."
        />
      ) : null}
      <View style={styles.list}>
        {historyItems.map((item) => (
          <AppCard key={item.id} style={styles.card}>
            <View>
              <Text style={styles.name}>{item.recipeName}</Text>
              <Text style={styles.meta}>Cooked on {formatDate(item.cookedAt)}</Text>
              <Text style={styles.meta}>Rating: {'★'.repeat(item.rating ?? 0)}</Text>
            </View>
            <Text style={styles.link} onPress={() => rootNavigation?.navigate('RecipeDetail', { recipeId: item.recipeId })}>
              View
            </Text>
          </AppCard>
        ))}
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
