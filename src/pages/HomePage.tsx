import React from 'react';
import {
  Sparkles,
  Utensils,
  ChefHat,
  Clock,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Heart,
  Zap,
  GraduationCap,
  Users,
  Briefcase,
  Flame
} from 'lucide-react';
import { PresetSelector } from '../components/PresetSelector';
import { PresetCombination } from '../types';

interface HomePageProps {
  onNavigateToGenerator: () => void;
  onSelectPreset: (preset: PresetCombination) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToGenerator, onSelectPreset }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/80 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-orange-100/60 dark:border-slate-800 rounded-b-[2.5rem] transition-colors">
        
        {/* Abstract Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-400/10 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 text-xs sm:text-sm font-bold border border-orange-200 dark:border-orange-800 shadow-xs">
              <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400 animate-pulse" />
              <span>AI-Powered Smart Kitchen Companion</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Cook Amazing Meals <br className="hidden sm:inline" />
              with <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">AI Intelligence</span>
            </h1>

            {/* Short Description */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform ingredients you already have at home into mouth-watering, step-by-step recipes in seconds. Save money, eliminate food waste, and discover effortless home cooking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-start-cooking-btn"
                onClick={onNavigateToGenerator}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <ChefHat className="w-6 h-6" />
                Start Cooking Now
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Free • No Signup Needed</span>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left border-t border-slate-200/60 dark:border-slate-800">
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">10k+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Recipes Generated</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-orange-600 dark:text-orange-400">6+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Global Cuisines</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">0%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Food Wasted</p>
              </div>
            </div>
          </div>

          {/* Right Hero Food Illustration / Graphics Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg">
              
              {/* Outer Decorative Card Wrapper */}
              <div className="bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-400 p-1.5 rounded-3xl shadow-2xl shadow-orange-500/20 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white dark:bg-slate-900 rounded-[1.4rem] p-6 space-y-6">
                  
                  {/* Hero Dish Graphic Card */}
                  <div className="relative h-64 sm:h-72 rounded-2xl bg-gradient-to-br from-amber-100 via-orange-100 to-orange-50 dark:from-slate-800 dark:via-slate-800/90 dark:to-orange-950/40 flex items-center justify-center overflow-hidden border border-orange-200/60 dark:border-slate-700 group">
                    <div className="text-center space-y-3 z-10 p-4">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md flex items-center justify-center text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300">
                        🥘
                      </div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl">
                        Desi Chicken Karahi
                      </h3>
                      <p className="text-xs text-orange-700 dark:text-orange-300 font-semibold bg-orange-100 dark:bg-orange-950/80 px-3 py-1 rounded-full inline-block">
                        Made from Pantry Staples
                      </p>
                    </div>

                    {/* Floating badge 1 */}
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-orange-100 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 animate-bounce">
                      <Clock className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                      <span>25 Mins</span>
                    </div>

                    {/* Floating badge 2 */}
                    <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-orange-100 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-rose-500" />
                      <span>420 kcal</span>
                    </div>
                  </div>

                  {/* Sample ingredients pills preview */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Input Ingredients Used:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Chicken', 'Tomatoes', 'Onion', 'Garlic', 'Chili'].map((item) => (
                        <span key={item} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-lg border border-slate-200/80 dark:border-slate-700">
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Quick Preset Inspiration Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <PresetSelector
            onSelectPreset={(preset) => {
              onSelectPreset(preset);
              onNavigateToGenerator();
            }}
          />
        </div>
      </section>

      {/* App Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Use AI Recipe Generator?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Designed to solve everyday kitchen struggles for students, families, and busy cooks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-orange-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Instant AI Recipes</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              No need to scour recipe blogs with long stories. Get precise step-by-step cooking steps in seconds.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-orange-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Zero Food Waste</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Use up leftover ingredients in your fridge before they spoil. Save money on grocery shopping.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-orange-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Custom Dietary Filters</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Tailor recipes for Vegetarian, Vegan, Non-Veg, Halal, or Gluten-Free meal plans automatically.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-orange-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Macro & Calorie Breakdown</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Understand estimated calories, protein, carbs, and fat per serving for healthy lifestyle choices.
            </p>
          </div>

        </div>
      </section>


      {/* Target Audience Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 rounded-3xl p-8 sm:p-12 text-white space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-900/50 px-3 py-1 rounded-full border border-orange-700/50">
              Built For Everyone
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Who is this application for?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Whether you're living in a hostel or cooking for a family of six, AI Recipe Generator adjusts to your kitchen setup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <GraduationCap className="w-8 h-8 text-orange-400" />
              <h4 className="font-bold text-lg text-white">Students & Hostelers</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Quick, low-budget meals with basic pantry items and minimal cookware.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <ChefHat className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-lg text-white">Cooking Beginners</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clear step-by-step instructions with chef tips so you never fail a dish.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <Briefcase className="w-8 h-8 text-emerald-400" />
              <h4 className="font-bold text-lg text-white">Busy Professionals</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fast 15-minute express dinner ideas after long work hours.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <Users className="w-8 h-8 text-rose-400" />
              <h4 className="font-bold text-lg text-white">Families</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Custom serving sizes to feed any group with healthy wholesome ingredients.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl shadow-orange-500/20">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Cook Something Special Today?
          </h2>
          <p className="text-orange-100 text-base sm:text-lg max-w-2xl mx-auto">
            Enter the ingredients currently in your fridge and let AI curate a custom recipe for you.
          </p>
          <div>
            <button
              id="bottom-cta-btn"
              onClick={onNavigateToGenerator}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-700 hover:bg-orange-50 font-extrabold text-lg rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-orange-600" />
              Open Recipe Generator
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
