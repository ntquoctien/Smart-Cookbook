import { mockRecipes } from '../data/mockRecipes';
import type { Ingredient } from '../types/ingredient';
import type { Recipe, Difficulty } from '../types/recipe';
import type { DietGoal } from '../types/scan';

type RecommendationInput = {
  ingredients: Ingredient[];
  dietGoal: DietGoal;
  difficulty: Difficulty;
};

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function ingredientMatches(recipeIngredient: string, available: Set<string>) {
  const normalized = normalize(recipeIngredient);
  for (const item of available) {
    if (normalized.includes(item) || item.includes(normalized)) {
      return true;
    }
  }

  return false;
}

function scoreRecipe(recipe: Recipe, dietGoal: DietGoal, difficulty: Difficulty) {
  let score = recipe.matchScore;

  if (difficulty === recipe.difficulty) {
    score += 8;
  }

  if (dietGoal === 'Healthy' && recipe.tags.includes('Healthy')) {
    score += 10;
  }

  if (dietGoal === 'Budget Meal' && recipe.tags.includes('Budget')) {
    score += 10;
  }

  if (dietGoal === 'Muscle Gain' && recipe.tags.includes('High Protein')) {
    score += 10;
  }

  if (dietGoal === 'Under 30 Minutes' && recipe.cookingTimeMinutes <= 30) {
    score += 8;
  }

  return Math.min(99, score);
}

export const recipeMockService = {
  async recommendRecipes({
    ingredients,
    dietGoal,
    difficulty,
  }: RecommendationInput): Promise<Recipe[]> {
    const available = new Set(ingredients.map((ingredient) => normalize(ingredient.name)));

    const ranked = mockRecipes
      .map((recipe) => {
        const ingredientUniverse = Array.from(
          new Set([...recipe.availableIngredients, ...recipe.missingIngredients])
        );
        const availableIngredients = ingredientUniverse.filter((ingredient) =>
          ingredientMatches(ingredient, available)
        );
        const missingIngredients = ingredientUniverse.filter(
          (ingredient) => !ingredientMatches(ingredient, available)
        );

        return {
          ...recipe,
          availableIngredients,
          missingIngredients,
          matchScore: scoreRecipe(recipe, dietGoal, difficulty),
        };
      })
      .filter((recipe) => {
        if (dietGoal === 'Healthy') {
          return recipe.tags.includes('Healthy') || recipe.tags.includes('Green');
        }

        if (dietGoal === 'Budget Meal') {
          return recipe.tags.includes('Budget');
        }

        if (dietGoal === 'Muscle Gain') {
          return recipe.tags.includes('High Protein');
        }

        if (dietGoal === 'Under 30 Minutes') {
          return recipe.cookingTimeMinutes <= 30;
        }

        return true;
      })
      .filter((recipe) => (difficulty === 'Easy' ? true : recipe.difficulty === difficulty || difficulty === 'Medium'))
      .sort((left, right) => {
        if (right.matchScore !== left.matchScore) {
          return right.matchScore - left.matchScore;
        }

        if (left.missingIngredients.length !== right.missingIngredients.length) {
          return left.missingIngredients.length - right.missingIngredients.length;
        }

        return left.cookingTimeMinutes - right.cookingTimeMinutes;
      });

    return ranked;
  },
};
