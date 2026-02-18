'use client';

import { useState } from 'react';
import { Header } from '@/app/components/Header';
import { ChallengeCard } from '@/app/components/ChallengeCard';
import { FeedbackModal } from '@/app/components/FeedbackModal';
import { challenges, getChallengesByType } from '@/app/lib/challenges';
import { useGameStore } from '@/app/lib/gameStore';
import { Zap, Target } from 'lucide-react';

export default function Home() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'algebra' | 'geometry' | 'calculus'>('all');
  const completed = useGameStore((state) => state.progress.completedChallenges);

  const filteredChallenges =
    selectedType === 'all' ? challenges : getChallengesByType(selectedType as 'algebra' | 'geometry' | 'calculus');

  const stats = {
    algebra: getChallengesByType('algebra').length,
    geometry: getChallengesByType('geometry').length,
    calculus: getChallengesByType('calculus').length,
  };

  return (
    <>
      <Header onFeedbackClick={() => setFeedbackOpen(true)} />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-purple-600">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-yellow-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Welcome to Math Madness! 🎮</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Challenge yourself with interactive math problems across algebra, geometry, and calculus. Earn points, build
              streaks, and unlock achievements!
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{stats.algebra}</div>
                <div className="text-sm text-gray-600">Algebra</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{stats.geometry}</div>
                <div className="text-sm text-gray-600">Geometry</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">{stats.calculus}</div>
                <div className="text-sm text-gray-600">Calculus</div>
              </div>
            </div>
          </div>

          {/* Challenge Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Target size={24} />
              Choose Your Challenge
            </h3>
            <div className="flex flex-wrap gap-2">
              {(['all', 'algebra', 'geometry', 'calculus'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedType === type
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChallenges.map((challenge, idx) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                isCompleted={completed.includes(challenge.id)}
                isLocked={false}
              />
            ))}
          </div>

          {/* Progress */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Keep Learning! 🚀</h3>
            <p className="mb-4">Complete all challenges and master the math!</p>
            <div className="text-sm">
              Progress: <strong>{completed.length} / {challenges.length}</strong> challenges completed
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-3">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completed.length / challenges.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </main>

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}
