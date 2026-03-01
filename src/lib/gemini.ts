import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyAKWPgPYAMyntCdYeLy0DjyfgiujR18uqc";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface AnalysisResult {
  riskLevel: "low" | "moderate" | "high" | "critical";
  confidencePercent: number;
  findings: string[];
  summary: string;
  recommendation: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function analyzeXray(file: File): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const base64 = await fileToBase64(file);

  const prompt = `You are a medical AI assistant specialized in radiology. Analyze this chest X-ray image for potential signs of lung cancer or pulmonary abnormalities.

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "riskLevel": "low" | "moderate" | "high" | "critical",
  "confidencePercent": <number between 0 and 100>,
  "findings": ["finding 1", "finding 2", ...],
  "summary": "A 2-3 sentence medical summary of the analysis",
  "recommendation": "A recommendation for next steps"
}

Important notes:
- Be thorough but responsible in your assessment
- Include a disclaimer that this is AI-assisted and not a substitute for professional medical diagnosis
- Evaluate for masses, nodules, opacities, pleural effusion, mediastinal widening, and other abnormalities
- If the image is not a chest X-ray, set riskLevel to "low", confidencePercent to 0, and note that in findings`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType: file.type || "image/png",
        data: base64,
      },
    },
  ]);

  const text = result.response.text().trim();
  
  // Strip markdown code fences if present
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

  try {
    return JSON.parse(cleaned) as AnalysisResult;
  } catch {
    return {
      riskLevel: "low",
      confidencePercent: 0,
      findings: ["Unable to parse AI response. Please try again."],
      summary: "Analysis could not be completed. The AI model returned an unexpected response format.",
      recommendation: "Please retry the analysis or consult a healthcare professional.",
    };
  }
}
