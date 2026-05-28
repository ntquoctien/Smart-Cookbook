import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { AIChatBubble } from '../../components/cooking/AIChatBubble';
import { CookingStepCard } from '../../components/cooking/CookingStepCard';
import { TimerCard } from '../../components/cooking/TimerCard';
import { AppButton } from '../../components/ui/AppButton';
import { EmptyState } from '../../components/ui/EmptyState';
import { mockRecipes } from '../../data/mockRecipes';
import { cookingMockService } from '../../services/cookingMockService';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../styles/colors';
import { radius } from '../../styles/radius';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'CookingAssistant'>;

export function CookingAssistantScreen({ navigation, route }: Props) {
  const [question, setQuestion] = useState('');
  const currentCookingSession = useAppStore((state) => state.currentCookingSession);
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);
  const setCurrentCookingSession = useAppStore((state) => state.setCurrentCookingSession);
  const appendChatMessages = useAppStore((state) => state.appendChatMessages);
  const recipe =
    selectedRecipe ?? mockRecipes.find((item) => item.id === route.params?.recipeId) ?? null;

  if (!recipe || !currentCookingSession) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <EmptyState
          icon="👩‍🍳"
          title="Cooking session not started"
          message="Start cooking from a recipe detail screen to load the assistant."
        />
      </ScrollView>
    );
  }

  const step = recipe.steps[Math.min(currentCookingSession.currentStep - 1, recipe.steps.length - 1)];

  const sendQuestion = () => {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }

    const userMessage = cookingMockService.buildQuestion(trimmed);
    const reply = cookingMockService.buildReply(trimmed, recipe, currentCookingSession.currentStep);
    appendChatMessages([userMessage, reply]);
    setQuestion('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.subtitle}>Real-time AI cooking assistant</Text>

      <CookingStepCard step={step} totalSteps={recipe.steps.length} />
      <View style={styles.sectionGap}>
        <TimerCard minutes={currentCookingSession.timerMinutes} />
      </View>

      <View style={styles.navRow}>
        <AppButton
          label="Previous"
          variant="secondary"
          onPress={() => setCurrentCookingSession(cookingMockService.previousStep(currentCookingSession, recipe))}
          style={styles.flexButton}
        />
        {currentCookingSession.currentStep < recipe.steps.length ? (
          <AppButton
            label="Next step"
            onPress={() => setCurrentCookingSession(cookingMockService.nextStep(currentCookingSession, recipe))}
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
        {currentCookingSession.chatMessages.map((message) => (
          <AIChatBubble key={message.id} message={message} />
        ))}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask something about this step..."
          placeholderTextColor={colors.textSecondary}
          value={question}
          onChangeText={setQuestion}
        />
        <Pressable style={styles.voiceButton} onPress={sendQuestion}>
          <Text style={styles.voiceText}>Send</Text>
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
    width: 60,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.white,
  },
});
