import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  FileText,
  DollarSign,
  Target,
  Users,
  TrendingUp,
  Mail,
  X,
  Download,
  Sparkles
} from 'lucide-react';

interface PromptAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  output: string;
}

const promptActions: PromptAction[] = [
  {
    id: 'business-plan',
    title: 'Generate Business Plan',
    description: 'Get a customized Louisiana business plan',
    icon: <FileText className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'from-blue-600 to-blue-700',
    output: `# Louisiana Business Plan

## Executive Summary
Your business concept shows strong potential in the Louisiana market. Based on current economic trends and local demand patterns, here's your strategic roadmap.

## Market Opportunity
Louisiana's economy is diversifying beyond traditional industries. Your target market shows 15% year-over-year growth with strong consumer spending patterns.

## Business Model
- **Revenue Streams**: Product sales, services, and partnerships
- **Cost Structure**: Startup costs estimated at $25,000-$50,000
- **Profit Margins**: Industry standard 20-30%

## Louisiana Advantages
- LED FastStart™ program for workforce training
- Louisiana Entertainment Tax Credit opportunities
- Quality Jobs Program incentives

## Next Steps
1. Register on GeauxBiz portal
2. Secure initial funding through Louisiana SBDC
3. Apply for local business license
4. Connect with regional economic development office

Generated specifically for Louisiana businesses.`
  },
  {
    id: 'grant-application',
    title: 'Write Grant Application',
    description: 'Louisiana small business grants & SBA loans',
    icon: <DollarSign className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
    hoverColor: 'from-green-600 to-green-700',
    output: `# Louisiana Small Business Grant Application

## Applicant Information
[Your business details]

## Project Summary
This project will create jobs and economic growth in Louisiana by [your business description]. We are requesting $[amount] to achieve the following objectives:

## Impact on Louisiana Economy
- **Jobs Created**: [X] full-time positions
- **Local Sourcing**: [Y]% of materials from Louisiana suppliers
- **Community Benefit**: [describe local impact]

## Eligibility - Louisiana Small Business Programs
✓ Louisiana Small Business Loan & Guaranty Program
✓ Louisiana Economic Development Award
✓ Veteran Business Initiative Program
✓ Louisiana Main Street Program

## Budget Breakdown
| Category | Amount | Justification |
|----------|--------|---------------|
| Equipment | $[X] | [Details] |
| Marketing | $[Y] | [Details] |
| Operations | $[Z] | [Details] |

## Timeline
Q1: Planning and setup
Q2: Launch operations
Q3-Q4: Scale and hire

This application is tailored for Louisiana Economic Development programs and includes state-specific requirements.`
  },
  {
    id: 'marketing-plan',
    title: 'Create Marketing Plan',
    description: 'Louisiana-focused customer acquisition',
    icon: <Target className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'from-purple-600 to-purple-700',
    output: `# Louisiana Marketing Strategy

## Target Audience
Louisiana consumers value:
- Local businesses and community connection
- Authentic experiences and southern hospitality
- Quality products with personal service

## Channel Strategy

### 1. Local SEO & Louisiana Business Directories
- Google Business Profile optimization
- Louisiana.gov business directory listing
- Chamber of Commerce memberships
- Local review sites (Yelp, TripAdvisor for relevant businesses)

### 2. Community Engagement
- Sponsor local festivals and events
- Partner with Louisiana influencers
- Join local business associations
- Participate in farmers markets/pop-ups

### 3. Digital Marketing
- Facebook & Instagram (strong Louisiana presence)
- Geotargeted ads to Louisiana parishes
- Email marketing to local list
- Louisiana-themed content marketing

### 4. Traditional Media
- Local newspaper advertising
- Community radio spots
- Direct mail in target neighborhoods
- Partnerships with established Louisiana brands

## Budget Allocation
- Digital: 40%
- Community Events: 30%
- Traditional Media: 20%
- Partnerships: 10%

## Success Metrics
Track: Website visits, foot traffic, local customer acquisition cost, community engagement rate.

Louisiana loves supporting local - lean into that!`
  },
  {
    id: 'hiring-guide',
    title: 'Hiring & HR Guide',
    description: 'Louisiana employment laws & LED FastStart',
    icon: <Users className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    hoverColor: 'from-orange-600 to-orange-700',
    output: `# Louisiana Hiring & HR Guide

## Louisiana Employment Laws

### Required Registrations
1. **Louisiana Workforce Commission**: Register as employer
2. **Louisiana Department of Revenue**: Withholding tax registration
3. **Workers' Compensation**: Required for most employers
4. **Unemployment Insurance**: Register within 30 days of hiring

### Louisiana-Specific Requirements
- **Minimum Wage**: Federal minimum ($7.25/hour)
- **Overtime**: Time-and-a-half after 40 hours/week
- **Child Labor Laws**: Louisiana Youth Employment Law restrictions
- **Right to Work**: Louisiana is a right-to-work state

## LED FastStart Program (FREE!)
Louisiana's #1-ranked workforce training program:
- **Cost**: $0 to employers
- **Services**: Recruitment, screening, training development
- **Eligibility**: Companies creating new jobs in Louisiana
- **Contact**: faststart@la.gov

## Hiring Process Checklist
✓ Post on Louisiana Workforce Commission job board (free)
✓ Apply for LED FastStart if eligible
✓ Complete I-9 verification (federal)
✓ Set up Louisiana withholding
✓ Purchase workers' comp insurance
✓ Create employee handbook (include Louisiana policies)
✓ Display required posters (Louisiana and federal)

## Talent Resources
- Louisiana Community & Technical College System
- University partnerships through LED
- Louisiana Rehabilitation Services for disability hiring
- Veteran hiring programs through LDVA

## Benefits Considerations
While not required in Louisiana:
- Health insurance (consider Louisiana health plans)
- Paid time off
- Retirement plans (SIMPLE IRA popular for small businesses)

Louisiana has excellent workforce development support - use it!`
  },
  {
    id: 'growth-strategy',
    title: 'Scale & Growth Plan',
    description: 'Expansion strategy with Louisiana incentives',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-pink-500 to-pink-600',
    hoverColor: 'from-pink-600 to-pink-700',
    output: `# Louisiana Growth & Scaling Strategy

## Growth Readiness Assessment
Before scaling, ensure you have:
✓ Consistent revenue for 6+ months
✓ Repeatable customer acquisition process
✓ Strong unit economics (profitable per customer)
✓ Systems and processes documented
✓ Cash reserves for 3-6 months

## Louisiana Growth Incentives

### 1. Quality Jobs Program
- **Benefit**: 6% rebate on annual gross payroll for new jobs
- **Duration**: Up to 10 years
- **Requirement**: Create jobs paying above parish average

### 2. Industrial Tax Exemption Program (ITEP)
- **Benefit**: 80% property tax abatement
- **Duration**: 5 years (renewable for 5 more)
- **Use**: Manufacturing, warehousing

### 3. LED Retention & Modernization
- **Benefit**: Various tax credits
- **Use**: Equipment upgrades, facility expansion

## Expansion Strategies

### Option 1: New Location
Consider Louisiana cities with:
- Lower cost of operation
- Talent pool availability
- Industry cluster presence
- LED-designated Opportunity Zones

### Option 2: Product/Service Expansion
- Leverage existing customer base
- Cross-sell complementary offerings
- Test in Louisiana market before broader expansion

### Option 3: Digital Scale
- E-commerce for statewide reach
- Delivery/shipping partnerships
- Online booking/ordering systems

## Funding Growth
- **Louisiana SBDC**: Free consulting + funding connections
- **SBA 7(a) Loans**: Through Louisiana banks
- **Angel Investors**: Louisiana Angel Network
- **Venture Capital**: Idea Village, Nexus Louisiana

## Partnership Opportunities
- Louisiana universities for R&D
- LED for site selection assistance
- Regional economic development offices
- Industry associations

## Timeline
Year 1: Optimize current operations
Year 2: Test expansion model
Year 3+: Scale with Louisiana incentives

The state wants you to grow here - take advantage of the support!`
  },
  {
    id: 'pitch-deck',
    title: 'Investor Pitch Deck',
    description: 'Raise capital from Louisiana investors',
    icon: <Mail className="w-8 h-8" />,
    color: 'from-red-500 to-red-600',
    hoverColor: 'from-red-600 to-red-700',
    output: `# Louisiana Business Pitch Deck

## Slide 1: Cover
[Your Business Name]
[Tagline]
Proudly Louisiana-Based

## Slide 2: The Problem
Louisiana [industry] faces these challenges:
- [Problem 1]
- [Problem 2]
- [Problem 3]

## Slide 3: The Solution
We solve this by [your solution].
Built specifically for the Louisiana market.

## Slide 4: Market Opportunity
- Louisiana [industry] market size: $[X]M
- Year-over-year growth: [Y]%
- Our target segment: [describe]
- Total addressable market: [Z] customers

## Slide 5: Business Model
- Revenue: [how you make money]
- Unit economics: [cost vs. revenue per customer]
- Scalability: [how it grows]

## Slide 6: Traction
- [X] customers in Louisiana
- [Y]% month-over-month growth
- $[Z] in revenue
- [partnerships/achievements]

## Slide 7: Competitive Advantage
What makes us different:
1. Deep Louisiana market knowledge
2. [Unique capability]
3. [Proprietary advantage]
4. Local relationships and trust

## Slide 8: Team
[Founder/CEO]: [Background and Louisiana connection]
[Key team members with relevant experience]

## Slide 9: Financials
Current: $[revenue]
12-month projection: $[X]
24-month projection: $[Y]
Path to profitability: [timeline]

## Slide 10: The Ask
Raising: $[amount]
Use of funds:
- [X]% Operations
- [Y]% Marketing
- [Z]% Hiring

## Slide 11: Louisiana Advantage
Why Louisiana is strategic:
- LED incentive programs
- Lower cost structure
- Growing economy
- Supportive ecosystem

## Contact
[Your name]
[Email]
[Phone]

---
Tailored for Louisiana angel investors and VCs who value local investment.`
  }
];

