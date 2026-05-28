import { mockChatMessages } from '../data/mockChatMessages';
import type { ChatMessage, CookingSession } from '../types/cooking';
import type { Recipe } from '../types/recipe';

function createTimestamp() {
  const date = new Date();
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export const cookingMockService = {
  createSession(recipe: Recipe): CookingSession {
    return {
      recipeId: recipe.id,
      currentStep: 1,
      totalSteps: recipe.steps.length,
      timerMinutes: recipe.steps[0]?.timeMinutes ?? 5,
      chatMessages: mockChatMessages,
    };
  },
  nextStep(session: CookingSession, recipe: Recipe): CookingSession {
    const nextStep = Math.min(session.totalSteps, session.currentStep + 1);
    return {
      ...session,
      currentStep: nextStep,
      timerMinutes: recipe.steps[nextStep - 1]?.timeMinutes ?? session.timerMinutes,
    };
  },
  previousStep(session: CookingSession, recipe: Recipe): CookingSession {
    const nextStep = Math.max(1, session.currentStep - 1);
    return {
      ...session,
      currentStep: nextStep,
      timerMinutes: recipe.steps[nextStep - 1]?.timeMinutes ?? session.timerMinutes,
    };
  },
  buildQuestion(message: string): ChatMessage {
    return {
      id: `user-${Date.now()}`,
      sender: 'user',
      message,
      timestamp: createTimestamp(),
    };
  },
  buildReply(question: string, recipe: Recipe, currentStep: number): ChatMessage {
    return {
      id: `assistant-${Date.now()}`,
      sender: 'assistant',
      message: `For ${recipe.name}, step ${currentStep}: ${question ? `if you are asking about "${question}", ` : ''}keep the heat moderate and adjust seasoning gradually. This is a mock AI response for Phase 2.`,
      timestamp: createTimestamp(),
    };
  },
};
