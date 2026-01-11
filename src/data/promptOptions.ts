import { PromptOption, BusinessStage } from '../types';

export const promptOptionsByStage: Record<BusinessStage, PromptOption[]> = {
  idea: [
    {
      id: 'validate-idea',
      title: 'Validate My Business Idea',
      description: 'Get help evaluating if your business idea has potential',
      prompt: "I have a business idea I'd like to explore. Can you help me think through whether it's viable? I'd like to understand the market potential, who my customers might be, and what challenges I should anticipate.",
      icon: '💡'
    },
    {
      id: 'market-research',
      title: 'Understand My Market',
      description: 'Learn about your target market and competition in Louisiana',
      prompt: "I'm starting a business in Louisiana and need to understand my market better. Can you help me think about who my target customers are, what the competition looks like, and what makes the Louisiana market unique for my type of business?",
      icon: '🔍'
    },
    {
      id: 'first-steps',
      title: 'What Are My First Steps?',
      description: 'Get a roadmap for turning your idea into a business',
      prompt: "I have a business idea but I'm not sure where to start. Can you walk me through the first steps I should take to turn this idea into a real business? What should I prioritize?",
      icon: '🗺️'
    },
    {
      id: 'legal-structure',
      title: 'Choose Business Structure',
      description: 'Understand LLC, sole proprietorship, and other options',
      prompt: "I need to decide on a legal structure for my business in Louisiana. Can you explain the differences between LLC, sole proprietorship, corporation, and other options? What are the pros and cons of each?",
      icon: '⚖️'
    }
  ],

  startup: [
    {
      id: 'business-plan',
      title: 'Create a Business Plan',
      description: 'Build a comprehensive plan for your new business',
      prompt: "I'm starting my business and need to create a business plan. Can you guide me through the key sections I need to include and help me think through each part? I want to make sure I cover everything important.",
      icon: '📋'
    },
    {
      id: 'funding-options',
      title: 'Find Funding',
      description: 'Explore loans, grants, and investors in Louisiana',
      prompt: "I need funding to start my business in Louisiana. Can you explain the different options available to me - loans, grants, investors, etc.? What programs exist specifically for Louisiana small businesses?",
      icon: '💰'
    },
    {
      id: 'licenses-permits',
      title: 'Get Licensed & Permitted',
      description: 'Navigate Louisiana business registration and requirements',
      prompt: "What licenses and permits do I need to legally operate my business in Louisiana? Can you walk me through the registration process and any industry-specific requirements I should know about?",
      icon: '📜'
    },
    {
      id: 'marketing-strategy',
      title: 'Build Marketing Strategy',
      description: 'Create a plan to reach your first customers',
      prompt: "I'm launching my business soon and need to attract customers. Can you help me develop a marketing strategy that fits my budget? What are the most effective ways to reach my target audience in Louisiana?",
      icon: '📣'
    }
  ],

  established: [
    {
      id: 'increase-revenue',
      title: 'Grow Revenue',
      description: 'Strategies to increase sales and profitability',
      prompt: "My business is established but I want to increase revenue. Can you help me brainstorm strategies to grow sales, attract new customers, and increase profitability? What should I focus on?",
      icon: '📈'
    },
    {
      id: 'streamline-operations',
      title: 'Improve Operations',
      description: 'Make your business more efficient',
      prompt: "I want to make my business operations more efficient. Can you help me identify areas where I can streamline processes, reduce costs, and improve productivity?",
      icon: '⚙️'
    },
    {
      id: 'hire-manage',
      title: 'Hiring & Management',
      description: 'Build and lead your team effectively',
      prompt: "I need to hire employees and want to do it right. Can you guide me through the hiring process in Louisiana, including legal requirements, best practices, and how to be an effective manager?",
      icon: '👥'
    },
    {
      id: 'digital-transformation',
      title: 'Go Digital',
      description: 'Modernize with technology and online presence',
      prompt: "I want to improve my business's digital presence and use technology more effectively. Can you suggest ways to modernize my operations, improve my online presence, and use digital tools to serve customers better?",
      icon: '💻'
    }
  ],

  growth: [
    {
      id: 'scale-business',
      title: 'Scale My Business',
      description: 'Strategies for sustainable growth',
      prompt: "My business is ready to scale. Can you help me think through how to grow sustainably? What systems, processes, and resources do I need to put in place to handle increased demand?",
      icon: '🚀'
    },
    {
      id: 'new-markets',
      title: 'Expand to New Markets',
      description: 'Enter new locations or customer segments',
      prompt: "I want to expand my business into new markets or customer segments. Can you help me evaluate opportunities and create a strategy for expansion? What risks should I consider?",
      icon: '🌎'
    },
    {
      id: 'secure-capital',
      title: 'Raise Capital',
      description: 'Get funding for expansion',
      prompt: "I need capital to fund business growth. Can you explain my options for raising money - from bank loans to investors to alternative financing? What do I need to prepare?",
      icon: '💵'
    },
    {
      id: 'partnerships',
      title: 'Form Partnerships',
      description: 'Build strategic alliances and collaborations',
      prompt: "I'm interested in forming strategic partnerships to grow my business. Can you help me think through what types of partnerships might be valuable and how to approach potential partners?",
      icon: '🤝'
    }
  ],

  transition: [
    {
      id: 'pivot-strategy',
      title: 'Pivot My Business',
      description: 'Navigate a major business change or direction shift',
      prompt: "I need to pivot my business due to changing market conditions or new opportunities. Can you help me think through how to make this transition successfully while minimizing risk?",
      icon: '🔄'
    },
    {
      id: 'succession-planning',
      title: 'Plan Succession',
      description: 'Prepare to pass the business to new leadership',
      prompt: "I'm thinking about the future of my business and succession planning. Can you guide me through the process of preparing my business for new leadership or ownership?",
      icon: '👔'
    },
    {
      id: 'sell-business',
      title: 'Sell My Business',
      description: 'Prepare for and navigate a business sale',
      prompt: "I'm considering selling my business. Can you walk me through what I need to do to prepare my business for sale, how to value it, and what the sale process looks like?",
      icon: '🏷️'
    },
    {
      id: 'recovery-plan',
      title: 'Recover & Rebuild',
      description: 'Overcome challenges and get back on track',
      prompt: "My business is facing challenges and I need to develop a recovery plan. Can you help me assess the situation, identify solutions, and create a path forward to stabilize and rebuild?",
      icon: '🛠️'
    }
  ]
};
