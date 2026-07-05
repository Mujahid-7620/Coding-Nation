import { GoogleGenAI } from '@google/genai';

let ai: GoogleGenAI | null = null;

export function getGemini() {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is missing');
    }
    ai = new GoogleGenAI({ apiKey: key });
  }
  return ai;
}

export class GeminiService {
  static async generateContent(prompt: string) {
    try {
      const client = getGemini();
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  static async analyzeResume(resumeText: string, jobDescription: string) {
    const prompt = `Analyze this resume against the job description. Provide an ATS score (0-100), missing keywords, and improvement suggestions.\n\nResume:\n${resumeText}\n\nJob Description:\n${jobDescription}`;
    return this.generateContent(prompt);
  }

  static async generateRoadmap(goal: string, currentSkills: string) {
    const prompt = `Generate a learning roadmap to achieve the goal: ${goal}, given the current skills: ${currentSkills}. Keep it concise and practical.`;
    return this.generateContent(prompt);
  }

  static async mockInterview(role: string, userResponse?: string) {
    const prompt = userResponse 
      ? `I am interviewing for the role of ${role}. My answer to the previous question was: "${userResponse}". Evaluate my answer briefly and ask the next technical or behavioral question.`
      : `I am interviewing for the role of ${role}. Ask me the first question (can be technical or behavioral).`;
    return this.generateContent(prompt);
  }
}
