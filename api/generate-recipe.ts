import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const {
      ingredients,
      cuisine,
      dietary,
      servings,
      additionalNotes
    } = req.body || {};

    if (!ingredients || ingredients.trim().length === 0) {
      return res.status(400).json({
        error: "Please enter at least one ingredient."
      });
    }


    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Gemini API Key is missing."
      });
    }


    const ai = new GoogleGenAI({
      apiKey
    });


    const prompt = `
Generate a realistic delicious recipe.

Ingredients:
${ingredients}

Cuisine:
${cuisine}

Dietary:
${dietary}

Servings:
${servings}

Notes:
${additionalNotes}
`;


    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    });


    const recipe = JSON.parse(response.text || "{}");


    return res.status(200).json(recipe);


  } catch(error:any){

    console.error(error);

    return res.status(500).json({
      error: error.message || "Failed to generate recipe"
    });

  }
}