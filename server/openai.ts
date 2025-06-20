import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface BlogGenerationRequest {
  prompt: string;
  title?: string;
  category?: string;
  keywords?: string[];
}

export interface GeneratedBlogContent {
  titleEn: string;
  titleFr: string;
  titleAr: string;
  contentEn: string;
  contentFr: string;
  contentAr: string;
  excerptEn: string;
  excerptFr: string;
  excerptAr: string;
  tags: string[];
  seoKeywords: string[];
  readingTimeMinutes: number;
}

export async function generateBlogPost(request: BlogGenerationRequest): Promise<GeneratedBlogContent> {
  try {
    const systemPrompt = `You are an expert content writer for SmartRelocate.ai, a Malaysia relocation platform for tech professionals and digital nomads. Generate comprehensive blog content in three languages: English, French, and Arabic.

IMPORTANT GUIDELINES:
- Focus specifically on Malaysia relocation topics
- Write for tech professionals, entrepreneurs, and digital nomads
- Include practical, actionable advice
- Use professional yet engaging tone
- Ensure content is SEO-optimized
- Arabic content should be properly formatted RTL
- Include relevant tags and keywords for Malaysia relocation

Generate content structure:
1. Engaging titles in all three languages
2. Full article content (800-1200 words each language)
3. Compelling excerpts (150-200 words each language)
4. Relevant tags (5-8 tags)
5. SEO keywords (8-12 keywords)
6. Estimated reading time in minutes

Return ONLY valid JSON with this exact structure:
{
  "titleEn": "English title",
  "titleFr": "French title", 
  "titleAr": "Arabic title",
  "contentEn": "Full English content with proper formatting",
  "contentFr": "Full French content with proper formatting",
  "contentAr": "Full Arabic content with proper formatting",
  "excerptEn": "English excerpt",
  "excerptFr": "French excerpt",
  "excerptAr": "Arabic excerpt",
  "tags": ["tag1", "tag2", "tag3"],
  "seoKeywords": ["keyword1", "keyword2", "keyword3"],
  "readingTimeMinutes": 5
}`;

    const userPrompt = `Generate a comprehensive blog post about: ${request.prompt}

${request.title ? `Suggested title: ${request.title}` : ''}
${request.category ? `Category: ${request.category}` : ''}
${request.keywords ? `Include these keywords: ${request.keywords.join(', ')}` : ''}

Focus on Malaysia-specific information and practical advice for international professionals relocating to Malaysia.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content generated from OpenAI");
    }

    const parsedContent = JSON.parse(content) as GeneratedBlogContent;
    
    // Validate required fields
    if (!parsedContent.titleEn || !parsedContent.contentEn) {
      throw new Error("Generated content missing required English fields");
    }

    return parsedContent;
  } catch (error) {
    console.error("Error generating blog post:", error);
    throw new Error(`Failed to generate blog post: ${error.message}`);
  }
}

export async function generateBlogSummary(content: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Generate a compelling 150-200 word summary/excerpt for this blog post. Focus on the key benefits and insights for readers."
        },
        {
          role: "user",
          content: `Summarize this blog content:\n\n${content}`
        }
      ],
      max_tokens: 200,
      temperature: 0.5,
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Error generating blog summary:", error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}