import React from 'react';
import { PRESET_COMBINATIONS } from '../data/presets';
import { PresetCombination } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PresetSelectorProps {
  onSelectPreset: (preset: PresetCombination) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ onSelectPreset }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-orange-500" />
            Quick Inspiration Presets
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Click any preset to prefill ingredients & settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PRESET_COMBINATIONS.map((preset) => (
          <button
            key={preset.id}
            id={`preset-btn-${preset.id}`}
            onClick={() => onSelectPreset(preset)}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-orange-400 dark:hover:border-orange-600 hover:bg-orange-50/40 dark:hover:bg-slate-800/60 text-left transition-all shadow-xs hover:shadow-md group cursor-pointer flex flex-col justify-between gap-2"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-2xl">{preset.emoji}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300">
                  {preset.cuisine}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {preset.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                {preset.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-orange-600 dark:text-orange-400 font-semibold pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>{preset.ingredients.length} Ingredients</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Load Preset <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
