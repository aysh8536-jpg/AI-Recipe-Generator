export type CuisineType = 'Pakistani' | 'Indian' | 'Chinese' | 'Italian' | 'American' | 'Mexican' | 'Any';
export type DietaryType = 'Vegetarian' | 'Non Vegetarian' | 'Vegan' | 'Halal' | 'Gluten-Free';
export type DifficultyType = 'Easy' | 'Medium' | 'Hard';

export interface RecipeRequest {
  ingredients: string;
  cuisine: CuisineType | string;
  dietary: DietaryType | string;
  servings: number;
  additionalNotes?: string;
}

export interface IngredientItem {
  item: string;
  amount?: string;
}

export interface NutritionInfo {
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
}

export interface RecipeResponse {
  recipeName: string;
  cuisine: string;
  prepTime: string;
  cookTime: string;
  difficulty: DifficultyType | string;
  servings: number;
  summary?: string;
  ingredients: (string | IngredientItem)[];
  instructions: string[];
  cookingTips: string[];
  missingIngredients?: string[];
  estimatedCalories: string;
  nutrition: NutritionInfo;
  dietaryTag?: string;
}

export interface PresetCombination {
  id: string;
  title: string;
  description: string;
  cuisine: CuisineType;
  dietary: DietaryType;
  ingredients: string[];
  emoji: string;
}

export interface SavedRecipe {
  id: string;
  timestamp: number;
  recipe: RecipeResponse;
  isFavorite?: boolean;
}

export type ActiveTabType = 'home' | 'generator' | 'history' | 'favorites' | 'about';
