import { AssessmentAnswers, BusinessStage } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
  try {
    // Build system prompt with Louisiana context and assessment info
    const systemPrompt = buildSystemPrompt(assessmentAnswers);

    // Create messages array for Claude
    const messages = [
      ...conversationHistory,
      { role: 'user' as const, content: userMessage }
    ];

    // Call backend API
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        systemPrompt
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 401) {
        return 'API Key Error: The API key configured on the server appears to be invalid. Please check the server/.env file.';
      }
      if (response.status === 429) {
        return 'Rate Limit: API usage limits exceeded. Please wait a moment and try again.';
      }
      if (response.status === 500 && errorData.error?.includes('not configured')) {
        return getMockResponse(userMessage, assessmentAnswers);
      }

      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.message || 'I apologize, but I had trouble generating a response. Please try again.';

  } catch (error: any) {
    console.error('Error calling backend API:', error);

    // If backend is not running, use mock responses
    if (error.message?.includes('fetch') || error.message?.includes('NetworkError')) {
      console.warn('Backend server not running, using mock responses');
      return getMockResponse(userMessage, assessmentAnswers);
    }

    return `I apologize, but I encountered an error: ${error.message || 'Unknown error'}. Please make sure the backend server is running.`;
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

// Mock response for when backend is not available
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

*Note: Backend server not running. Start with 'npm start' for full AI-powered responses.*`;
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

*Note: Backend server not running. Start with 'npm start' for full AI-powered responses.*`;
  }

  if (lowerMessage.includes('license') || lowerMessage.includes('permit') || lowerMessage.includes('register')) {
    return `Here's what you need to know about business registration and licensing in Louisiana:

**Business Registration:**
1. **Choose your business structure** (LLC, Corporation, Sole Proprietorship, etc.)
2. **Register with Louisiana Secretary of State** at https://www.sos.la.gov/BusinessServices
3. **Get an EIN (Employer Identification Number)** from the IRS
4. **Register for Louisiana taxes** with the Department of Revenue

**Licenses & Permits:**
- **Local business license** - Check with your city/parish
- **Professional licenses** - If required for your industry
- **Sales tax permit** - If selling products
- **Health permits** - For food service businesses
- **Special permits** - Industry-specific (construction, alcohol, etc.)

**Resources:**
- Louisiana Secretary of State: https://www.sos.la.gov/
- Louisiana Department of Revenue: https://revenue.louisiana.gov/
- Your local city hall or parish clerk's office

Each business is different, so I recommend checking with the Louisiana Small Business Development Center (LSBDC) for personalized guidance.

*Note: Backend server not running. Start with 'npm start' for full AI-powered responses.*`;
  }

  // Generic helpful response
  return `Thank you for your question! I'm here to help Louisiana small business owners like you succeed.

**For your ${assessmentAnswers.industry || 'business'} at the ${assessmentAnswers.stage || 'current'} stage:**

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

${assessmentAnswers.stage === 'growth' ? `
- Develop a strategic growth plan
- Explore financing options for expansion
- Consider hiring key team members
- Invest in marketing and brand building
- Look into scaling your operations
` : ''}

${assessmentAnswers.stage === 'transition' ? `
- Plan your transition carefully with professional advisors
- Document all business processes and systems
- Consider tax implications of major changes
- Communicate clearly with stakeholders
- Seek guidance from experienced mentors
` : ''}

**Regarding "${assessmentAnswers.mainChallenge}":** This is a common challenge for businesses at your stage. I'd be happy to provide more specific guidance - could you tell me more about your specific situation?

*Note: Backend server not running. Start with 'npm start' for full AI-powered responses.*`;
}
