import React, { useState } from 'react';
import { SavedRecipe } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import {
  History,
  Trash2,
  Search,
  Clock,
  Heart,
  ChevronRight,
  Flame,
  ChefHat,
  Sparkles,
  Utensils
} from 'lucide-react';

interface HistoryPageProps {
  history: SavedRecipe[];
  favorites: SavedRecipe[];
  onToggleFavorite: (savedRecipe: SavedRecipe) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  onNavigateToGenerator: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  favorites,
  onToggleFavorite,
  onDeleteHistoryItem,
  onClearHistory,
  onNavigateToGenerator,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<SavedRecipe | null>(null);

  const favoriteIds = new Set(favorites.map((f) => f.id));

  const filteredHistory = history.filter((item) => {
    const term = searchTerm.toLowerCase();
    const recipeName = item.recipe.recipeName.toLowerCase();
    const cuisine = item.recipe.cuisine.toLowerCase();
    const ingredients = item.recipe.ingredients.map((ing) =>
      typeof ing === 'string' ? ing.toLowerCase() : ing.item.toLowerCase()
    ).join(' ');

    return recipeName.includes(term) || cuisine.includes(term) || ingredients.includes(term);
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 text-xs font-bold mb-2">
            <History className="w-4 h-4" />
            <span>Recipe Generation Logs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recipe <span className="text-orange-600 dark:text-orange-500">History</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Access and re-cook all your previously generated AI meals anytime.
          </p>
        </div>

        {history.length > 0 && (
          <button
            id="clear-history-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear your entire recipe history?')) {
                onClearHistory();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-sm font-semibold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            Clear All History
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      {history.length > 0 && (
        <div className="relative max-w-md">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="history-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search history by dish, cuisine, or ingredient..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs"
          />
        </div>
      )}

      {/* History Grid / List */}
      {filteredHistory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => {
            const isFav = favoriteIds.has(item.id);
            const { recipe } = item;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Top Badges & Date */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(item.timestamp)}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 font-bold uppercase text-[10px]">
                      {recipe.cuisine}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg line-clamp-2 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
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
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isFav
                        ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDeleteHistoryItem(item.id)}
                      title="Delete entry"
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setSelectedRecipe(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <span>View Recipe</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto">
            <ChefHat className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {searchTerm ? 'No matching recipes found' : 'No Recipe History Yet'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {searchTerm
              ? `We couldn't find any generated recipes matching "${searchTerm}". Try a different keyword.`
              : 'Every recipe you create with AI Recipe Generator will be saved here automatically for quick re-access!'}
          </p>
          <button
            onClick={onNavigateToGenerator}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg transition-all cursor-pointer mt-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate First Recipe
          </button>
        </div>
      )}

      {/* Recipe Modal View when inspecting a history item */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl my-8">
            <RecipeCard
              recipe={selectedRecipe.recipe}
              onCloseModal={() => setSelectedRecipe(null)}
              isFavorite={favoriteIds.has(selectedRecipe.id)}
              onToggleFavorite={() => onToggleFavorite(selectedRecipe)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
