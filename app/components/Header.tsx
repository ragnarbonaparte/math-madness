'use client';

import { useGameStore } from '@/app/lib/gameStore';
import { MessageSquare, Flame, Star, Zap } from 'lucide-react';

interface HeaderProps {
  onFeedbackClick: () => void;
}

export function Header({ onFeedbackClick }: HeaderProps) {
  const progress = useGameStore((state) => state.progress);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎮</div>
            <div>
              <h1 className="text-2xl font-bold">Math Madness</h1>
              <p className="text-purple-100 text-sm">Learn math the fun way!</p>
            </div>
          </div>
          <button
            onClick={onFeedbackClick}
            className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition font-medium text-sm"
          >
            <MessageSquare size={18} />
            Feedback
          </button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 bg-white bg-opacity-10 px-3 py-2 rounded-lg">
            <Zap size={18} className="text-yellow-300" />
            <span>
              <strong>{progress.totalPoints}</strong> Points
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white bg-opacity-10 px-3 py-2 rounded-lg">
            <Flame size={18} className="text-orange-300" />
            <span>
              <strong>{progress.currentStreak}</strong> Streak
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white bg-opacity-10 px-3 py-2 rounded-lg">
            <Star size={18} className="text-yellow-300" />
            <span>
              Level <strong>{progress.level}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white bg-opacity-10 px-3 py-2 rounded-lg">
            <span>
              <strong>{progress.completedChallenges.length}</strong> Solved
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
