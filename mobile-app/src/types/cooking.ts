export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  message: string;
  timestamp: string;
}

export interface CookingSession {
  recipeId: string;
  currentStep: number;
  totalSteps: number;
  timerMinutes: number;
  chatMessages: ChatMessage[];
}
