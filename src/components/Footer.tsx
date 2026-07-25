import React from 'react';
import { ActiveTabType } from '../types';
import {
  ChefHat,
  Heart,
  Sparkles,
  Utensils,
  BookOpen,
  ShieldCheck,
  History
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="no-print bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-600/30">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                AI Recipe <span className="text-orange-500">Generator</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Helping students, hostel residents, beginners, busy professionals, and families turn whatever ingredients they have into delicious home-cooked meals while fighting food waste.
            </p>
            <div className="flex items-center gap-2 text-xs text-orange-400 bg-orange-950/40 border border-orange-900/50 px-3 py-1.5 rounded-lg w-fit">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Powered by Google Gemini AI</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  id="footer-link-home"
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Utensils className="w-3.5 h-3.5 text-orange-500" /> Home Page
                </button>
              </li>
              <li>
                <button
                  id="footer-link-generator"
                  onClick={() => { setActiveTab('generator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Recipe Generator
                </button>
              </li>
              <li>
                <button
                  id="footer-link-history"
                  onClick={() => { setActiveTab('history'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <History className="w-3.5 h-3.5 text-orange-500" /> Recipe History
                </button>
              </li>
              <li>
                <button
                  id="footer-link-favorites"
                  onClick={() => { setActiveTab('favorites'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500" /> Favorite Recipes
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-orange-500" /> About & Tech Stack
                </button>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Supported Cuisines</h4>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-300">
              {['Pakistani', 'Indian', 'Chinese', 'Italian', 'American', 'Mexican'].map((cuisine) => (
                <span key={cuisine} className="px-2.5 py-1 bg-slate-800 border border-slate-700/80 rounded-md">
                  {cuisine}
                </span>
              ))}
            </div>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Safe & Healthy Custom Dietary Filters</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AI Recipe Generator. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> for passionate home cooks everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};
