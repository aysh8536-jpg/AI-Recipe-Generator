import dotenv from "dotenv";

const result = dotenv.config();

console.log("Dotenv Result:", result);
console.log("Current Directory:", process.cwd());
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Recipe Generator API Endpoint
  app.post('/api/generate-recipe', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const { ingredients, cuisine, dietary, servings, additionalNotes } = req.body || {};

      if (!ingredients || typeof ingredients !== 'string' || ingredients.trim().length === 0) {
        return res.status(400).json({ error: 'Please enter at least one ingredient to generate a recipe.' });
      }
const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key from env:", apiKey);

if (!apiKey) {
  return res.status(500).json({
    error: 'Gemini API Key is missing. Please ensure GEMINI_API_KEY is configured in your environment settings.'
  });
}

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Generate a realistic, delicious recipe using the following parameters:
- Available Ingredients: ${ingredients.trim()}
- Preferred Cuisine: ${cuisine || 'Any / Best Fit'}
- Dietary Requirement: ${dietary || 'None / Standard'}
- Number of Servings: ${servings || 2}
${additionalNotes ? `- Extra Preferences/Notes: ${additionalNotes}` : ''}

Focus on using the provided ingredients as much as possible. If essential ingredients like oil, salt, or water are needed or if missing a key item to make the dish work, list those separately in missingIngredients. Keep step-by-step instructions beginner friendly.`;

      const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction:
            `You are a professional chef. Generate recipes using the user's ingredients. Always include: Recipe Name, Cuisine, Preparation Time, Cooking Time, Difficulty, Ingredients, Instructions, Cooking Tips, Nutrition. Use only provided ingredients whenever possible. Mention missing essential ingredients separately. Keep instructions beginner friendly. Respond strictly in valid structured JSON matching the requested schema.`,
          temperature: 0.7,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recipeName: {
                type: Type.STRING,
                description: 'Recipe Name: Creative and appetizing title for the dish.',
              },
              cuisine: {
                type: Type.STRING,
                description: 'Cuisine: The cuisine style (e.g., Pakistani, Indian, Italian, Chinese, Mexican).',
              },
              prepTime: {
                type: Type.STRING,
                description: 'Preparation Time (e.g., "15 mins").',
              },
              cookTime: {
                type: Type.STRING,
                description: 'Cooking Time (e.g., "25 mins").',
              },
              difficulty: {
                type: Type.STRING,
                description: 'Difficulty: "Easy", "Medium", or "Hard".',
              },
              servings: {
                type: Type.NUMBER,
                description: 'Number of servings.',
              },
              summary: {
                type: Type.STRING,
                description: 'Short 1-2 sentence overview of the dish.',
              },
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: 'Ingredients: List of provided/used ingredients with quantities.',
              },
              missingIngredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: 'Mention missing essential ingredients separately (e.g., cooking oil, salt, or missing key spices/pantry items). Return an empty array if none missing.',
              },
              instructions: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: 'Instructions: Beginner friendly step-by-step cooking steps.',
              },
              cookingTips: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: 'Cooking Tips: Helpful professional chef advice or variation suggestions.',
              },
              estimatedCalories: {
                type: Type.STRING,
                description: 'Estimated Calories per serving (e.g., "450 kcal").',
              },
              nutrition: {
                type: Type.OBJECT,
                properties: {
                  protein: { type: Type.STRING, description: 'Protein content per serving (e.g., "30g")' },
                  carbs: { type: Type.STRING, description: 'Carbohydrates content per serving (e.g., "40g")' },
                  fat: { type: Type.STRING, description: 'Fat content per serving (e.g., "12g")' },
                  fiber: { type: Type.STRING, description: 'Fiber content per serving (e.g., "5g")' },
                },
                required: ['protein', 'carbs', 'fat', 'fiber'],
              },
              dietaryTag: {
                type: Type.STRING,
                description: 'Dietary classification tag e.g. "Vegetarian", "Non Vegetarian", "Vegan".',
              },
            },
            required: [
              'recipeName',
              'cuisine',
              'prepTime',
              'cookTime',
              'difficulty',
              'servings',
              'summary',
              'ingredients',
              'missingIngredients',
              'instructions',
              'cookingTips',
              'estimatedCalories',
              'nutrition',
            ],
          },
        },
      });

      let responseText = response.text || '';
      if (!responseText.trim()) {
        throw new Error('Received an empty response from Gemini AI.');
      }

      // Clean Markdown fences if present
      responseText = responseText.trim();
      if (responseText.startsWith('```')) {
        responseText = responseText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
      }

      const recipeData = JSON.parse(responseText);
      return res.json(recipeData);
    } catch (err: any) {
      console.error('Error generating recipe:', err);
      return res.status(500).json({
        error: err?.message || 'Failed to generate recipe. Please try again with a different list of ingredients.',
      });
    }
  });

  // Catch-all 404 for unmatched API routes to avoid returning HTML
  app.all('/api/*', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: 'API route not found' });
  });

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
