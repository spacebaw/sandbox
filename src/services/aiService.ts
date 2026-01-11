import Anthropic from '@anthropic-ai/sdk';
import { AssessmentAnswers, BusinessStage } from '../types';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

// Initialize Anthropic client (will be null if no API key)
let anthropic: Anthropic | null = null;
if (API_KEY) {
  anthropic = new Anthropic({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
  });
}

const stageDescriptions: Record<BusinessStage, string> = {
  idea: "exploring a business idea and considering starting a business",
  startup: "actively launching their business",
  established: "running an established business",
  growth: "looking to scale and grow their business",
  transition: "making major changes, planning succession, or pivoting their business"
};

export async function sendMessage(
  userMessage: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[],
  assessmentAnswers: AssessmentAnswers
): Promise<string> {
  // If no API key, return a helpful mock response
  if (!anthropic) {
    return getMockResponse(userMessage, assessmentAnswers);
  }

  try {
    // Build system prompt with Louisiana context and assessment info
    const systemPrompt = buildSystemPrompt(assessmentAnswers);

    // Create messages array for Claude
    const messages = [
      ...conversationHistory,
      { role: 'user' as const, content: userMessage }
    ];

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages
    });

    const textContent = response.content.find(block => block.type === 'text');
    return textContent ? textContent.text : 'I apologize, but I had trouble generating a response. Please try again.';
  } catch (error: any) {
    console.error('Error calling Claude API:', error);
    console.error('Error details:', error.message, error.status, error.error);

    // Provide more specific error messages
    if (error.status === 401) {
      return 'API Key Error: Your API key appears to be invalid. Please check that you copied it correctly from https://console.anthropic.com/';
    }
    if (error.status === 429) {
      return 'Rate Limit: You\'ve exceeded your API usage limits. Please wait a moment and try again.';
    }
    if (error.message?.includes('fetch')) {
      return 'Network Error: Could not connect to the API. Please check your internet connection.';
    }

    return `I apologize, but I encountered an error: ${error.message || 'Unknown error'}. Please check your API key configuration and try again.`;
  }
}

function buildSystemPrompt(assessmentAnswers: AssessmentAnswers): string {
  const { stage, industry, mainChallenge } = assessmentAnswers;

  return `You are a helpful AI assistant specifically designed to help Louisiana small business owners. Your role is to provide practical, actionable guidance tailored to their specific situation.

Context about this business owner:
- Business stage: They are ${stage ? stageDescriptions[stage] : 'at an unknown stage'}
- Industry: ${industry || 'Not specified'}
- Main challenge: ${mainChallenge || 'Not specified'}

Guidelines for your responses:
1. Be encouraging and supportive - many users are new to entrepreneurship
2. Provide specific, actionable advice rather than generic information
3. When relevant, mention Louisiana-specific resources, programs, or considerations
4. Keep responses clear and well-organized (use bullet points, numbered lists, etc.)
5. If asked about regulations or legal matters, emphasize the importance of consulting with professionals
6. Tailor your advice to their business stage and challenges
7. Be conversational and approachable - many users are not tech-savvy
8. When appropriate, ask clarifying questions to provide better guidance
9. For Louisiana-specific information, reference state agencies like Louisiana Economic Development, Louisiana Small Business Development Center (LSBDC), Louisiana Secretary of State, etc.
10. If you don't know something specific to Louisiana, be honest and suggest where they can find that information

Remember: Your goal is to empower Louisiana small business owners with knowledge and confidence to succeed.`;
}

// Mock response for when no API key is configured
function getMockResponse(userMessage: string, assessmentAnswers: AssessmentAnswers): string {
  const lowerMessage = userMessage.toLowerCase();

  // Simple keyword-based mock responses
  if (lowerMessage.includes('business plan')) {
    return `Great question about business planning! Here's what I'd recommend:

**Key Components of a Business Plan:**

1. **Executive Summary** - A brief overview of your business concept and goals
2. **Market Analysis** - Research on your target customers and competition in Louisiana
3. **Products/Services** - Detailed description of what you're offering
4. **Marketing Strategy** - How you'll reach customers and stand out
5. **Financial Projections** - Startup costs, revenue forecasts, and break-even analysis
6. **Operations Plan** - Day-to-day business operations and logistics

**Louisiana Resources:**
- The Louisiana Small Business Development Center (LSBDC) offers free business plan assistance
- SCORE Louisiana provides free mentoring from experienced business professionals

Would you like me to dive deeper into any specific section of the business plan?

*Note: Configure your Claude API key in the .env file for full AI-powered responses.*`;
  }

  if (lowerMessage.includes('funding') || lowerMessage.includes('loan') || lowerMessage.includes('money')) {
    return `Let me help you explore funding options for your Louisiana business:

**Louisiana-Specific Funding:**
- **Louisiana Economic Development** offers various loan and grant programs
- **Small Business Loan Programs** through Louisiana banks and credit unions
- **Community Development Financial Institutions (CDFI)** like Hope Credit Union

**Federal Programs:**
- **SBA 7(a) Loans** - General purpose small business loans
- **SBA Microloans** - Up to $50,000 for startups
- **SBA 504 Loans** - For real estate and equipment

**Alternative Funding:**
- Angel investors and local investment groups
- Crowdfunding platforms
- Business incubators and accelerators in Louisiana

The best option depends on your specific needs, business stage, and financial situation. Would you like more details on any of these?

*Note: Configure your Claude API key in the .env file for full AI-powered responses.*`;
  }

  // Generic helpful response
  return `Thank you for your question! I'm here to help Louisiana small business owners like you succeed.

Since this is running in demo mode, I'm providing general guidance. To get personalized, AI-powered responses tailored specifically to your situation, please add your Claude API key to the .env file.

**In the meantime, here are some general tips for ${assessmentAnswers.stage || 'your stage'}:**

${assessmentAnswers.stage === 'idea' ? `
- Validate your idea by talking to potential customers
- Research the Louisiana market for your business type
- Start with a simple business plan or lean canvas
- Connect with the Louisiana Small Business Development Center (LSBDC)
` : ''}

${assessmentAnswers.stage === 'startup' ? `
- Register your business with the Louisiana Secretary of State
- Obtain necessary licenses and permits
- Set up a business bank account
- Create a basic accounting system
- Build your initial customer base
` : ''}

${assessmentAnswers.stage === 'established' ? `
- Focus on customer retention and satisfaction
- Look for opportunities to increase efficiency
- Consider diversifying your revenue streams
- Stay compliant with Louisiana regulations
- Invest in employee development
` : ''}

Is there a specific aspect of your business challenge (${assessmentAnswers.mainChallenge || 'your main concern'}) you'd like to discuss?`;
}
