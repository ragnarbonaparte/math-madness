export interface Challenge {
  id: string;
  title: string;
  description: string;
  question: string;
  type: 'algebra' | 'geometry' | 'calculus';
  difficulty: number; // 1-5
  solution: string | number;
  hint: string;
}

export interface UserProgress {
  totalPoints: number;
  currentStreak: number;
  level: number;
  completedChallenges: string[];
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface GraphData {
  x: number[];
  y: number[];
  label: string;
}
