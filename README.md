# Math Madness 🎮

An engaging, interactive math game built with Next.js 15, featuring challenges in algebra, geometry, and calculus basics.

## Features

✨ **Interactive Math Challenges**
- Algebra, Geometry, and Calculus problems
- Multiple difficulty levels
- Instant feedback on answers
- Helpful hints for each problem

📊 **Built-in Graphing Calculator**
- Visualize equations in real-time
- Support for mathematical expressions
- Interactive graph exploration

🎯 **Gamification**
- Points system (based on difficulty)
- Streak tracking (consecutive correct answers)
- Level progression
- Achievement system
- Progress tracking

💬 **Feedback System**
- Feedback button on every screen
- Collect user suggestions for improvements
- Help us make Math Madness even better!

🎨 **Beautiful UI**
- Tailwind CSS styling
- Smooth animations
- Responsive design
- Dark-mode friendly color scheme

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Charting**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone or navigate to the project
cd math-madness

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
math-madness/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── FeedbackModal.tsx
│   │   ├── GraphingCalculator.tsx
│   │   ├── Header.tsx
│   │   └── ChallengeCard.tsx
│   ├── lib/
│   │   ├── challenges.ts    # Challenge data
│   │   └── gameStore.ts     # Zustand game state
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── challenge/
│   │   └── [id]/            # Dynamic challenge pages
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── package.json
└── tsconfig.json
```

## How It Works

1. **Home Screen**: Browse all available challenges by category or difficulty
2. **Challenge Screen**: Read the problem, enter your answer, and get instant feedback
3. **Graphing Calculator**: Visualize equations to help solve problems
4. **Feedback**: Share suggestions to help us improve!

## Future Enhancements

- [ ] More challenges (expanding database)
- [ ] Leaderboard (track top performers)
- [ ] Multiplayer mode
- [ ] More advanced calculus topics
- [ ] Mobile app version
- [ ] Timed challenges
- [ ] Challenge custom equations

## Deployment

### Deploy to Vercel

1. Push to GitHub repository
2. Connect to Vercel
3. Deploy with one click!

```bash
# Or deploy from CLI
npm i -g vercel
vercel
```

## Contributing

We love feedback! Use the feedback button in the app to share:
- Bug reports
- Feature requests
- Difficulty suggestions
- UX improvements

## License

MIT

## Built with ❤️

Math Madness is designed to make learning math fun and engaging!

---

**Start your math adventure today! 🚀**
