import { create } from 'zustand';

import { defaultUserProfile } from '../data/mockUserProfile';
import type { ChatMessage, CookingSession } from '../types/cooking';
import type { Ingredient } from '../types/ingredient';
import type { Recipe, Difficulty } from '../types/recipe';
import type { DietGoal, SelectedImage } from '../types/scan';
import type { CookingHistoryEntry, UserProfile } from '../types/user';
import { storageService } from '../services/storageService';

type AppStore = {
  hydrated: boolean;
  selectedImages: SelectedImage[];
  detectedIngredients: Ingredient[];
  confirmedIngredients: Ingredient[];
  selectedDietGoal: DietGoal;
  selectedDifficulty: Difficulty;
  recommendedRecipes: Recipe[];
  selectedRecipe: Recipe | null;
  currentCookingSession: CookingSession | null;
  favorites: Recipe[];
  cookingHistory: CookingHistoryEntry[];
  userProfile: UserProfile;
  scanning: boolean;
  scanError: string | null;
  recommendationError: string | null;
  initializePersistedState: () => Promise<void>;
  setSelectedImages: (images: SelectedImage[]) => void;
  addSelectedImages: (images: SelectedImage[]) => void;
  clearSelectedImages: () => void;
  setDetectedIngredients: (ingredients: Ingredient[]) => void;
  setConfirmedIngredients: (ingredients: Ingredient[]) => void;
  updateConfirmedIngredient: (id: string, patch: Partial<Ingredient>) => void;
  removeConfirmedIngredient: (id: string) => void;
  addConfirmedIngredient: (ingredient: Ingredient) => void;
  setSelectedDietGoal: (goal: DietGoal) => void;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
  setRecommendedRecipes: (recipes: Recipe[]) => void;
  setSelectedRecipe: (recipe: Recipe | null) => void;
  setCurrentCookingSession: (session: CookingSession | null) => void;
  appendChatMessages: (messages: ChatMessage[]) => void;
  setScanning: (value: boolean) => void;
  setScanError: (value: string | null) => void;
  setRecommendationError: (value: string | null) => void;
  toggleFavorite: (recipe: Recipe) => Promise<boolean>;
  saveHistoryEntry: (entry: CookingHistoryEntry) => Promise<void>;
  updateUserProfile: (patch: Partial<UserProfile>) => Promise<void>;
  resetScanFlow: () => void;
  resetCookingFlow: () => void;
};

export const useAppStore = create<AppStore>((set, get) => ({
  hydrated: false,
  selectedImages: [],
  detectedIngredients: [],
  confirmedIngredients: [],
  selectedDietGoal: 'Healthy',
  selectedDifficulty: 'Easy',
  recommendedRecipes: [],
  selectedRecipe: null,
  currentCookingSession: null,
  favorites: [],
  cookingHistory: [],
  userProfile: defaultUserProfile,
  scanning: false,
  scanError: null,
  recommendationError: null,
  async initializePersistedState() {
    const [favorites, cookingHistory, userProfile] = await Promise.all([
      storageService.loadFavorites(),
      storageService.loadCookingHistory(),
      storageService.loadUserProfile(),
    ]);

    set({
      favorites,
      cookingHistory,
      userProfile: userProfile ?? defaultUserProfile,
      hydrated: true,
    });
  },
  setSelectedImages(images) {
    set({ selectedImages: images, scanError: null });
  },
  addSelectedImages(images) {
    set((state) => ({
      selectedImages: [...state.selectedImages, ...images],
      scanError: null,
    }));
  },
  clearSelectedImages() {
    set({ selectedImages: [] });
  },
  setDetectedIngredients(ingredients) {
    set({ detectedIngredients: ingredients, confirmedIngredients: ingredients, scanError: null });
  },
  setConfirmedIngredients(ingredients) {
    set({ confirmedIngredients: ingredients });
  },
  updateConfirmedIngredient(id, patch) {
    set((state) => ({
      confirmedIngredients: state.confirmedIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, ...patch } : ingredient
      ),
    }));
  },
  removeConfirmedIngredient(id) {
    set((state) => ({
      confirmedIngredients: state.confirmedIngredients.filter((ingredient) => ingredient.id !== id),
    }));
  },
  addConfirmedIngredient(ingredient) {
    set((state) => ({
      confirmedIngredients: [...state.confirmedIngredients, ingredient],
    }));
  },
  setSelectedDietGoal(goal) {
    set({ selectedDietGoal: goal });
  },
  setSelectedDifficulty(difficulty) {
    set({ selectedDifficulty: difficulty });
  },
  setRecommendedRecipes(recipes) {
    set({ recommendedRecipes: recipes, recommendationError: recipes.length ? null : 'No recipes found.' });
  },
  setSelectedRecipe(recipe) {
    set({ selectedRecipe: recipe });
  },
  setCurrentCookingSession(session) {
    set({ currentCookingSession: session });
  },
  appendChatMessages(messages) {
    set((state) => ({
      currentCookingSession: state.currentCookingSession
        ? {
            ...state.currentCookingSession,
            chatMessages: [...state.currentCookingSession.chatMessages, ...messages],
          }
        : state.currentCookingSession,
    }));
  },
  setScanning(value) {
    set({ scanning: value });
  },
  setScanError(value) {
    set({ scanError: value });
  },
  setRecommendationError(value) {
    set({ recommendationError: value });
  },
  async toggleFavorite(recipe) {
    const { favorites } = get();
    const exists = favorites.some((item) => item.id === recipe.id);
    const nextFavorites = exists
      ? favorites.filter((item) => item.id !== recipe.id)
      : [recipe, ...favorites];

    set({ favorites: nextFavorites });
    await storageService.saveFavorites(nextFavorites);
    return !exists;
  },
  async saveHistoryEntry(entry) {
    const nextHistory = [entry, ...get().cookingHistory.filter((item) => item.id !== entry.id)];
    set({ cookingHistory: nextHistory });
    await storageService.saveCookingHistory(nextHistory);
  },
  async updateUserProfile(patch) {
    const nextProfile = { ...get().userProfile, ...patch };
    set({ userProfile: nextProfile });
    await storageService.saveUserProfile(nextProfile);
  },
  resetScanFlow() {
    set({
      selectedImages: [],
      detectedIngredients: [],
      confirmedIngredients: [],
      recommendedRecipes: [],
      selectedRecipe: null,
      scanning: false,
      scanError: null,
      recommendationError: null,
      selectedDietGoal: 'Healthy',
      selectedDifficulty: 'Easy',
    });
  },
  resetCookingFlow() {
    set({
      currentCookingSession: null,
      selectedRecipe: null,
      recommendedRecipes: [],
      recommendationError: null,
    });
  },
}));
