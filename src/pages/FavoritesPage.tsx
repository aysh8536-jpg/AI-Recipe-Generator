import React, { useState } from 'react';
import { SavedRecipe } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import {
  Heart,
  Search,
  Clock,
  ChevronRight,
  Flame,
  ChefHat,
  Sparkles,
  Utensils
} from 'lucide-react';

interface FavoritesPageProps {
  favorites: SavedRecipe[];
  onToggleFavorite: (savedRecipe: SavedRecipe) => void;
  onNavigateToGenerator: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
  onToggleFavorite,
  onNavigateToGenerator,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<SavedRecipe | null>(null);

  const filteredFavorites = favorites.filter((item) => {
    const term = searchTerm.toLowerCase();
    const recipeName = item.recipe.recipeName.toLowerCase();
    const cuisine = item.recipe.cuisine.toLowerCase();
    const ingredients = item.recipe.ingredients.map((ing) =>
      typeof ing === 'string' ? ing.toLowerCase() : ing.item.toLowerCase()
    ).join(' ');

    return recipeName.includes(term) || cuisine.includes(term) || ingredients.includes(term);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 text-xs font-bold mb-2">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Your Saved Cookbook</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Favorite <span className="text-rose-600 dark:text-rose-500">Recipes</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Your personal collection of bookmarked culinary creations.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      {favorites.length > 0 && (
        <div className="relative max-w-md">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="favorites-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved favorites by dish, cuisine, or ingredient..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
          />
        </div>
      )}

      {/* Favorites Grid / List */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((item) => {
            const { recipe } = item;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-rose-100 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 font-bold uppercase text-[10px]">
                      ❤️ Favorite
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 font-bold uppercase text-[10px]">
                      {recipe.cuisine}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg line-clamp-2 leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {recipe.recipeName}
                  </h3>

                  {/* Quick Meta */}
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-medium pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      {recipe.prepTime} prep
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      {recipe.estimatedCalories}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{recipe.difficulty}</span>
                  </div>

                  {/* Ingredients Preview */}
                  <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <strong className="text-slate-700 dark:text-slate-300 font-semibold">Ingredients: </strong>
                    {recipe.ingredients.map((ing) => (typeof ing === 'string' ? ing : ing.item)).join(', ')}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onToggleFavorite(item)}
                    title="Remove from favorites"
                    className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  </button>

                  <button
                    onClick={() => setSelectedRecipe(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>View Recipe</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {searchTerm ? 'No matching favorites found' : 'No Favorite Recipes Saved Yet'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {searchTerm
              ? `We couldn't find any saved recipes matching "${searchTerm}". Try a different keyword.`
              : 'Tap the heart icon on any recipe card to save your favorite dishes here for fast access!'}
          </p>
          <button
            onClick={onNavigateToGenerator}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg transition-all cursor-pointer mt-2"
          >
            <Sparkles className="w-4 h-4" />
            Discover & Save Recipes
          </button>
        </div>
      )}

      {/* Recipe Modal View */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl my-8">
            <RecipeCard
              recipe={selectedRecipe.recipe}
              onCloseModal={() => setSelectedRecipe(null)}
              isFavorite={true}
              onToggleFavorite={() => onToggleFavorite(selectedRecipe)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
