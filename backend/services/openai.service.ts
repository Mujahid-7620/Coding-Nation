import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export function getOpenAI() {
  if (!openaiClient) {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      throw new Error('OPENAI_API_KEY is missing');
    }
    openaiClient = new OpenAI({ apiKey: key });
  }
  return openaiClient;
}

export class OpenAIService {
  static async generateContent(prompt: string) {
    try {
      const client = getOpenAI();
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
}
