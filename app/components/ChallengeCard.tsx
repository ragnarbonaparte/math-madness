'use client';

import Link from 'next/link';
import { Challenge } from '@/app/types';
import { ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { useGameStore } from '@/app/lib/gameStore';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted?: boolean;
  isLocked?: boolean;
}

export function ChallengeCard({ challenge, isCompleted = false, isLocked = false }: ChallengeCardProps) {
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty === 1) return 'bg-green-100 text-green-800';
    if (difficulty === 2) return 'bg-yellow-100 text-yellow-800';
    if (difficulty === 3) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getTypeColor = (type: string) => {
    if (type === 'algebra') return 'from-blue-500 to-blue-600';
    if (type === 'geometry') return 'from-green-500 to-green-600';
    return 'from-purple-500 to-purple-600';
  };

  const typeEmoji: Record<string, string> = {
    algebra: '📐',
    geometry: '🔺',
    calculus: '📈',
  };
  const emoji = typeEmoji[challenge.type] || '🧮';

  return (
    <Link
      href={isLocked ? '#' : `/challenge/${challenge.id}`}
      className={`relative group ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div
        className={`h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all border-2 ${
          isCompleted
            ? 'border-green-400'
            : isLocked
              ? 'border-gray-200 opacity-60'
              : 'border-transparent hover:border-purple-400'
        } p-4 overflow-hidden`}
      >
        {isLocked && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
            <Lock size={32} className="text-white" />
          </div>
        )}

        <div className={`bg-gradient-to-br ${getTypeColor(challenge.type)} text-white rounded-lg p-3 mb-3`}>
          <div className="text-3xl">{emoji}</div>
        </div>

        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-gray-900">{challenge.title}</h3>
            <p className="text-sm text-gray-600">{challenge.description}</p>
          </div>
          {isCompleted && <CheckCircle size={24} className="text-green-500 flex-shrink-0" />}
        </div>

        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
          <span className={`text-xs font-semibold px-2 py-1 rounded ${getDifficultyColor(challenge.difficulty)}`}>
            Level {challenge.difficulty}
          </span>
          {!isLocked && <ChevronRight size={18} className="text-purple-600 ml-auto group-hover:translate-x-1 transition" />}
        </div>
      </div>
    </Link>
  );
}
