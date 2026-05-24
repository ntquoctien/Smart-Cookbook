export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface RecipeStep {
  step: number;
  title: string;
  instruction: string;
  timeMinutes?: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  matchScore: number;
  cookingTimeMinutes: number;
  difficulty: Difficulty;
  servings: number;
  availableIngredients: string[];
  missingIngredients: string[];
  steps: RecipeStep[];
  tags: string[];
  rating?: number;
}
