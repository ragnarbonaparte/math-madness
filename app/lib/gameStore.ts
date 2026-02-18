'use client';

import { create } from 'zustand';
import { UserProgress, Achievement } from '@/app/types';

interface GameState {
  progress: UserProgress;
  addPoints: (points: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  completeChallenge: (challengeId: string) => void;
  unlockAchievement: (achievement: Achievement) => void;
  getLevelFromPoints: (points: number) => number;
}

const getLevelFromPoints = (points: number): number => {
  return Math.floor(points / 100) + 1;
};

export const useGameStore = create<GameState>((set) => ({
  progress: {
    totalPoints: 0,
    currentStreak: 0,
    level: 1,
    completedChallenges: [],
    achievements: [],
  },
  
  addPoints: (points: number) =>
    set((state) => {
      const newTotal = state.progress.totalPoints + points;
      return {
        progress: {
          ...state.progress,
          totalPoints: newTotal,
          level: getLevelFromPoints(newTotal),
        },
      };
    }),
  
  incrementStreak: () =>
    set((state) => ({
      progress: {
        ...state.progress,
        currentStreak: state.progress.currentStreak + 1,
      },
    })),
  
  resetStreak: () =>
    set((state) => ({
      progress: {
        ...state.progress,
        currentStreak: 0,
      },
    })),
  
  completeChallenge: (challengeId: string) =>
    set((state) => {
      if (!state.progress.completedChallenges.includes(challengeId)) {
        return {
          progress: {
            ...state.progress,
            completedChallenges: [...state.progress.completedChallenges, challengeId],
          },
        };
      }
      return state;
    }),
  
  unlockAchievement: (achievement: Achievement) =>
    set((state) => {
      const exists = state.progress.achievements.some((a) => a.id === achievement.id);
      if (!exists) {
        return {
          progress: {
            ...state.progress,
            achievements: [...state.progress.achievements, { ...achievement, unlockedAt: new Date() }],
          },
        };
      }
      return state;
    }),
  
  getLevelFromPoints: (points: number) => getLevelFromPoints(points),
}));
