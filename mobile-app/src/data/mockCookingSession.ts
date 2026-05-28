import type { CookingSession } from '../types/cooking';
import { mockChatMessages } from './mockChatMessages';

export const mockCookingSession: CookingSession = {
  recipeId: 'trung-xao-ca-chua',
  currentStep: 2,
  totalSteps: 3,
  timerMinutes: 5,
  chatMessages: mockChatMessages,
};
