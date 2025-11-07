# 401(k) Contribution Management Application

A beautifully designed, user-friendly web application for managing 401(k) retirement contributions. Built for the Human Interest technical assessment.

## Features

### Core Functionality

- **Contribution Type Selection**: Choose between fixed dollar amount or percentage-based contributions
- **Account Type**: Select between Traditional (pre-tax) or Roth (after-tax) 401(k)
- **Intuitive Controls**: Smooth sliders and input fields for easy contribution adjustments
- **Real-time Updates**: See immediate feedback on your contribution changes

### Data Display

- **Year-to-Date (YTD) Contributions**: Track your 2025 contributions so far
- **Per-Paycheck Breakdown**: View exactly how much you're contributing each pay period
- **Annual Projections**: See your projected total contributions for the year
- **Annual Limit Tracker**: Visual progress bar showing how close you are to the IRS annual limit ($23,500 for 2025)

### Retirement Impact (Optional Feature)

- **Future Value Projection**: Calculate how much your contributions will grow by retirement age
- **Compound Interest Visualization**: See the power of long-term investing
- **Incremental Impact**: Understand how small increases (1%, 5%) affect your retirement savings
- **Age-based Calculations**: Personalized projections based on years until retirement

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Custom components with shadcn/ui primitives
- **Icons**: Lucide React
- **State Management**: React hooks (useState)

## Design Philosophy

This application was designed with a human-first approach, inspired by brands like Rhode, Rare Beauty, and Space Elevator:

- **Careful Typography**: Thoughtful font sizes, weights, and letter spacing
- **Generous Spacing**: Breathing room between elements for easy scanning
- **Subtle Grid Background**: Creates depth without distraction
- **Smooth Interactions**: Polished hover states and transitions
- **Tabular Numbers**: Consistent number widths for better readability
- **Accessible Colors**: High contrast ratios for easy reading

## Installation & Running Locally

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone [your-repo-url]
   cd 401k-contribution-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

The application should now be running locally!

## Mock Data

The application uses the following mock data to simulate a realistic user experience:

- **Annual Salary**: $85,000
- **Current Age**: 30 years old
- **Retirement Age**: 65 years old
- **YTD Contributions**: $4,250 (as of November 2025)
- **Pay Frequency**: Bi-weekly (26 paychecks per year)
- **Default Contribution**: 6% of salary

## How to Use

1. **Select Account Type**: Choose between Traditional (pre-tax) or Roth (after-tax)
2. **Choose Contribution Method**: Pick either fixed dollar amount or percentage
3. **Adjust Your Contribution**: Use the slider or type directly into the input field
4. **Review Impact**: Check your YTD contributions, annual projections, and retirement forecast
5. **Save Changes**: Click the "Save Changes" button to confirm your selections

## Future Enhancements

If given another week, here are the top features I would prioritize:

### 1. Employer Match Calculator

**Why**: Employer matching is often called "free money" - it's one of the most important factors in 401(k) planning.

- Show employer match percentage and dollar amounts
- Visual indicator of whether you're maximizing your match
- Warning if contribution is below match threshold
- Calculate total compensation including employer contributions

### 2. Historical Contribution Chart

**Why**: Visual trends help users understand their savings journey and maintain motivation.

- Line chart showing contribution history over the past 12-24 months
- Month-over-month comparison
- Ability to see different account types separately
- Export data as CSV for personal records

### 3. Goal-Based Planning Tool

**Why**: People save better when they have specific, personalized goals.

- Set a retirement savings goal (e.g., "$2M by age 65")
- Reverse calculator: "How much do I need to save to reach my goal?"
- Multiple scenarios comparison (optimistic, realistic, conservative returns)
- Life event planning (buying a house, having children, etc.)

## Technical Decisions

### Why React + TypeScript?

- Type safety prevents bugs and improves developer experience
- Component-based architecture makes the code maintainable and testable
- Rich ecosystem of libraries and tools

### Why Tailwind CSS?

- Utility-first approach allows for rapid, consistent styling
- Built-in design system ensures visual consistency
- Excellent for responsive design
- Smaller bundle size compared to traditional CSS frameworks

### Why Client-Side Mock Data?

- Meets the requirement of a frontend-focused application
- Faster development without backend complexity
- Easy to demonstrate all features without authentication/API setup
- Real implementation would replace mock data with API calls

### Architecture Highlights

- **Component Separation**: Each major feature is its own component for reusability
- **Prop Drilling**: Intentionally simple state management for this scope (would use Context/Redux for larger apps)
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation support
- **Performance**: Optimized re-renders, smooth 60fps animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project was created for the Human Interest technical assessment.

---

**Built with care by [Your Name]** - November 2025