import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import type { Difficulty } from '../../types/recipe';
import { AppButton } from '../../components/ui/AppButton';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { DifficultySelector } from '../../components/recipe/DifficultySelector';
import { PreferenceChip } from '../../components/recipe/PreferenceChip';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'PreferenceSelection'>;

const goals = ['Normal', 'Healthy', 'Weight Loss', 'Muscle Gain', 'Budget Meal', 'Under 30 Minutes'];

export function PreferenceSelectionScreen({ navigation }: Props) {
  const [selectedGoal, setSelectedGoal] = useState('Healthy');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');

  return (
    <ScreenContainer>
      <Text style={styles.title}>Set your cooking preferences</Text>
      <Text style={styles.subtitle}>Choose a goal and the level of challenge you want tonight.</Text>

      <View style={styles.section}>
        <SectionHeader title="Diet goal" subtitle="Use one goal to focus recipe recommendations." />
        <View style={styles.chips}>
          {goals.map((goal) => (
            <PreferenceChip
              key={goal}
              label={goal}
              selected={selectedGoal === goal}
              onPress={() => setSelectedGoal(goal)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Difficulty" subtitle="Pick a pace that suits your mood." />
        <DifficultySelector value={difficulty} onChange={setDifficulty} />
      </View>

      <AppButton label="See recipe recommendations" onPress={() => navigation.navigate('RecipeRecommendation')} />
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
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  section: {
    marginVertical: spacing.xl,
    gap: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
