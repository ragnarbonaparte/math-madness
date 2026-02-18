import { Challenge } from '@/app/types';

export const challenges: Challenge[] = [
  // Algebra
  {
    id: 'algebra-1',
    title: 'Linear Equation',
    description: 'Solve for x',
    question: 'Solve: 2x + 5 = 13',
    type: 'algebra',
    difficulty: 1,
    solution: 4,
    hint: 'Subtract 5 from both sides, then divide by 2',
  },
  {
    id: 'algebra-2',
    title: 'Quadratic Expression',
    description: 'Factor the expression',
    question: 'Factor: x² + 5x + 6',
    type: 'algebra',
    difficulty: 2,
    solution: '(x+2)(x+3)',
    hint: 'Find two numbers that multiply to 6 and add to 5',
  },
  {
    id: 'algebra-3',
    title: 'System of Equations',
    description: 'Solve the system',
    question: 'Solve: x + y = 7, x - y = 1. Find x.',
    type: 'algebra',
    difficulty: 3,
    solution: 4,
    hint: 'Add the two equations to eliminate y',
  },

  // Geometry
  {
    id: 'geometry-1',
    title: 'Triangle Area',
    description: 'Calculate the area',
    question: 'A triangle has base 8 and height 6. What is its area?',
    type: 'geometry',
    difficulty: 1,
    solution: 24,
    hint: 'Area = (base × height) / 2',
  },
  {
    id: 'geometry-2',
    title: 'Pythagorean Theorem',
    description: 'Find the hypotenuse',
    question: 'Right triangle with legs 3 and 4. What is the hypotenuse?',
    type: 'geometry',
    difficulty: 2,
    solution: 5,
    hint: 'a² + b² = c²',
  },
  {
    id: 'geometry-3',
    title: 'Circle Circumference',
    description: 'Find the circumference',
    question: 'Circle with radius 5. What is the circumference? (Use π ≈ 3.14)',
    type: 'geometry',
    difficulty: 2,
    solution: 31.4,
    hint: 'C = 2πr',
  },

  // Calculus (Basics)
  {
    id: 'calculus-1',
    title: 'Derivative Rule',
    description: 'Find the derivative',
    question: 'Find the derivative of f(x) = 3x². (Write as number)',
    type: 'calculus',
    difficulty: 2,
    solution: '6x',
    hint: 'Use the power rule: d/dx(x^n) = n·x^(n-1)',
  },
  {
    id: 'calculus-2',
    title: 'Rate of Change',
    description: 'Calculate the slope',
    question: 'Distance function: d(t) = t². What is the velocity at t=2?',
    type: 'calculus',
    difficulty: 3,
    solution: 4,
    hint: 'Velocity is the derivative of distance with respect to time',
  },
  {
    id: 'calculus-3',
    title: 'Limit Concept',
    description: 'Find the limit',
    question: 'As x approaches 2, what does (x² + 1) approach?',
    type: 'calculus',
    difficulty: 1,
    solution: 5,
    hint: 'Simply substitute x = 2 into the expression',
  },
];

export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find((c) => c.id === id);
};

export const getChallengesByType = (type: string): Challenge[] => {
  return challenges.filter((c) => c.type === type);
};

export const getChallengesByDifficulty = (difficulty: number): Challenge[] => {
  return challenges.filter((c) => c.difficulty <= difficulty);
};
