export interface UserProfile {
  name: string;
  email: string;
  cookingLevel: string;
  dietPreferences: string[];
}

export interface CookingHistoryEntry {
  id: string;
  recipeId: string;
  cookedAt: string;
  rating?: number;
  recipeName: string;
  recipeImage: string;
  favoriteSaved?: boolean;
}
