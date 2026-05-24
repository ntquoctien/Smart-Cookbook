import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { AIChatBubble } from '../../components/cooking/AIChatBubble';
import { CookingStepCard } from '../../components/cooking/CookingStepCard';
import { TimerCard } from '../../components/cooking/TimerCard';
import { AppButton } from '../../components/ui/AppButton';
import { mockChatMessages } from '../../data/mockChatMessages';
import { mockCookingSession } from '../../data/mockCookingSession';
import { mockRecipes } from '../../data/mockRecipes';
import { colors } from '../../styles/colors';
import { radius } from '../../styles/radius';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'CookingAssistant'>;

export function CookingAssistantScreen({ navigation, route }: Props) {
  const recipe = mockRecipes.find((item) => item.id === route.params?.recipeId) ?? mockRecipes[0];
  const [currentStep, setCurrentStep] = useState(mockCookingSession.currentStep);
  const step = recipe.steps[Math.min(currentStep - 1, recipe.steps.length - 1)];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.subtitle}>Real-time AI cooking assistant</Text>

      <CookingStepCard step={step} totalSteps={recipe.steps.length} />
      <View style={styles.sectionGap}>
        <TimerCard minutes={mockCookingSession.timerMinutes} />
      </View>

      <View style={styles.navRow}>
        <AppButton
          label="Previous"
          variant="secondary"
          onPress={() => setCurrentStep((value) => Math.max(1, value - 1))}
          style={styles.flexButton}
        />
        {currentStep < recipe.steps.length ? (
          <AppButton
            label="Next step"
            onPress={() => setCurrentStep((value) => Math.min(recipe.steps.length, value + 1))}
            style={styles.flexButton}
          />
        ) : (
          <AppButton
            label="Finish cooking"
            onPress={() => navigation.navigate('CookingCompleted', { recipeId: recipe.id })}
            style={styles.flexButton}
          />
        )}
      </View>

      <Text style={styles.chatTitle}>Ask AI while cooking</Text>
      <View style={styles.chatList}>
        {mockChatMessages.map((message) => (
          <AIChatBubble key={message.id} message={message} />
        ))}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask something about this step..."
          placeholderTextColor={colors.textSecondary}
        />
        <Pressable style={styles.voiceButton}>
          <Text style={styles.voiceText}>🎙</Text>
        </Pressable>
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
    padding: spacing.screen,
    paddingTop: spacing.xxl,
    paddingBottom: 40,
  },
  title: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    color: colors.textSecondary,
  },
  sectionGap: {
    marginTop: spacing.lg,
  },
  navRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  flexButton: {
    flex: 1,
  },
  chatTitle: {
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.lg,
    color: colors.textPrimary,
  },
  chatList: {
    gap: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceText: {
    fontSize: 18,
  },
});
