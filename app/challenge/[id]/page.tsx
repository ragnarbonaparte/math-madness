'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getChallengeById } from '@/app/lib/challenges';
import { useGameStore } from '@/app/lib/gameStore';
import { FeedbackModal } from '@/app/components/FeedbackModal';
import { GraphingCalculator } from '@/app/components/GraphingCalculator';
import { MessageSquare, ArrowLeft, Lightbulb, CheckCircle, XCircle } from 'lucide-react';

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const challenge = getChallengeById(id);
  const addPoints = useGameStore((state) => state.addPoints);
  const completeChallenge = useGameStore((state) => state.completeChallenge);
  const incrementStreak = useGameStore((state) => state.incrementStreak);
  const progress = useGameStore((state) => state.progress);

  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Challenge not found</h1>
          <Link href="/" className="text-purple-600 font-semibold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const checkAnswer = () => {
    // Normalize answer for comparison
    const normalizeAnswer = (ans: string): string => {
      return ans.toLowerCase().replace(/\s/g, '').replace('x', 'X');
    };

    const userNorm = normalizeAnswer(userAnswer);
    const solutionNorm = normalizeAnswer(String(challenge.solution));

    const correct = userNorm === solutionNorm;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const points = challenge.difficulty * 10;
      addPoints(points);
      completeChallenge(challenge.id);
      incrementStreak();
    }
  };

  const typeEmojiMap: Record<string, string> = {
    algebra: '📐',
    geometry: '🔺',
    calculus: '📈',
  };
  const typeEmoji = typeEmojiMap[challenge.type] || '🧮';

  return (
    <>
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition">
            <ArrowLeft size={20} />
            Back
          </Link>
          <button
            onClick={() => setFeedbackOpen(true)}
            className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
          >
            <MessageSquare size={18} />
            Feedback
          </button>
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Challenge Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{typeEmoji}</span>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{challenge.title}</h1>
                    <p className="text-gray-600">{challenge.description}</p>
                  </div>
                </div>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                Level {challenge.difficulty}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
              <p className="text-gray-600 text-sm mb-2">Challenge:</p>
              <p className="text-2xl font-semibold text-gray-900">{challenge.question}</p>
            </div>
          </div>

          {/* Answer Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Answer:</label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !showResult && checkAnswer()}
              placeholder="Enter your answer..."
              disabled={showResult}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600 disabled:bg-gray-100 disabled:text-gray-500"
            />

            {!showResult && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition flex items-center gap-2"
                >
                  <Lightbulb size={18} />
                  Hint
                </button>
              </div>
            )}

            {showHint && !showResult && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 font-semibold">💡 Hint:</p>
                <p className="text-blue-800">{challenge.hint}</p>
              </div>
            )}
          </div>

          {/* Result Section */}
          {showResult && (
            <div
              className={`rounded-lg shadow-md p-6 mb-6 border-l-4 ${
                isCorrect
                  ? 'bg-green-50 border-green-500'
                  : 'bg-red-50 border-red-500'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{isCorrect ? '🎉' : '💭'}</div>
                <div className="flex-1">
                  <p className={`text-lg font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite...'}
                  </p>
                  <p className="text-gray-700 mb-3">
                    {isCorrect
                      ? `Great job! You earned ${challenge.difficulty * 10} points!`
                      : `The correct answer is: ${challenge.solution}`}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowResult(false);
                        setUserAnswer('');
                        setShowHint(false);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      Try Again
                    </button>
                    <Link
                      href="/"
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Graphing Calculator */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <GraphingCalculator />
          </div>

          {/* Challenge Info */}
          <div className="bg-purple-50 rounded-lg border border-purple-200 p-4 text-sm text-gray-700">
            <p>
              <strong>Tip:</strong> Use the graphing calculator below to visualize equations and help solve the problem!
            </p>
          </div>
        </div>
      </main>

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}
