import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  CameraScan: undefined;
  Favorites: undefined;
  History: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  AuthFlow: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  ImagePreview: undefined;
  AIScanning: undefined;
  IngredientConfirmation: undefined;
  PreferenceSelection: undefined;
  RecipeRecommendation: undefined;
  RecipeDetail: { recipeId?: string } | undefined;
  CookingAssistant: { recipeId?: string } | undefined;
  CookingCompleted: { recipeId?: string } | undefined;
};
