import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from 'next/server';
import { type ColorAnalysis } from '@/lib/types';

// The API key is read from server-side environment variables, ensuring it's not exposed to the client.
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.error("GEMINI_API_KEY environment variable not found. The API route will not work.");
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    season: {
      type: Type.STRING,
      description: "The user's color season, e.g., 'Spring', 'Summer', 'Autumn', 'Winter'."
    },
    palette: {
      type: Type.ARRAY,
      description: "An array of 5-7 dominant colors for the season.",
      items: {
        type: Type.OBJECT,
        properties: {
          hex: {
            type: Type.STRING,
            description: "The hex code of the color, e.g., '#FF7F50'."
          },
          name: {
            type: Type.STRING,
            description: "A common name for the color, e.g., 'Coral'."
          }
        },
        required: ["hex", "name"]
      }
    },
    explanation: {
      type: Type.STRING,
      description: "A brief explanation of why the user fits into this season, based on their features."
    },
    recommendations: {
        type: Type.OBJECT,
        description: "Tailored recommendations for the user.",
        properties: {
            clothing: {
                type: Type.ARRAY,
                description: "List of recommended clothing colors or items.",
                items: { type: Type.STRING }
            },
            makeup: {
                type: Type.ARRAY,
                description: "List of recommended makeup shades.",
                items: { type: Type.STRING }
            },
            accessories: {
                type: Type.ARRAY,
                description: "List of recommended accessories or jewelry types.",
                items: { type: Type.STRING }
            }
        },
        required: ["clothing", "makeup", "accessories"]
    }
  },
  required: ["season", "palette", "explanation", "recommendations"]
};

export async function POST(request: Request) {
  if (!ai) {
    console.error("Missing Gemini API Key. Please set the GEMINI_API_KEY environment variable.");
    return NextResponse.json({ 
      error: 'Server configuration error: Missing API Key. Please check the server logs and ensure the GEMINI_API_KEY is set in your environment variables.' 
    }, { status: 500 });
  }

  try {
    const { base64ImageData, mimeType } = await request.json();

    if (!base64ImageData || !mimeType) {
        return NextResponse.json({ error: 'Missing image data or mime type.' }, { status: 400 });
    }

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64ImageData,
      },
    };

    const textPart = {
      text: `You are a world-class personal color analyst. Your goal is to analyze the user's selfie to determine their color season.
1.  Carefully analyze the user's skin undertones (warm/yellow-based or cool/blue-based), hair color (warmth, coolness, saturation), and eye color from the provided image.
2.  Based on this analysis, classify the user into one of the four primary color seasons: Winter, Summer, Spring, or Autumn.
3.  Provide a representative color palette for that season, consisting of 5-7 key colors.
4.  Write a concise, one-paragraph explanation for your classification, referencing the user's likely features.
5.  Provide a list of tailored recommendations for clothing colors, makeup shades, and accessory types that would be most flattering for their season.

Return your complete analysis ONLY in the specified JSON format. Ensure the image is a photo of a person before proceeding.`
    };
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      }
    });

    const responseText = response.text;
    if (!responseText) {
      return NextResponse.json({ error: "The model returned an empty response. Please try a different image." }, { status: 500 });
    }
    
    try {
      const parsedJson: ColorAnalysis = JSON.parse(responseText);
      return NextResponse.json(parsedJson);
    } catch (parseError) {
      console.error("Failed to parse JSON response from API:", responseText);
      return NextResponse.json({ error: "The model returned an invalid response format. Please try again." }, { status: 500 });
    }

  } catch (error: unknown) {
    console.error("Error in /api/analyze route:", error);
    if (error instanceof Error && error.message.includes('SAFETY')) {
        return NextResponse.json({ error: "The image could not be processed due to safety settings. Please try a different image." }, { status: 400 });
    }
    return NextResponse.json({ error: "An error occurred while communicating with the AI model. Please try again later." }, { status: 500 });
  }
}
