import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RecipeGeneratorPage } from './pages/RecipeGeneratorPage';
import { HistoryPage } from './pages/HistoryPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { ActiveTabType, PresetCombination, RecipeResponse, SavedRecipe } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('home');
  const [selectedPreset, setSelectedPreset] = useState<PresetCombination | null>(null);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('ai_recipe_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // History State
  const [history, setHistory] = useState<SavedRecipe[]>(() => {
    try {
      const saved = localStorage.getItem('ai_recipe_history');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Failed to parse recipe history from localStorage', err);
      return [];
    }
  });

  // Favorites State
  const [favorites, setFavorites] = useState<SavedRecipe[]>(() => {
    try {
      const saved = localStorage.getItem('ai_recipe_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Failed to parse recipe favorites from localStorage', err);
      return [];
    }
  });

  // Sync Dark Mode to HTML document root class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ai_recipe_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ai_recipe_theme', 'light');
    }
  }, [darkMode]);

  // Sync History to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ai_recipe_history', JSON.stringify(history));
    } catch (err) {
      console.error('Failed to save history to localStorage', err);
    }
  }, [history]);

  // Sync Favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ai_recipe_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage', err);
    }
  }, [favorites]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSelectPreset = (preset: PresetCombination) => {
    setSelectedPreset(preset);
  };

  const handleRecipeGenerated = (newRecipe: RecipeResponse) => {
    const savedItem: SavedRecipe = {
      id: `recipe_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      recipe: newRecipe,
    };

    setHistory((prev) => [savedItem, ...prev]);
  };

  const handleToggleFavoriteByRecipe = (recipeRes: RecipeResponse) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.recipe.recipeName === recipeRes.recipeName);
      if (exists) {
        return prev.filter((item) => item.recipe.recipeName !== recipeRes.recipeName);
      } else {
        const favoriteItem: SavedRecipe = {
          id: `fav_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          timestamp: Date.now(),
          recipe: recipeRes,
          isFavorite: true,
        };
        return [favoriteItem, ...prev];
      }
    });
  };

  const handleToggleFavoriteBySavedItem = (savedRecipe: SavedRecipe) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.recipe.recipeName === savedRecipe.recipe.recipeName);
      if (exists) {
        return prev.filter((item) => item.recipe.recipeName !== savedRecipe.recipe.recipeName);
      } else {
        return [savedRecipe, ...prev];
      }
    });
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white transition-colors duration-200">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        historyCount={history.length}
        favoritesCount={favorites.length}
      />

      {/* Main Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigateToGenerator={() => {
              setActiveTab('generator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeTab === 'generator' && (
          <RecipeGeneratorPage
            initialPreset={selectedPreset}
            onRecipeGenerated={handleRecipeGenerated}
            favorites={favorites}
            onToggleFavorite={handleToggleFavoriteByRecipe}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            history={history}
            favorites={favorites}
            onToggleFavorite={handleToggleFavoriteBySavedItem}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
            onNavigateToGenerator={() => {
              setActiveTab('generator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesPage
            favorites={favorites}
            onToggleFavorite={handleToggleFavoriteBySavedItem}
            onNavigateToGenerator={() => {
              setActiveTab('generator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
