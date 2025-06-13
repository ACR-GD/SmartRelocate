// Client-side OpenAI utilities for SmartRelocate.ai
// Note: This is primarily for client-side processing if needed
// The main AI functionality is handled server-side for security

interface OpenAIConfig {
  apiKey?: string;
  model?: string;
}

export class OpenAIClient {
  private apiKey: string;
  private model: string;

  constructor(config: OpenAIConfig = {}) {
    this.apiKey = config.apiKey || import.meta.env.VITE_OPENAI_API_KEY || '';
    this.model = config.model || 'gpt-4o'; // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
  }

  async generateResponse(prompt: string, systemPrompt?: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const messages = [];
      
      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }
      
      messages.push({ role: 'user', content: prompt });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenAI API call failed:', error);
      throw new Error(`Failed to generate AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async analyzeRelocationProfile(profile: {
    country?: string;
    profession?: string;
    family?: string;
    income?: string;
    timeline?: string;
  }): Promise<{
    recommendedVisa: string;
    eligibilityScore: number;
    recommendations: string[];
    nextSteps: string[];
  }> {
    const systemPrompt = `You are SmartRelocate, an expert relocation advisor for Malaysia. 
    Analyze the user profile and provide visa recommendations with eligibility scoring.
    
    Available visa types:
    1. DE Rantau Pass - Digital nomads, 12 months, $24k+ income
    2. MM2H Programme - Long-term residence, 10 years, family-friendly
    3. Employment Pass - Work visa, up to 5 years, requires Malaysian employer
    
    Respond with JSON format: {
      "recommendedVisa": "visa name",
      "eligibilityScore": number (1-100),
      "recommendations": ["recommendation1", "recommendation2"],
      "nextSteps": ["step1", "step2"]
    }`;

    const prompt = `Analyze this relocation profile:
    Country: ${profile.country || 'Not specified'}
    Profession: ${profile.profession || 'Not specified'}
    Family: ${profile.family || 'Not specified'}
    Income: ${profile.income || 'Not specified'}
    Timeline: ${profile.timeline || 'Not specified'}
    
    Provide visa recommendations and eligibility assessment.`;

    try {
      const response = await this.generateResponse(prompt, systemPrompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to analyze relocation profile:', error);
      return {
        recommendedVisa: 'Unable to determine',
        eligibilityScore: 0,
        recommendations: ['Please provide more information about your background'],
        nextSteps: ['Contact our support team for personalized assistance'],
      };
    }
  }
}

// Export a default instance for convenience
export const openaiClient = new OpenAIClient();

// Helper function for client-side usage
export async function generateRelocationAdvice(
  userMessage: string,
  conversationContext?: any
): Promise<{
  message: string;
  recommendations?: any;
  followUpQuestions?: string[];
}> {
  try {
    const systemPrompt = `You are SmartRelocate, helping people move to Malaysia. 
    Provide helpful, accurate advice about visa options, costs, and relocation steps.
    Focus on tech workers and digital nomads.
    
    Respond with JSON: {
      "message": "your response",
      "recommendations": { visa details if applicable },
      "followUpQuestions": ["question1", "question2"]
    }`;

    const prompt = `User message: ${userMessage}
    Context: ${JSON.stringify(conversationContext || {})}
    
    Provide helpful relocation guidance.`;

    const response = await openaiClient.generateResponse(prompt, systemPrompt);
    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to generate relocation advice:', error);
    return {
      message: "I apologize, but I'm having trouble processing your request right now. Please try again or contact our support team.",
    };
  }
}

export default openaiClient;
