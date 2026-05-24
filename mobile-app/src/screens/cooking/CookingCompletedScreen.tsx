import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'CookingCompleted'>;

export function CookingCompletedScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <View style={styles.center}>
        <Text style={styles.icon}>🎉</Text>
        <Text style={styles.title}>Cooking complete</Text>
        <Text style={styles.subtitle}>Your dish is ready. Save the result, rate it, or jump back home.</Text>
      </View>

      <View style={styles.rating}>
        {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, index) => (
          <Text key={`${star}-${index}`} style={styles.star}>
            {star}
          </Text>
        ))}
      </View>

      <View style={styles.actions}>
        <AppButton label="Save to favorites" onPress={() => navigation.navigate('MainTabs', { screen: 'Favorites' })} />
        <AppButton label="Cook again" variant="secondary" onPress={() => navigation.navigate('RecipeRecommendation')} />
        <AppButton label="Back to home" variant="ghost" onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} />
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
  },
  actions: {
    gap: spacing.md,
  },
});