interface PromptPaletteProps {
  businessInfo: {
    type: string;
    city: string;
  };
}

export default function PromptPalette({ businessInfo }: PromptPaletteProps) {
  const [selectedAction, setSelectedAction] = useState<PromptAction | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleActionClick = (action: PromptAction) => {
    setIsGenerating(true);
    // Simulate generation delay for dopamine hit
    setTimeout(() => {
      setIsGenerating(false);
      setSelectedAction(action);
    }, 1500);
  };

  const handleDownload = () => {
    if (selectedAction) {
      const blob = new Blob([selectedAction.output], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedAction.id}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Business Command Center
          </h1>
          <p className="text-gray-600">
            Click any button to instantly generate what you need
          </p>
          <div className="mt-4 inline-block bg-white rounded-full px-6 py-2 shadow-lg">
            <span className="text-sm text-gray-600">
              {businessInfo.type} in {businessInfo.city}
            </span>
          </div>
        </motion.div>

        {/* Action buttons grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          {promptActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActionClick(action)}
              className={`relative bg-gradient-to-br ${action.color} hover:${action.hoverColor} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all group overflow-hidden`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000" />

              <div className="relative z-10">
                <div className="mb-4">{action.icon}</div>
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-8 shadow-2xl text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <Sparkles className="w-16 h-16 text-purple-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Generating Your Document...
                </h3>
                <p className="text-gray-600">
                  Customizing for Louisiana businesses
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Output modal */}
        <AnimatePresence>
          {selectedAction && !isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
              onClick={() => setSelectedAction(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col"
              >
                {/* Modal header */}
                <div className={`bg-gradient-to-r ${selectedAction.color} text-white p-6 flex items-center justify-between`}>
                  <div className="flex items-center space-x-3">
                    {selectedAction.icon}
                    <div>
                      <h3 className="text-2xl font-bold">{selectedAction.title}</h3>
                      <p className="text-sm opacity-90">{selectedAction.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAction(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800">
                      {selectedAction.output}
                    </pre>
                  </div>
                </div>

                {/* Modal footer */}
                <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50">
                  <p className="text-sm text-gray-600">
                    This document is customized for your Louisiana business
                  </p>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedAction(null)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-colors"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
