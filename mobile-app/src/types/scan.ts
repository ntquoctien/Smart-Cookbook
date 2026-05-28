import type { Difficulty, Recipe } from './recipe';
import type { Ingredient } from './ingredient';

export type DietGoal =
  | 'Normal'
  | 'Healthy'
  | 'Weight Loss'
  | 'Muscle Gain'
  | 'Budget Meal'
  | 'Under 30 Minutes';

export type SelectedImage = {
  id: string;
  uri: string;
  width?: number;
  height?: number;
  fileName?: string | null;
  mimeType?: string | null;
  source: 'camera' | 'gallery';
};

export interface ScanSession {
  selectedImages: SelectedImage[];
  detectedIngredients: Ingredient[];
  confirmedIngredients: Ingredient[];
  selectedDietGoal: DietGoal;
  selectedDifficulty: Difficulty;
  recommendedRecipes: Recipe[];
  selectedRecipeId: string | null;
  isScanning: boolean;
  scanError: string | null;
}
