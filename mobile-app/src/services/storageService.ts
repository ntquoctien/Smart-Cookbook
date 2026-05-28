import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Recipe } from '../types/recipe';
import type { CookingHistoryEntry, UserProfile } from '../types/user';

const storageKeys = {
  favorites: 'smart-cookbook:favorites',
  history: 'smart-cookbook:history',
  profile: 'smart-cookbook:profile',
} as const;

async function readJson<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) {
    return null;
  }

  return JSON.parse(raw) as T;
}

async function writeJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const storageService = {
  async loadFavorites() {
    return (await readJson<Recipe[]>(storageKeys.favorites)) ?? [];
  },
  async saveFavorites(favorites: Recipe[]) {
    await writeJson(storageKeys.favorites, favorites);
  },
  async loadCookingHistory() {
    return (await readJson<CookingHistoryEntry[]>(storageKeys.history)) ?? [];
  },
  async saveCookingHistory(history: CookingHistoryEntry[]) {
    await writeJson(storageKeys.history, history);
  },
  async loadUserProfile() {
    return await readJson<UserProfile>(storageKeys.profile);
  },
  async saveUserProfile(profile: UserProfile) {
    await writeJson(storageKeys.profile, profile);
  },
};
