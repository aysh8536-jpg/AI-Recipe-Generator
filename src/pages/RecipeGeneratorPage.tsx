import React, { useState, useEffect } from 'react';
import { CuisineType, DietaryType, RecipeRequest, RecipeResponse, PresetCombination, SavedRecipe } from '../types';
import { POPULAR_INGREDIENT_TAGS } from '../data/presets';
import { RecipeCard } from '../components/RecipeCard';
import { PresetSelector } from '../components/PresetSelector';
import {
  Sparkles,
  ChefHat,
  Utensils,
  Globe,
  Users,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  Lightbulb,
  Info
} from 'lucide-react';

interface RecipeGeneratorPageProps {
  initialPreset?: PresetCombination | null;
  onRecipeGenerated?: (recipe: RecipeResponse) => void;
  favorites?: SavedRecipe[];
  onToggleFavorite?: (recipe: RecipeResponse) => void;
}

export const RecipeGeneratorPage: React.FC<RecipeGeneratorPageProps> = ({
  initialPreset,
  onRecipeGenerated,
  favorites = [],
  onToggleFavorite,
}) => {
  const [ingredients, setIngredients] = useState<string>('');
  const [cuisine, setCuisine] = useState<CuisineType | string>('Pakistani');
  const [dietary, setDietary] = useState<DietaryType | string>('Non Vegetarian');
  const [servings, setServings] = useState<number>(2);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);

  // Apply initial preset if provided
  useEffect(() => {
    if (initialPreset) {
      setIngredients(initialPreset.ingredients.join('\n'));
      setCuisine(initialPreset.cuisine);
      setDietary(initialPreset.dietary);
      setRecipe(null);
      setError(null);
    }
  }, [initialPreset]);

  const handleAddIngredientTag = (tag: string) => {
    if (ingredients.toLowerCase().includes(tag.toLowerCase())) return;
    setIngredients((prev) => (prev.trim() ? `${prev.trim()}\n${tag}` : tag));
  };

  const handleClearForm = () => {
    setIngredients('');
    setCuisine('Pakistani');
    setDietary('Non Vegetarian');
    setServings(2);
    setAdditionalNotes('');
    setRecipe(null);
    setError(null);
  };

  const handleSelectPreset = (preset: PresetCombination) => {
    setIngredients(preset.ingredients.join('\n'));
    setCuisine(preset.cuisine);
    setDietary(preset.dietary);
    setRecipe(null);
    setError(null);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ingredients || ingredients.trim().length === 0) {
      setError('Please enter at least one ingredient to generate a recipe.');
      return;
    }

    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const payload: RecipeRequest = {
        ingredients,
        cuisine,
        dietary,
        servings,
        additionalNotes,
      };

      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type');
      let data: any;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const rawText = await response.text();
        console.error('Server returned non-JSON response:', rawText);
        throw new Error('The server encountered an issue while generating the recipe. Please try again.');
      }

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to generate recipe. Please check your network and try again.');
      }

      setRecipe(data);

      if (onRecipeGenerated) {
        onRecipeGenerated(data);
      }

      // Smooth scroll to recipe card
      setTimeout(() => {
        const recipeCard = document.getElementById('recipe-card-container');
        if (recipeCard) {
          recipeCard.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } catch (err: any) {
      console.error('Recipe generation error:', err);
      setError(err?.message || 'An unexpected error occurred while contacting the AI Chef. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isCurrentFavorite = recipe ? favorites.some(f => f.recipeName === recipe.recipeName) : false;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 text-xs font-bold border border-orange-200 dark:border-orange-800">
          <ChefHat className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>AI Kitchen Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Recipe <span className="text-orange-600 dark:text-orange-500">Generator</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Select your cuisine, set dietary requirements, and list ingredients in your kitchen. Gemini AI will handle the rest!
        </p>
      </div>

      {/* Generator Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-100 dark:border-slate-800 shadow-xl shadow-orange-500/5 p-6 sm:p-8 space-y-8">
        
        <form onSubmit={handleGenerate} className="space-y-6">
          
          {/* Ingredients Input Textarea */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="ingredients-input" className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                Available Ingredients <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                id="clear-ingredients-btn"
                onClick={() => setIngredients('')}
                className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Text
              </button>
            </div>

            <textarea
              id="ingredients-input"
              rows={5}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder={`Example:\nChicken\nRice\nTomato\nOnion`}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-orange-500/10 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base font-medium transition-all resize-none"
            />

            {/* Quick Add Ingredient Chips */}
            <div className="space-y-1.5 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-orange-500" /> Quick Add Common Staples:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_INGREDIENT_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    id={`quick-add-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleAddIngredientTag(tag)}
                    className="px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/60 hover:bg-orange-100 dark:hover:bg-orange-900/80 text-orange-800 dark:text-orange-200 text-xs font-semibold border border-orange-200/80 dark:border-orange-800 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>+</span> {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Cuisine Dropdown */}
            <div className="space-y-2">
              <label htmlFor="cuisine-select" className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                Cuisine Style
              </label>
              <select
                id="cuisine-select"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 text-slate-800 dark:text-slate-100 text-sm font-semibold transition-all cursor-pointer"
              >
                <option value="Pakistani">Pakistani Cuisine</option>
                <option value="Indian">Indian Cuisine</option>
                <option value="Chinese">Chinese Cuisine</option>
                <option value="Italian">Italian Cuisine</option>
                <option value="American">American Cuisine</option>
                <option value="Mexican">Mexican Cuisine</option>
                <option value="Any / Chef's Choice">Any / Surprise Me!</option>
              </select>
            </div>

            {/* Dietary Preference */}
            <div className="space-y-2">
              <label htmlFor="dietary-select" className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                Dietary Preference
              </label>
              <select
                id="dietary-select"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 text-slate-800 dark:text-slate-100 text-sm font-semibold transition-all cursor-pointer"
              >
                <option value="Non Vegetarian">Non Vegetarian</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Halal">Halal</option>
                <option value="Gluten-Free">Gluten-Free</option>
              </select>
            </div>

            {/* Servings Counter */}
            <div className="space-y-2">
              <label htmlFor="servings-select" className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                Number of Servings
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="servings-decrease-btn"
                  onClick={() => setServings((prev) => Math.max(1, prev - 1))}
                  className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-extrabold text-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  -
                </button>
                <div className="flex-1 text-center font-extrabold text-lg bg-slate-50 dark:bg-slate-800 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                  {servings} {servings === 1 ? 'Person' : 'People'}
                </div>
                <button
                  type="button"
                  id="servings-increase-btn"
                  onClick={() => setServings((prev) => Math.min(12, prev + 1))}
                  className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-extrabold text-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Optional Additional Preferences */}
          <div className="space-y-2">
            <label htmlFor="notes-input" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-orange-500" />
              Extra Notes or Cooking Equipment (Optional)
            </label>
            <input
              type="text"
              id="notes-input"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g. Under 20 mins, Air-Fryer friendly, Extra spicy, Hostel hot plate..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm transition-all"
            />
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="submit"
              id="generate-recipe-submit-btn"
              disabled={loading}
              className={`w-full sm:flex-1 py-4 px-8 rounded-2xl font-extrabold text-base text-white shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer ${
                loading
                  ? 'bg-orange-400 cursor-not-allowed opacity-90'
                  : 'bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 hover:from-orange-700 hover:to-amber-600 shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                  <span>Generating Recipe with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  <span>Generate Recipe</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="reset-form-btn"
              onClick={handleClearForm}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-2xl transition-colors cursor-pointer"
            >
              Reset All
            </button>
          </div>

        </form>

      </div>

      {/* Loading Spinner Indicator */}
      {loading && (
        <div className="bg-orange-50/80 dark:bg-slate-900 border border-orange-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-600/30">
            <ChefHat className="w-8 h-8 animate-bounce" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Crafting Your Custom Recipe...</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
              Our AI Chef is balancing flavors, calculating calorie estimates, and writing step-by-step instructions.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/80 px-4 py-2 rounded-full w-fit mx-auto">
            <Lightbulb className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Pro Tip: You can check off steps as you cook!</span>
          </div>
        </div>
      )}

      {/* Friendly Error Message */}
      {error && (
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-3xl p-6 text-slate-900 dark:text-slate-100 space-y-3 animate-in fade-in">
          <div className="flex items-center gap-3 text-rose-700 dark:text-rose-400 font-bold text-base">
            <AlertCircle className="w-6 h-6 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>Generation Notice</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-9">
            {error}
          </p>
          <div className="pl-9">
            <button
              type="button"
              id="error-retry-btn"
              onClick={handleGenerate}
              className="text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 hover:bg-rose-200 transition-colors cursor-pointer px-4 py-2 rounded-xl"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Generated Recipe Display Card */}
      {recipe && !loading && (
        <RecipeCard
          recipe={recipe}
          onClear={() => setRecipe(null)}
          isFavorite={isCurrentFavorite}
          onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(recipe) : undefined}
        />
      )}

      {/* Preset Inspirations */}
      {!recipe && !loading && (
        <div className="pt-4">
          <PresetSelector onSelectPreset={handleSelectPreset} />
        </div>
      )}

    </div>
  );
};
