export type ScreenName =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register'
  | 'home'
  | 'camera'
  | 'imagePreview'
  | 'aiScanning'
  | 'ingredientConfirm'
  | 'preferences'
  | 'recipeRecommend'
  | 'recipeDetail'
  | 'cookingAssistant'
  | 'cookingCompleted'
  | 'favorites'
  | 'history'
  | 'profile';

export const C = {
  primary: '#FF7A45',
  primaryLight: '#FF9A6C',
  primaryDark: '#E05A25',
  secondary: '#4CAF50',
  secondaryLight: '#81C784',
  bg: '#FFF8F0',
  surface: '#FFFFFF',
  text: '#1F2933',
  textSec: '#6B7280',
  warning: '#F59E0B',
  error: '#EF4444',
  border: '#E5E7EB',
  divider: '#F3F4F6',
  overlay: 'rgba(31,41,51,0.5)',
};

export const IMG = {
  ingredients: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80',
  cooking: 'https://images.unsplash.com/photo-1653233797467-1a528819fd4f?w=800&q=80',
  spices: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&q=80',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',
  salad: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=800&q=80',
  fruitBowl: 'https://images.unsplash.com/photo-1623855244697-5d8fbe9c7892?w=800&q=80',
  stuffedPeppers: 'https://images.unsplash.com/photo-1761315631944-237e17cf108e?w=800&q=80',
  riceVeggies: 'https://images.unsplash.com/photo-1711633648854-50a30a6df74d?w=800&q=80',
  noodles: 'https://images.unsplash.com/photo-1543161252-42609aa0e3d2?w=800&q=80',
  pastaDish: 'https://images.unsplash.com/photo-1597393353365-9d4366392fe9?w=800&q=80',
  avocadoToast: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=800&q=80',
  cuttingBoard: 'https://images.unsplash.com/photo-1514986888952-8cd320577b68?w=800&q=80',
  peppersSalad: 'https://images.unsplash.com/photo-1617474019977-0e105d1b430e?w=800&q=80',
};

export interface Recipe {
  id: string;
  name: string;
  image: string;
  time: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  matchScore: number;
  calories: number;
  tags: string[];
  availableIngredients: string[];
  missingIngredients: string[];
  description: string;
  steps: { step: number; instruction: string; time?: number; tip?: string }[];
  rating?: number;
}

