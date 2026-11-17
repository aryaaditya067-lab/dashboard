import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  Flame,
  Hammer,
  Lock,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import {
  Achievement,
  LearningModule,
  Mission,
  StudentRecord,
  Subject,
  VillageBuilding,
} from '../../types/palampur';
import { AnimatedNumber, PersonAvatar } from '../common/BrandMark';
import { CircularProgressRing, PerformanceLineChart, SubjectBarChart } from '../common/Charts';
import { PalampurVillageCanvas } from '../three/PalampurVillageCanvas';

/* 1. MY LEARNING & MODULES */
export const LearningModulesView: React.FC<{
  modules: LearningModule[];
  buildings: VillageBuilding[];
  onStartModule: (moduleId: string) => void;
}> = ({ modules, buildings, onStartModule }) => {
  const [subjectFilter, setSubjectFilter] = useState<'All' | Subject>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<
    'All' | 'Foundation' | 'Intermediate' | 'Challenge'
  >('All');

  const filtered = modules.filter((m) => {
    const matchSubj = subjectFilter === 'All' || m.subject === subjectFilter;
    const matchDiff = difficultyFilter === 'All' || m.difficulty === difficultyFilter;
    return matchSubj && matchDiff;
  });

  const completedCount = modules.filter((m) => m.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#C85A20]">
            Learning Path · {completedCount} of {modules.length} modules completed
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#33251F]">
            My Learning & Modules
          </h1>
          <p className="text-sm text-[#75665C] mt-1">
            Interactive challenges grounded in Palampur&apos;s mountain water, solar energy,
            harvest maths, and community stories.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center p-1 rounded-xl border border-[#E9D9C7] bg-[#FFFDFA]">
            {(['All', 'Maths', 'Science', 'English', 'EVS'] as const).map((subj) => (
              <button
                key={subj}
                type="button"
                onClick={() => setSubjectFilter(subj)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  subjectFilter === subj
                    ? 'bg-[#E97832] text-[#FFFDFA]'
                    : 'text-[#75665C] hover:text-[#33251F]'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          <select
            aria-label="Filter by difficulty"
            value={difficultyFilter}
            onChange={(e) =>
              setDifficultyFilter(
                e.target.value as 'All' | 'Foundation' | 'Intermediate' | 'Challenge',
              )
            }
            className="px-3 py-2 rounded-xl border border-[#E9D9C7] bg-[#FFFDFA] text-xs font-medium text-[#33251F] focus:outline-none focus:border-[#E97832]"
          >
            <option value="All">All Levels</option>
            <option value="Foundation">Foundation</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Challenge">Challenge</option>
          </select>
        </div>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((mod) => {
          const building = buildings.find((b) => b.id === mod.linkedBuildingId);
          return (
            <div
              key={mod.id}
              className="rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#75665C]">
                  <span>
                    {mod.subject} · {mod.difficulty} · {mod.estimatedMinutes} min
                  </span>
                  <span className="font-mono font-semibold text-[#C85A20] tabular-nums">
                    +{mod.xpReward} XP
                  </span>
                </div>

                <h2 className="mt-2 font-display text-lg font-bold text-[#33251F]">
                  {mod.title}
                </h2>
                <p className="mt-2 text-sm text-[#75665C] leading-relaxed">
                  {mod.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#E9D9C7] text-xs text-[#75665C] space-y-1">
                  <div>
                    Concept: <span className="font-medium text-[#33251F]">{mod.conceptTag}</span>
                  </div>
                  {building && (
                    <div>
                      Restores:{' '}
                      <span className="font-medium text-[#33251F]">{building.name}</span> (+
                      {mod.villageImpactPct}%)
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#75665C]">
                    {mod.completed ? 'Mastered' : 'Progress'}
                  </span>
                  <span className="font-mono font-semibold text-[#33251F] tabular-nums">
                    {mod.progress}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#F3E5D4] overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${mod.progress}%`,
                      backgroundColor: mod.completed ? '#65966A' : '#E97832',
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => onStartModule(mod.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    mod.completed
                      ? 'border border-[#E9D9C7] bg-[#FFF9F1] hover:bg-[#FFF6E9] text-[#33251F]'
                      : 'bg-[#E97832] hover:bg-[#C85A20] text-[#FFFDFA]'
                  }`}
                >
                  <span>{mod.completed ? 'Review Activity' : 'Continue Learning'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* 2. MISSIONS VIEW */
export const MissionsView: React.FC<{
  missions: Mission[];
  onClaimMission: (missionId: string) => void;
  onStartModule: (moduleId: string) => void;
}> = ({ missions, onClaimMission, onStartModule }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div>
        <p className="text-xs font-medium text-[#C85A20]">Quests & Milestones</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#33251F]">
          Palampur Missions
        </h1>
        <p className="text-sm text-[#75665C] mt-1">
          Complete daily and weekly missions to unlock bonus XP and accelerate village
          restoration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missions.map((m) => {
          const pct = Math.min(100, Math.round((m.currentCount / Math.max(1, m.targetCount)) * 100));
          return (
            <div
              key={m.id}
              className="rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#C85A20]">
                    {m.cadence} Mission · +{m.villageBoostPct}% Village
                  </span>
                  <span className="font-mono font-semibold text-[#33251F] tabular-nums">
                    +{m.xpReward} XP
                  </span>
                </div>
                <h2 className="mt-2 font-display text-lg font-bold text-[#33251F]">
                  {m.title}
                </h2>
                <p className="mt-1.5 text-sm text-[#75665C] leading-relaxed">
                  {m.description}
                </p>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-[#75665C] mb-1.5">
                    <span>Completion</span>
                    <span className="font-mono font-semibold text-[#33251F] tabular-nums">
                      {m.currentCount} / {m.targetCount}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#F3E5D4] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: m.completed ? '#65966A' : '#E97832',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                {m.completed && !m.claimed ? (
                  <button
                    type="button"
                    onClick={() => onClaimMission(m.id)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#65966A] hover:bg-[#558059] text-[#FFFDFA] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Claim +{m.xpReward} XP</span>
                  </button>
                ) : m.claimed ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#65966A]">
                    <CheckCircle2 className="w-4 h-4" /> Reward Claimed
                  </span>
                ) : m.linkedModuleId ? (
                  <button
                    type="button"
                    onClick={() => onStartModule(m.linkedModuleId!)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E97832] hover:bg-[#C85A20] text-[#FFFDFA] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Start Challenge</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* 3. INTERACTIVE 3D REBUILD VILLAGE EXPERIENCE */
export const VillageRestorationView: React.FC<{
  buildings: VillageBuilding[];
  villageProgressPct: number;
  studentXp: number;
  onInvestXp: (buildingId: string) => void;
  onStartModule: (moduleId: string) => void;
}> = ({
  buildings,
  villageProgressPct,
  studentXp,
  onInvestXp,
  onStartModule,
}) => {
  const [selectedId, setSelectedId] = useState<string>(buildings[1]?.id ?? buildings[0].id);
  const selected = buildings.find((b) => b.id === selectedId) ?? buildings[0];
  const restoredCount = buildings.filter((b) => b.progress >= 100).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#C85A20]">
            Signature 3D Experience · {restoredCount}/{buildings.length} Landmarks Restored
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#33251F]">
            Rebuild Palampur in 3D
          </h1>
          <p className="text-sm text-[#75665C] mt-1">
            Inspect any landmark in the valley, launch its linked lesson, or invest your
            earned XP to raise the structure.
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-[#E9D9C7] bg-[#FFFDFA] px-4 py-2.5">
          <div>
            <div className="text-[11px] text-[#75665C]">Village Progress</div>
            <div className="font-display text-lg font-bold text-[#E97832] tabular-nums">
              <AnimatedNumber value={villageProgressPct} suffix="%" />
            </div>
          </div>
          <div className="h-7 w-px bg-[#E9D9C7]" />
          <div>
            <div className="text-[11px] text-[#75665C]">Available XP</div>
            <div className="font-display text-lg font-bold text-[#33251F] tabular-nums">
              <AnimatedNumber value={studentXp} suffix=" XP" />
            </div>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas + Landmark Inspector Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        <div className="xl:col-span-8 h-[460px] sm:h-[540px] rounded-2xl border border-[#E9D9C7] overflow-hidden bg-[#FFE8CC]">
          <PalampurVillageCanvas
            buildings={buildings}
            mode="interactive"
            selectedBuildingId={selectedId}
            onSelectBuilding={(id) => setSelectedId(id)}
          />
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#75665C]">
              <span>
                {selected.category} · {selected.linkedSubject}
              </span>
              <span
                className={`font-semibold ${
                  selected.progress >= 100 ? 'text-[#65966A]' : 'text-[#C85A20]'
                }`}
              >
                {selected.progress >= 100 ? 'Fully Restored' : 'Under Restoration'}
              </span>
            </div>

            <h2 className="mt-2 font-display text-2xl font-bold text-[#33251F]">
              {selected.name}
            </h2>
            <p className="mt-2 text-sm text-[#75665C] leading-relaxed">
              {selected.description}
            </p>

            <div className="mt-5 rounded-xl border border-[#E9D9C7] bg-[#FFF9F1] p-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#75665C]">Structural Progress</span>
                <span className="font-mono font-bold text-[#33251F] tabular-nums">
                  {selected.progress}%
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[#F3E5D4] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${selected.progress}%`,
                    backgroundColor: selected.progress >= 100 ? '#65966A' : '#E97832',
                  }}
                />
              </div>
              <p className="mt-3 text-xs text-[#75665C]">
                <strong className="text-[#33251F]">Community Impact:</strong>{' '}
                {selected.communityBenefit}
              </p>
            </div>

            {/* Landmark Quick Switcher */}
            <div className="mt-5">
              <div className="text-xs font-semibold text-[#75665C] mb-2">
                All Landmarks ({buildings.length})
              </div>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {buildings.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedId(b.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      b.id === selectedId
                        ? 'bg-[#FFF6E9] border border-[#E97832] text-[#33251F] font-semibold'
                        : 'hover:bg-[#FFF9F1] text-[#75665C] border border-transparent'
                    }`}
                  >
                    <span className="truncate">{b.name}</span>
                    <span className="font-mono tabular-nums ml-2 shrink-0">
                      {b.progress}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2.5">
            {selected.progress < 100 && (
              <button
                type="button"
                disabled={studentXp < 100}
                onClick={() => onInvestXp(selected.id)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#33251F] hover:bg-[#4A372E] disabled:opacity-45 text-[#FFF9F1] text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <Hammer className="w-3.5 h-3.5" />
                <span>Invest 100 XP (+10% Build)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onStartModule(selected.linkedModuleId)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#E97832] hover:bg-[#C85A20] text-[#FFFDFA] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Practice Linked Lesson</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* 4. ACHIEVEMENTS VIEW */
export const AchievementsView: React.FC<{
  achievements: Achievement[];
  student: StudentRecord;
}> = ({ achievements, student }) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#C85A20]">
            {unlockedCount} of {achievements.length} Badges Unlocked
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#33251F]">
            Achievements & Badges
          </h1>
        </div>
        <div className="text-sm text-[#75665C]">
          Total XP: <strong className="font-mono text-[#33251F] tabular-nums">{student.xp} XP</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`rounded-2xl border p-6 flex flex-col justify-between ${
              ach.unlocked
                ? 'border-[#E9D9C7] bg-[#FFFDFA]'
                : 'border-[#E9D9C7] bg-[#FFF9F1]/70 opacity-85'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    ach.unlocked
                      ? 'bg-[#E97832]/15 text-[#C85A20]'
                      : 'bg-[#E9D9C7]/50 text-[#75665C]'
                  }`}
                >
                  {ach.unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                </div>
                <span className="text-xs font-mono text-[#75665C]">
                  {ach.tier} · +{ach.xpBonus} XP
                </span>
              </div>

              <h2 className="mt-4 font-display text-lg font-bold text-[#33251F]">
                {ach.title}
              </h2>
              <p className="mt-1.5 text-sm text-[#75665C] leading-relaxed">
                {ach.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E9D9C7] flex items-center justify-between text-xs">
              <span className="text-[#75665C]">{ach.criteria}</span>
              <span
                className={`font-semibold ${
                  ach.unlocked ? 'text-[#65966A]' : 'text-[#75665C]'
                }`}
              >
                {ach.unlocked ? `Unlocked ${ach.unlockedDate ?? ''}` : 'Locked'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* 5. LEADERBOARD VIEW */
export const LeaderboardView: React.FC<{
  students: StudentRecord[];
  currentStudentId: string;
}> = ({ students, currentStudentId }) => {
  const ranked = [...students].sort((a, b) => b.xp - a.xp);
  const myRank = ranked.findIndex((s) => s.id === currentStudentId) + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#C85A20]">Class 6A · Palampur Model School</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#33251F]">
            Village Builders Leaderboard
          </h1>
        </div>
        <div className="rounded-xl border border-[#E9D9C7] bg-[#FFFDFA] px-4 py-2 text-xs text-[#75665C]">
          Your Current Rank:{' '}
          <strong className="font-mono text-[#C85A20] tabular-nums">#{myRank}</strong> of{' '}
          {ranked.length}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ranked.slice(0, 3).map((stu, idx) => (
          <div
            key={stu.id}
            className="rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] p-5 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0 ${
                  idx === 0
                    ? 'bg-[#E97832] text-[#FFFDFA]'
                    : 'bg-[#FFF6E9] border border-[#E9D9C7] text-[#33251F]'
                }`}
              >
                {idx + 1}
              </div>
              <PersonAvatar name={stu.name} variant={stu.avatarVariant} size={42} />
              <div className="min-w-0">
                <div className="font-display font-bold text-sm text-[#33251F] truncate">
                  {stu.name}
                </div>
                <div className="text-xs text-[#75665C]">
                  Level {stu.level} · {stu.streakDays}d streak
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono font-bold text-sm text-[#C85A20] tabular-nums">
                {stu.xp.toLocaleString()} XP
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Class Table */}
      <div className="rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#E9D9C7] bg-[#FFF9F1] text-xs font-semibold text-[#75665C]">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4 text-right">Streak</th>
                <th className="py-3 px-4 text-right">Modules</th>
                <th className="py-3 px-4 text-right">Overall</th>
                <th className="py-3 px-4 text-right">XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9D9C7]">
              {ranked.map((stu, idx) => {
                const isMe = stu.id === currentStudentId;
                return (
                  <tr
                    key={stu.id}
                    className={isMe ? 'bg-[#FFF6E9]' : 'hover:bg-[#FFF9F1] transition-colors'}
                  >
                    <td className="py-2.5 px-4 font-mono text-xs font-semibold text-[#75665C] tabular-nums">
                      #{idx + 1}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <PersonAvatar name={stu.name} variant={stu.avatarVariant} size={30} />
                        <span className="font-medium text-[#33251F]">
                          {stu.name} {isMe ? '(You)' : ''}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-xs text-[#75665C] tabular-nums">
                      {stu.streakDays}d
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-xs text-[#75665C] tabular-nums">
                      {stu.modulesCompleted}/{stu.totalModules}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-xs font-semibold text-[#33251F] tabular-nums">
                      {stu.overallScore}%
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-xs font-bold text-[#C85A20] tabular-nums">
                      {stu.xp.toLocaleString()} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

/* 6. STUDENT PROFILE & PERFORMANCE OVERVIEW (Preserves Screen 5!) */
export const StudentProfileView: React.FC<{
  student: StudentRecord;
  achievements: Achievement[];
  onOpenAchievements: () => void;
}> = ({ student, achievements, onOpenAchievements }) => {
  const [timeframe, setTimeframe] = useState<'1 Week' | '1 Month' | '3 Months'>('1 Month');
  const [subjectFilter, setSubjectFilter] = useState<'All Subjects' | Subject>('All Subjects');

  const unlocked = achievements.filter((a) => a.unlocked);
  const seriesValues =
    timeframe === '1 Week'
      ? student.weeklySeries
      : timeframe === '1 Month'
        ? student.monthlySeries
        : [58, 63, 68, 72, 75, student.overallScore];

  const seriesLabels =
    timeframe === '1 Week'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : timeframe === '1 Month'
        ? ['Jun 1', 'Jun 8', 'Jun 15', 'Jun 22', 'Jun 30']
        : ['Sep', 'Oct 1', 'Oct 15', 'Nov 1', 'Nov 10', 'Nov 17'];

  const displayScore =
    subjectFilter === 'All Subjects' ? student.overallScore : student.subjects[subjectFilter];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Header matching Student Performance screen */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <PersonAvatar name={student.name} variant={student.avatarVariant} size={60} />
          <div>
            <p className="text-xs font-medium text-[#C85A20]">
              {student.rollNo} · Level {student.level}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#33251F]">
              Student Performance & Profile
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            aria-label="Select subject"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value as 'All Subjects' | Subject)}
            className="px-3.5 py-2 rounded-xl border border-[#E9D9C7] bg-[#FFFDFA] text-xs font-semibold text-[#33251F] focus:outline-none focus:border-[#E97832]"
          >
            <option value="All Subjects">All Subjects</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="EVS">EVS</option>
          </select>

          <div className="inline-flex items-center p-1 rounded-xl border border-[#E9D9C7] bg-[#FFFDFA]">
            {(['1 Week', '1 Month', '3 Months'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  timeframe === tf
                    ? 'bg-[#E97832] text-[#FFFDFA]'
                    : 'text-[#75665C] hover:text-[#33251F]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3-Column Analytics Row matching Screenshot 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Progress Overview */}
        <div className="lg:col-span-4 rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-[#33251F]">
              Your Progress Overview
            </h2>
            <div className="mt-5 flex items-center gap-5">
              <CircularProgressRing value={displayScore} size={112} strokeWidth={11} />
              <div>
                <div className="text-xs text-[#75665C]">Overall Score</div>
                <div className="font-display text-2xl font-bold text-[#33251F] tabular-nums">
                  {displayScore}%
                </div>
                <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#65966A]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{student.weeklyDelta}% from last month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <PerformanceLineChart
              labels={seriesLabels}
              series={[{ name: subjectFilter, color: '#E97832', values: seriesValues }]}
              height={145}
            />
          </div>
        </div>

        {/* Subject-wise Performance */}
        <div className="lg:col-span-4 rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-[#33251F]">
              Subject-wise Performance
            </h2>
            <p className="text-xs text-[#75665C] mt-0.5">
              Live mastery across all four core subjects
            </p>
          </div>
          <SubjectBarChart
            height={215}
            items={[
              { label: 'Maths', value: student.subjects.Maths, color: '#E97832' },
              { label: 'Science', value: student.subjects.Science, color: '#F5A34A' },
              { label: 'English', value: student.subjects.English, color: '#C85A20' },
              { label: 'EVS', value: student.subjects.EVS, color: '#E8AA43' },
            ]}
          />
        </div>

        {/* Achievements Preview */}
        <div className="lg:col-span-4 rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-bold text-[#33251F]">
                Achievements
              </h2>
              <button
                type="button"
                onClick={onOpenAchievements}
                className="text-xs font-semibold text-[#C85A20] hover:underline cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {unlocked.slice(0, 3).map((ach) => (
                <div
                  key={ach.id}
                  className="rounded-xl border border-[#E9D9C7] bg-[#FFF9F1] p-3.5 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E97832]/15 text-[#C85A20] flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[#33251F] truncate">
                      {ach.title}
                    </div>
                    <div className="text-xs text-[#75665C] truncate">{ach.criteria}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#E9D9C7] grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#E97832]" />
              <span>
                Streak: <strong className="font-mono">{student.streakDays} days</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#E8AA43]" />
              <span>
                Total: <strong className="font-mono">{student.xp} XP</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
