import React from 'react';
import {
  ChefHat,
  Sparkles,
  Heart,
  Code2,
  Server,
  Layers,
  CheckCircle2,
  HelpCircle,
  GraduationCap,
  Briefcase,
  Users,
  Utensils
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 text-xs font-bold border border-orange-200 dark:border-orange-800">
          <ChefHat className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>About the Application</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Empowering Every Home Cook with <span className="text-orange-600 dark:text-orange-500">AI</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          AI Recipe Generator was built to transform leftover fridge ingredients into wholesome, delicious, and easy-to-cook meals.
        </p>
      </div>

      {/* Purpose Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-100 dark:border-slate-800 shadow-xl shadow-orange-500/5 p-6 sm:p-10 space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Utensils className="w-6 h-6 text-orange-600 dark:text-orange-500" />
            Our Purpose & Mission
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            Millions of tons of perfectly good food are wasted every year simply because people don't know what to make with random ingredients sitting in their pantry or fridge. At the same time, students in hostels, beginners in the kitchen, and busy working professionals often struggle to decide what to cook each evening.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            <strong className="text-slate-900 dark:text-white">AI Recipe Generator</strong> bridges this gap. By entering whatever you have on hand, our AI assistant instantly formulates clear step-by-step instructions, complete with cooking times, difficulty levels, chef tips, and estimated nutrition values.
          </p>
        </div>

        {/* Target Audience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          
          <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-slate-800/60 border border-orange-100 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <GraduationCap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>Students & Hostel Residents</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enables budget cooking using basic electric kettles, hotplates, or single pans without complex grocery trips.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-slate-800/60 border border-orange-100 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <ChefHat className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>Beginner Cooks</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Provides failsafe instructions with pro tips on spice balancing, flame levels, and prep time.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-slate-800/60 border border-orange-100 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <Briefcase className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>Busy Professionals</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Quick express 15–20 minute dinners after work without spending hours figuring out a recipe.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-slate-800/60 border border-orange-100 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>Families</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Scalable serving sizes with healthy dietary options like Vegetarian, Vegan, Halal, and Gluten-Free.
            </p>
          </div>

        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Technology Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Built using modern web standards for speed, responsiveness, and reliable AI intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Frontend Tech */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Frontend Technologies</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Client-side User Interface</p>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>HTML5 / CSS3 / JavaScript:</strong> Modern web fundamentals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>React 19 & TypeScript:</strong> Type-safe interactive state management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Tailwind CSS v4:</strong> Custom orange & dark mode themes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Lucide Icons & Motion:</strong> Vector icons and smooth animations</span>
              </li>
            </ul>
          </div>

          {/* Backend Tech */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Backend & AI Engine</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Server-side Processing</p>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Google Gemini AI API:</strong> Powered by <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-orange-600 dark:text-orange-400 font-bold">gemini-3.6-flash</code></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Node.js & Express:</strong> Secure server-side proxy layer shielding API keys</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Structured JSON Schema:</strong> Guaranteed structured outputs with macros & steps</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>@google/genai SDK:</strong> Official Google GenAI TypeScript library</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-100 dark:border-slate-800 shadow-xl shadow-orange-500/5 p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              What if I only have 2 or 3 ingredients?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              That's totally fine! The AI will assume common household pantry items like salt, water, or cooking oil and construct a simple, tasty recipe with what you have.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              How accurate are the estimated calories and nutrition numbers?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The nutrition data is estimated by the AI based on typical portion sizes and nutritional databases. They serve as a helpful guide for balanced eating.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Is this tool free to use?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Yes, 100% free with no login or subscription required. You can generate as many recipes as you need.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
