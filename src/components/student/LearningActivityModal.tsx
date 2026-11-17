import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle2,
  X,
} from 'lucide-react';
import { LearningModule, QuizOption } from '../../types/palampur';

interface LearningActivityModalProps {
  module: LearningModule;
  buildingName?: string;
  onClose: () => void;
  onComplete: (result: {
    moduleId: string;
    scorePct: number;
    xpEarned: number;
    villageBoostPct: number;
    detectedMisconceptions: string[];
    masteredConcepts: string[];
  }) => void;
}

export const LearningActivityModal: React.FC<LearningActivityModalProps> = ({
  module,
  buildingName,
  onClose,
  onComplete,
}) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [misconceptionsHit, setMisconceptionsHit] = useState<string[]>([]);
  const [masteredConcepts, setMasteredConcepts] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const questions = module.questions;
  const currentQ = questions[stepIdx];

  const handleCheckAnswer = () => {
    if (!selectedOption || submitted) return;
    setSubmitted(true);
    if (selectedOption.isCorrect) {
      setCorrectCount((c) => c + 1);
      setMasteredConcepts((prev) =>
        prev.includes(currentQ.conceptId) ? prev : [...prev, currentQ.conceptId],
      );
    } else if (selectedOption.misconceptionTag) {
      setMisconceptionsHit((prev) =>
        prev.includes(currentQ.conceptId) ? prev : [...prev, currentQ.conceptId],
      );
    }
  };

  const handleNext = () => {
    if (stepIdx + 1 < questions.length) {
      setStepIdx((i) => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      const total = Math.max(1, questions.length);
      const scorePct = Math.round((correctCount / total) * 100);
      const earned = Math.max(60, Math.round((scorePct / 100) * module.xpReward));
      setFinished(true);
      onComplete({
        moduleId: module.id,
        scorePct,
        xpEarned: earned,
        villageBoostPct: module.villageImpactPct,
        detectedMisconceptions: misconceptionsHit,
        masteredConcepts,
      });
    }
  };

  const finalScore = Math.round((correctCount / Math.max(1, questions.length)) * 100);
  const finalXp = Math.max(60, Math.round((finalScore / 100) * module.xpReward));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#33251F]/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={module.title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="w-full max-w-2xl rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] shadow-xl overflow-hidden"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E9D9C7] bg-[#FFF9F1]">
          <div>
            <div className="text-xs font-medium text-[#C85A20]">
              {module.subject} · {module.difficulty}
              {buildingName ? ` · Restores ${buildingName}` : ''}
            </div>
            <h2 className="font-display text-lg font-bold text-[#33251F]">{module.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close activity"
            className="p-2 rounded-lg text-[#75665C] hover:text-[#33251F] hover:bg-[#FFF6E9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!finished && currentQ ? (
          <div className="p-6">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-[#75665C] mb-2">
              <span>
                Challenge {stepIdx + 1} of {questions.length}
              </span>
              <span className="font-mono tabular-nums">+{currentQ.xpReward} XP</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#F3E5D4] overflow-hidden mb-6">
              <div
                className="h-full rounded-full bg-[#E97832] transition-all duration-300"
                style={{ width: `${((stepIdx + (submitted ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>

            <p className="text-xs font-medium text-[#75665C] mb-2">{currentQ.contextStory}</p>
            <h3 className="font-display text-lg font-semibold text-[#33251F] leading-snug">
              {currentQ.prompt}
            </h3>

            {/* Options */}
            <div className="mt-5 space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption?.id === opt.id;
                let borderClass = 'border-[#E9D9C7] bg-[#FFFDFA] hover:bg-[#FFF9F1]';
                if (submitted) {
                  if (opt.isCorrect) {
                    borderClass = 'border-[#65966A] bg-[#65966A]/10';
                  } else if (isSelected && !opt.isCorrect) {
                    borderClass = 'border-[#C94B3F] bg-[#C94B3F]/10';
                  }
                } else if (isSelected) {
                  borderClass = 'border-[#E97832] bg-[#FFF6E9]';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={submitted}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border transition-colors flex items-start justify-between gap-3 cursor-pointer disabled:cursor-default ${borderClass}`}
                  >
                    <span className="text-sm font-medium text-[#33251F]">{opt.label}</span>
                    {submitted && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-[#65966A] shrink-0 mt-0.5" />
                    )}
                    {submitted && isSelected && !opt.isCorrect && (
                      <AlertTriangle className="w-5 h-5 text-[#C94B3F] shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Misconception-aware Explanation */}
            {submitted && selectedOption && (
              <div
                className={`mt-5 rounded-xl border p-4 text-sm ${
                  selectedOption.isCorrect
                    ? 'border-[#65966A]/40 bg-[#65966A]/10 text-[#33251F]'
                    : 'border-[#E8AA43]/60 bg-[#E8AA43]/12 text-[#33251F]'
                }`}
              >
                <div className="font-semibold mb-1">
                  {selectedOption.isCorrect
                    ? 'Concept Verified'
                    : selectedOption.misconceptionTag
                      ? `Misconception Alert: ${selectedOption.misconceptionTag}`
                      : 'Not Quite Right'}
                </div>
                <p className="text-[#33251F]/90 leading-relaxed">{selectedOption.explanation}</p>
              </div>
            )}

            {/* Footer Controls */}
            <div className="mt-6 flex items-center justify-end gap-3">
              {!submitted ? (
                <button
                  type="button"
                  disabled={!selectedOption}
                  onClick={handleCheckAnswer}
                  className="px-5 py-2.5 rounded-xl bg-[#E97832] hover:bg-[#C85A20] disabled:opacity-45 text-[#FFFDFA] font-semibold text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#33251F] hover:bg-[#4A372E] text-[#FFF9F1] font-semibold text-sm transition-colors cursor-pointer"
                >
                  <span>
                    {stepIdx + 1 < questions.length ? 'Next Question' : 'Complete Challenge'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#E97832]/15 text-[#C85A20] flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-[#33251F]">
              Palampur Restoration Boosted!
            </h3>
            <p className="mt-2 text-sm text-[#75665C] max-w-md mx-auto">
              You completed <strong className="text-[#33251F]">{module.title}</strong> and
              contributed directly to {buildingName ?? 'your village'}.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto rounded-xl border border-[#E9D9C7] bg-[#FFF9F1] p-4">
              <div>
                <div className="font-mono text-xl font-bold text-[#33251F] tabular-nums">
                  {finalScore}%
                </div>
                <div className="text-xs text-[#75665C]">Accuracy</div>
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-[#E97832] tabular-nums">
                  +{finalXp} XP
                </div>
                <div className="text-xs text-[#75665C]">XP Earned</div>
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-[#65966A] tabular-nums">
                  +{module.villageImpactPct}%
                </div>
                <div className="text-xs text-[#75665C]">Village Boost</div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 px-6 py-3 rounded-xl bg-[#E97832] hover:bg-[#C85A20] text-[#FFFDFA] font-semibold text-sm transition-colors cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
