import type { Ingredient } from '../types/ingredient';

export const pantryIngredients: Ingredient[] = [
  { id: '1', name: 'trứng gà', quantity: '4 quả', available: true },
  { id: '2', name: 'cà chua', quantity: '3 quả', available: true },
  { id: '3', name: 'hành lá', quantity: '2 nhánh', available: true },
  { id: '4', name: 'tỏi', quantity: '4 tép', available: true },
  { id: '5', name: 'thịt băm', quantity: '200g', available: true },
  { id: '6', name: 'rau cải', quantity: '1 bó', available: true },
];

export const detectedIngredients: Ingredient[] = [
  { id: '1', name: 'trứng gà', quantity: '4 quả', confidence: 0.96, available: true },
  { id: '2', name: 'cà chua', quantity: '3 quả', confidence: 0.94, available: true },
  { id: '3', name: 'hành lá', quantity: '2 nhánh', confidence: 0.88, available: true },
  { id: '4', name: 'tỏi', quantity: '4 tép', confidence: 0.83, available: true },
  { id: '5', name: 'thịt băm', quantity: '200g', confidence: 0.91, available: true },
];
