# Louisiana Business Assistant

An AI-powered chatbot designed to help Louisiana small businesses navigate their entrepreneurial journey. This application provides personalized guidance through self-assessment, pre-canned prompts, and access to state and local resources.

## Features

### 🎯 Personalized Self-Assessment
- Interactive questionnaire to determine business stage (idea, startup, established, growth, transition)
- Industry-specific guidance
- Challenge-focused recommendations

### 💬 AI-Powered Chat Interface
- Conversational interface powered by Claude AI
- Context-aware responses based on user's business situation
- Natural language understanding for novice-friendly interaction

### 📋 Pre-Canned Prompts
- Curated prompt options tailored to each business stage
- Quick-start topics covering common business needs:
  - Business planning and validation
  - Funding and financial resources
  - Licensing and registration
  - Marketing and growth strategies
  - Operations and management

### 📚 Louisiana Resources
- Comprehensive directory of state resources (Louisiana Economic Development, LSBDC, etc.)
- Local chamber of commerce contacts
- Federal programs (SBA, SCORE)
- Financial assistance programs
- Direct links to relevant agencies and organizations

### 🎨 User-Friendly Design
- Clean, inviting interface designed for AI novices
- Louisiana-themed color scheme (blue and gold)
- Responsive design works on desktop and mobile
- Welcoming onboarding that explains AI capabilities

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI**: Claude (Anthropic) API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Claude API key from [Anthropic Console](https://console.anthropic.com/)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd louisiana-business-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Claude API key to `.env`:
```env
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

### Running the Application

**Development mode:**
```bash
npm run dev
```

The application will start at `http://localhost:3000`

**Production build:**
```bash
npm run build
npm run preview
```

## Usage Guide

### For Business Owners

1. **Welcome Screen**: Learn about the AI assistant and what it can do
2. **Assessment**: Answer 3 quick questions about your business
3. **Chat**:
   - Choose from suggested topics based on your situation
   - Or ask any question naturally in your own words
4. **Resources**: Click "Resources" button to access Louisiana-specific resources
5. **Start Over**: Reset your session anytime to begin fresh

### Example Questions to Ask

- "How do I validate my business idea?"
- "What licenses do I need to operate in Louisiana?"
- "Where can I find funding for my startup?"
- "How do I create a business plan?"
- "What tax requirements apply to Louisiana businesses?"

## Project Structure

```
src/
├── components/           # React components
│   ├── Welcome.tsx      # Onboarding screen
│   ├── Assessment.tsx   # Self-assessment flow
│   ├── ChatInterface.tsx # Main chat UI
│   ├── PromptOptions.tsx # Suggested prompts
│   └── ResourcesPanel.tsx # Resources sidebar
├── data/
│   ├── promptOptions.ts # Pre-canned prompts by stage
│   └── resources.ts     # Louisiana business resources
├── services/
│   └── aiService.ts     # Claude API integration
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
└── main.tsx            # Application entry point
```

## Configuration

### Customizing Resources

Edit `src/data/resources.ts` to add or modify Louisiana business resources:

```typescript
{
  title: 'Resource Name',
  description: 'What this resource provides',
  url: 'https://example.com',
  category: 'state' | 'local' | 'financial' | 'federal'
}
```

### Customizing Prompts

Edit `src/data/promptOptions.ts` to add or modify suggested prompts for each business stage.

### Styling

The application uses Louisiana state colors defined in `tailwind.config.js`:
- `louisiana-blue`: #003366
- `louisiana-gold`: #FFB81C

Modify these to match your branding needs.

## Important Notes

### API Key Security

⚠️ **Production Deployment**: The current implementation uses `dangerouslyAllowBrowser: true` for the Anthropic SDK, which exposes your API key in the browser.

**For production, you should**:
1. Create a backend API proxy
2. Store the API key securely on the server
3. Make requests from server-side code
4. Never commit `.env` files to version control

### Mock Responses

If no API key is configured, the application will provide helpful mock responses based on keywords. This allows testing without an API key but with limited functionality.

### Disclaimers

The AI assistant provides general guidance and should not replace professional legal, financial, or business advice. Users are encouraged to consult with qualified professionals for specific situations.

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:
- File an issue in the GitHub repository
- Contact Louisiana Small Business Development Center: https://www.lsbdc.org/
- Visit Louisiana Economic Development: https://www.opportunitylouisiana.com/

## Acknowledgments

- Louisiana Economic Development
- Louisiana Small Business Development Center (LSBDC)
- Louisiana Secretary of State Business Services
- Anthropic for Claude AI
- All Louisiana business support organizations

---

**Built with ❤️ for Louisiana small businesses**