export const RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Mediterranean Pasta',
    image: IMG.pasta,
    time: '25 min',
    difficulty: 'Easy',
    servings: 2,
    matchScore: 95,
    calories: 420,
    tags: ['Healthy', 'Italian'],
    description: 'A light and flavorful Mediterranean-style pasta with fresh tomatoes, basil, and olive oil. Perfect for a quick weeknight dinner.',
    availableIngredients: ['Pasta', 'Tomatoes', 'Basil', 'Olive Oil', 'Garlic'],
    missingIngredients: ['Parmesan'],
    steps: [
      { step: 1, instruction: 'Bring a large pot of salted water to a boil. Cook pasta according to package directions until al dente.', time: 10, tip: 'Add 1 tablespoon of salt to the water for best flavor.' },
      { step: 2, instruction: 'Meanwhile, heat olive oil in a large skillet over medium heat. Add minced garlic and cook for 1-2 minutes until fragrant.', time: 3 },
      { step: 3, instruction: 'Add diced tomatoes to the skillet and cook for 5-7 minutes until they break down into a sauce.', time: 7 },
      { step: 4, instruction: 'Drain the pasta, reserving 1/2 cup of pasta water. Add pasta to the sauce and toss to combine.', time: 2 },
      { step: 5, instruction: 'Add fresh basil leaves, season with salt and pepper. Add pasta water as needed to loosen the sauce.', time: 2, tip: 'Tear the basil by hand for the best aroma.' },
      { step: 6, instruction: 'Plate the pasta and top with grated Parmesan cheese (if available). Serve immediately.', time: 1 },
    ],
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Fresh Garden Salad',
    image: IMG.salad,
    time: '15 min',
    difficulty: 'Easy',
    servings: 2,
    matchScore: 88,
    calories: 180,
    tags: ['Healthy', 'Vegan'],
    description: 'A vibrant and nutritious garden salad packed with fresh vegetables and a light vinaigrette dressing.',
    availableIngredients: ['Lettuce', 'Tomatoes', 'Cucumber', 'Red Onion', 'Olive Oil'],
    missingIngredients: ['Feta Cheese', 'Olives'],
    steps: [
      { step: 1, instruction: 'Wash and dry all vegetables thoroughly. Tear lettuce into bite-sized pieces.', time: 5 },
      { step: 2, instruction: 'Slice cucumber, halve cherry tomatoes, and thinly slice red onion.', time: 5 },
      { step: 3, instruction: 'Make the vinaigrette: whisk together olive oil, lemon juice, salt, and pepper.', time: 3, tip: 'Use a 3:1 ratio of oil to lemon juice.' },
      { step: 4, instruction: 'Combine all vegetables in a large bowl and drizzle with vinaigrette. Toss gently to coat.', time: 2 },
    ],
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Stuffed Bell Peppers',
    image: IMG.stuffedPeppers,
    time: '45 min',
    difficulty: 'Medium',
    servings: 4,
    matchScore: 78,
    calories: 380,
    tags: ['High Protein', 'Healthy'],
    description: 'Colorful bell peppers stuffed with seasoned rice, vegetables, and topped with melted cheese.',
    availableIngredients: ['Bell Peppers', 'Rice', 'Tomatoes', 'Onion', 'Garlic'],
    missingIngredients: ['Ground Beef', 'Cheese', 'Cumin'],
    steps: [
      { step: 1, instruction: 'Preheat oven to 375°F (190°C). Cut tops off bell peppers and remove seeds.', time: 5 },
      { step: 2, instruction: 'Cook rice according to package instructions. In a skillet, sauté onion and garlic until softened.', time: 15 },
      { step: 3, instruction: 'Mix cooked rice with sautéed vegetables, diced tomatoes, and seasonings.', time: 5 },
      { step: 4, instruction: 'Fill each pepper with the rice mixture. Place in a baking dish with a little water.', time: 5 },
      { step: 5, instruction: 'Cover with foil and bake for 30 minutes. Remove foil, add cheese, and bake for 10 more minutes.', time: 40 },
    ],
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Asian Noodle Bowl',
    image: IMG.noodles,
    time: '20 min',
    difficulty: 'Easy',
    servings: 2,
    matchScore: 72,
    calories: 350,
    tags: ['Budget Meal', 'Quick'],
    description: 'A comforting and flavorful Asian-inspired noodle bowl with vegetables and a savory sauce.',
    availableIngredients: ['Noodles', 'Soy Sauce', 'Sesame Oil', 'Garlic', 'Ginger'],
    missingIngredients: ['Bok Choy', 'Tofu', 'Sesame Seeds'],
    steps: [
      { step: 1, instruction: 'Cook noodles according to package directions. Drain and set aside.', time: 8 },
      { step: 2, instruction: 'In a wok or large pan, heat sesame oil. Add minced garlic and ginger, cook for 1 minute.', time: 2 },
      { step: 3, instruction: 'Add vegetables and stir-fry for 3-4 minutes until tender-crisp.', time: 4 },
      { step: 4, instruction: 'Add cooked noodles, soy sauce, and toss everything together. Garnish with sesame seeds.', time: 3 },
    ],
    rating: 4.3,
  },
  {
    id: '5',
    name: 'Avocado Toast',
    image: IMG.avocadoToast,
    time: '10 min',
    difficulty: 'Easy',
    servings: 1,
    matchScore: 91,
    calories: 280,
    tags: ['Healthy', 'Breakfast', 'Under 30 min'],
    description: 'A trendy and nutritious breakfast featuring creamy avocado on toasted bread with your choice of toppings.',
    availableIngredients: ['Bread', 'Avocado', 'Lemon', 'Salt', 'Olive Oil'],
    missingIngredients: ['Poached Egg'],
    steps: [
      { step: 1, instruction: 'Toast the bread slices until golden and crispy.', time: 3 },
      { step: 2, instruction: 'Halve the avocado, remove the pit, and scoop the flesh into a bowl.', time: 2 },
      { step: 3, instruction: 'Mash the avocado with a fork, add lemon juice, salt, and pepper to taste.', time: 2, tip: 'Leave some texture for a more rustic feel.' },
      { step: 4, instruction: 'Spread the avocado mixture onto the toast. Drizzle with olive oil and add toppings of choice.', time: 2 },
    ],
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Veggie Rice Bowl',
    image: IMG.riceVeggies,
    time: '30 min',
    difficulty: 'Medium',
    servings: 2,
    matchScore: 83,
    calories: 320,
    tags: ['Healthy', 'Vegan', 'Budget Meal'],
    description: 'A hearty and colorful rice bowl loaded with seasonal vegetables and a tasty sauce.',
    availableIngredients: ['Rice', 'Broccoli', 'Carrots', 'Soy Sauce', 'Sesame Oil'],
    missingIngredients: ['Edamame', 'Pickled Ginger'],
    steps: [
      { step: 1, instruction: 'Cook rice and let it cool slightly. Meanwhile, prepare the vegetables.', time: 20 },
      { step: 2, instruction: 'Steam broccoli and carrots until just tender, about 5 minutes.', time: 5 },
      { step: 3, instruction: 'Mix soy sauce and sesame oil for the sauce.', time: 2 },
      { step: 4, instruction: 'Assemble bowls: rice base, topped with vegetables, drizzled with sauce.', time: 3 },
    ],
    rating: 4.1,
  },
];

export const HISTORY_ITEMS = [
  { id: 'h1', recipe: RECIPES[0], cookedAt: '2026-05-22', rating: 5 },
  { id: 'h2', recipe: RECIPES[4], cookedAt: '2026-05-20', rating: 4 },
  { id: 'h3', recipe: RECIPES[2], cookedAt: '2026-05-18', rating: 5 },
  { id: 'h4', recipe: RECIPES[1], cookedAt: '2026-05-15', rating: 4 },
  { id: 'h5', recipe: RECIPES[3], cookedAt: '2026-05-12', rating: 3 },
];

export const DETECTED_INGREDIENTS = [
  { id: 'i1', name: 'Tomatoes', quantity: '3 medium', confidence: 98, emoji: '🍅' },
  { id: 'i2', name: 'Pasta', quantity: '200g', confidence: 95, emoji: '🍝' },
  { id: 'i3', name: 'Garlic', quantity: '4 cloves', confidence: 92, emoji: '🧄' },
  { id: 'i4', name: 'Basil', quantity: '1 bunch', confidence: 89, emoji: '🌿' },
  { id: 'i5', name: 'Olive Oil', quantity: '50ml', confidence: 85, emoji: '🫒' },
  { id: 'i6', name: 'Red Onion', quantity: '1 large', confidence: 81, emoji: '🧅' },
  { id: 'i7', name: 'Lemon', quantity: '1 whole', confidence: 77, emoji: '🍋' },
];
