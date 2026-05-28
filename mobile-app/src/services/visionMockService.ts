import type { Ingredient } from '../types/ingredient';
import type { SelectedImage } from '../types/scan';
import { detectedIngredients, pantryIngredients } from '../data/mockIngredients';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const visionMockService = {
  async detectIngredients(images: SelectedImage[]): Promise<Ingredient[]> {
    await sleep(1400);

    if (!images.length) {
      return [];
    }

    const result = detectedIngredients.map((ingredient, index) => ({
      ...ingredient,
      confidence: Math.max(0.7, (ingredient.confidence ?? 0.82) - index * 0.02),
    }));

    if (images.length > 1) {
      result.push({
        ...pantryIngredients[5],
        id: 'vision-extra-green',
        confidence: 0.79,
      });
    }

    return result;
  },
};
