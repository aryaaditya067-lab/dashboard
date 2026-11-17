import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Compass,
  GraduationCap,
  Lightbulb,
  Users,
} from 'lucide-react';
import { PalampurLogo, PersonAvatar } from '../common/BrandMark';
import { PalampurVillageCanvas } from '../three/PalampurVillageCanvas';
import { VillageBuilding } from '../../types/palampur';

interface LandingExperienceProps {
  buildings: VillageBuilding[];
  villageProgressPct: number;
  onSelectRole: (role: 'student' | 'teacher') => void;
}

const STORY_CHAPTERS = [
  {
    number: '01',
    kicker: 'Personalized Learning',
    title: 'Every concept mastered repairs a real village landmark.',
    body: 'Students solve real-world Himalayan challenges across Mathematics, Science, English, and Environmental Studies. Every earned XP point lifts scaffolding off Palampur’s schoolhouse, water plant, and solar ridge.',
    metricValue: '68%',
    metricLabel: 'Current Palampur Restoration',
  },
  {
    number: '02',
    kicker: 'Intelligent Diagnostics',
    title: 'Spot hidden misconceptions before they harden.',
    body: 'When a student assumes clear mountain spring water is automatically germ-free or that electric current gets used up in a wire, teachers see exactly who holds the idea and what classroom activity fixes it next.',
    metricValue: '13',
    metricLabel: 'Water-safety misconceptions flagged early',
  },
  {
    number: '03',
    kicker: 'Whole-Village Impact',
    title: 'Built for students and teachers working side by side.',
    body: 'Aditya tracks streaks, daily missions, and 3D building milestones, while Mrs. Sharma monitors class accuracy, assigns targeted practice, and exports print-ready diagnostic reports.',
    metricValue: '30',
    metricLabel: 'Class 6A learners building together',
  },
];

export const LandingExperience: React.FC<LandingExperienceProps> = ({
  buildings,
  villageProgressPct,
  onSelectRole,
}) => {
  const storyContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = storyContainerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
      const passed = Math.min(scrollable, Math.max(0, -rect.top));
      setScrollProgress(passed / scrollable);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF6E9] text-[#33251F]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 border-b border-[#E9D9C7] bg-[#FFF9F1]/95">
        <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-[#33251F] whitespace-nowrap shrink-0"
          >
            <PalampurLogo size="sm" />
            <span>Rebuild — Palampur</span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#75665C]"
          >
            <a
              href="#story"
              className="hover:text-[#33251F] transition-colors whitespace-nowrap shrink-0"
            >
              Story
            </a>
            <a
              href="#landmarks"
              className="hover:text-[#33251F] transition-colors whitespace-nowrap shrink-0"
            >
              Village
            </a>
            <a
              href="#choose-role"
              className="hover:text-[#33251F] transition-colors whitespace-nowrap shrink-0"
            >
              For Students
            </a>
            <a
              href="#choose-role"
              className="hover:text-[#33251F] transition-colors whitespace-nowrap shrink-0"
            >
              For Teachers
            </a>
          </nav>

          <button
            type="button"
            onClick={() => onSelectRole('student')}
            className="px-4 py-2 rounded-lg bg-[#E97832] hover:bg-[#C85A20] text-[#FFFDFA] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Scroll-Driven 3D Himalayan Village Experience */}
      <div id="top" ref={storyContainerRef} className="relative">
        {/* Sticky 3D Viewport Backdrop */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden border-b border-[#E9D9C7]">
          <PalampurVillageCanvas
            buildings={buildings}
            mode="story"
            scrollProgress={scrollProgress}
            showDock={false}
          />
          {/* Subtle warm cream scrim on left so hero typography stays razor legible */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,246,233,0.92) 0%, rgba(255,246,233,0.74) 40%, rgba(255,246,233,0.12) 78%, rgba(255,246,233,0.0) 100%)',
            }}
          />

          {/* Dynamic 3D Chapter Indicator */}
          <div className="pointer-events-none absolute bottom-6 right-6 hidden lg:flex items-center gap-3 rounded-xl border border-[#E9D9C7] bg-[#FFFDFA]/95 px-4 py-2.5 shadow-sm">
            <Compass className="w-4 h-4 text-[#C85A20]" />
            <div className="text-xs">
              <span className="font-semibold text-[#33251F]">3D Himalayan Valley</span>
              <span className="mx-1.5 text-[#75665C]">·</span>
              <span className="font-mono tabular-nums text-[#C85A20]">
                {Math.round(scrollProgress * 100)}% explored
              </span>
            </div>
          </div>
        </div>

        {/* Overlaid Scroll Narrative Sections */}
        <div className="relative z-10 -mt-[calc(100vh-4rem)] pointer-events-none">
          {/* Hero Frame */}
          <section className="min-h-[calc(100vh-4rem)] max-w-[1360px] mx-auto px-6 py-12 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto max-w-xl"
            >
              <p className="text-sm font-medium text-[#C85A20] mb-3">
                Learning · Play · Restore · Together for a better Palampur
              </p>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#33251F] leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Let&apos;s rebuild Palampur together!
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[#75665C] leading-relaxed max-w-lg">
                Learn, earn, and restore our Himalayan village through interactive 3D
                missions — while giving teachers real-time clarity on every concept.
              </p>

              {/* Direct Role Entry CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onSelectRole('student')}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#E97832] hover:bg-[#C85A20] text-[#FFFDFA] font-semibold text-sm shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>I&apos;m a Student</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectRole('teacher')}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-[#E9D9C7] bg-[#FFFDFA] hover:bg-[#FFF9F1] text-[#33251F] font-semibold text-sm shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  <BarChart3 className="w-4 h-4 text-[#C85A20]" />
                  <span>I&apos;m a Teacher</span>
                </button>
              </div>

              {/* Grounded Village Telemetry Strip */}
              <div className="mt-9 pt-6 border-t border-[#E9D9C7] grid grid-cols-3 gap-6 max-w-md">
                <div>
                  <div className="font-display text-2xl font-bold text-[#33251F] tabular-nums">
                    {villageProgressPct}%
                  </div>
                  <div className="text-xs text-[#75665C] mt-0.5">Village restored</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-[#33251F] tabular-nums">
                    6
                  </div>
                  <div className="text-xs text-[#75665C] mt-0.5">3D landmarks</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-[#33251F] tabular-nums">
                    30
                  </div>
                  <div className="text-xs text-[#75665C] mt-0.5">Active learners</div>
                </div>
              </div>

              <a
                href="#story"
                className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-[#75665C] hover:text-[#C85A20] transition-colors"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Scroll to fly through Palampur</span>
              </a>
            </motion.div>
          </section>

          {/* Scroll Storytelling Chapters */}
          <div id="story" className="max-w-[1360px] mx-auto px-6 space-y-32 pb-28">
            {STORY_CHAPTERS.map((ch) => (
              <section key={ch.number} className="min-h-[62vh] flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-auto max-w-md rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA]/96 p-7 shadow-sm"
                >
                  <div className="text-xs font-semibold text-[#C85A20]">
                    {ch.number}. {ch.kicker}
                  </div>
                  <h2
                    className="mt-2 font-display text-2xl font-bold text-[#33251F] leading-snug"
                    style={{ textWrap: 'balance' }}
                  >
                    {ch.title}
                  </h2>
                  <p className="mt-3 text-sm text-[#75665C] leading-relaxed">{ch.body}</p>
                  <div className="mt-5 pt-4 border-t border-[#E9D9C7] flex items-baseline gap-3">
                    <span className="font-display text-2xl font-bold text-[#E97832] tabular-nums">
                      {ch.metricValue}
                    </span>
                    <span className="text-xs text-[#75665C]">{ch.metricLabel}</span>
                  </div>
                </motion.div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Village Landmarks Overview */}
      <section
        id="landmarks"
        className="bg-[#FFF9F1] border-b border-[#E9D9C7] py-20"
      >
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#C85A20]">Palampur Architecture</p>
              <h2 className="mt-1 font-display text-3xl font-bold text-[#33251F]">
                Six community landmarks powered by learning
              </h2>
            </div>
            <p className="text-sm text-[#75665C] max-w-md">
              Each subject module connects directly to a 3D structure in the valley.
              Complete lessons to remove scaffolding and illuminate the village.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buildings.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#75665C]">
                    <span>
                      {b.category} · {b.linkedSubject}
                    </span>
                    <span className="font-mono font-semibold text-[#33251F] tabular-nums">
                      {b.progress}%
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-[#33251F]">
                    {b.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#75665C] leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-5">
                  <div className="h-2 w-full rounded-full bg-[#F3E5D4] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${b.progress}%`,
                        backgroundColor: b.progress >= 100 ? '#65966A' : '#E97832',
                      }}
                    />
                  </div>
                  <p className="mt-2.5 text-xs text-[#75665C]">{b.communityBenefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Stage (Preserving Original "Choose Your Role" Experience) */}
      <section id="choose-role" className="py-20 bg-[#FFF6E9]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#33251F]">
              Choose Your Role
            </h2>
            <p className="mt-2 text-base text-[#75665C]">
              Continue your journey as a student explorer or step into Mrs. Sharma&apos;s
              classroom intelligence workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Student Role Card */}
            <div className="rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-4">
                  <PersonAvatar name="Aditya Kumar" variant={0} role="student" size={56} />
                  <div>
                    <div className="text-xs font-medium text-[#C85A20]">
                      Student Experience · Aditya
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#33251F]">
                      I&apos;m a Student
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#75665C] leading-relaxed">
                  Play and bring the village back. Solve interactive Science, Maths,
                  English, and EVS missions to earn XP, protect your 7-day streak, and
                  restore Palampur in 3D.
                </p>

                <div className="mt-6 pt-5 border-t border-[#E9D9C7] grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="font-mono font-semibold text-[#33251F] tabular-nums">
                      1,250 XP
                    </div>
                    <div className="text-[#75665C]">Current XP</div>
                  </div>
                  <div>
                    <div className="font-mono font-semibold text-[#33251F] tabular-nums">
                      7 Days
                    </div>
                    <div className="text-[#75665C]">Active Streak</div>
                  </div>
                  <div>
                    <div className="font-mono font-semibold text-[#33251F] tabular-nums">
                      {villageProgressPct}%
                    </div>
                    <div className="text-[#75665C]">Village Built</div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectRole('student')}
                className="mt-7 w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#E97832] hover:bg-[#C85A20] text-[#FFFDFA] font-semibold text-sm transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Enter Student World</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Teacher Role Card */}
            <div className="rounded-2xl border border-[#E9D9C7] bg-[#FFFDFA] p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-4">
                  <PersonAvatar name="Mrs. Sharma" variant={2} role="teacher" size={56} />
                  <div>
                    <div className="text-xs font-medium text-[#C85A20]">
                      Teacher Analytics · Mrs. Sharma
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#33251F]">
                      I&apos;m a Teacher
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#75665C] leading-relaxed">
                  See the class dashboard. Inspect 30 students across subjects, uncover
                  high-severity misconceptions, view what to teach next, and export
                  print-ready PDF reports.
                </p>

                <div className="mt-6 pt-5 border-t border-[#E9D9C7] grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="font-mono font-semibold text-[#33251F] tabular-nums">
                      30
                    </div>
                    <div className="text-[#75665C]">Total Students</div>
                  </div>
                  <div>
                    <div className="font-mono font-semibold text-[#33251F] tabular-nums">
                      82%
                    </div>
                    <div className="text-[#75665C]">Avg. Completion</div>
                  </div>
                  <div>
                    <div className="font-mono font-semibold text-[#33251F] tabular-nums">
                      78%
                    </div>
                    <div className="text-[#75665C]">Class Confidence</div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectRole('teacher')}
                className="mt-7 w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#33251F] hover:bg-[#4A372E] text-[#FFF9F1] font-semibold text-sm transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Open Teacher Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-[#E9D9C7] bg-[#FFF9F1] py-8">
        <div className="max-w-[1360px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#75665C]">
          <div className="flex items-center gap-2.5">
            <PalampurLogo size="sm" />
            <span className="font-semibold text-[#33251F]">Rebuild — Palampur</span>
            <span>·</span>
            <span>Himalayan Community EdTech Platform</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => onSelectRole('student')}
              className="hover:text-[#33251F] transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5" /> Student Portal
            </button>
            <button
              type="button"
              onClick={() => onSelectRole('teacher')}
              className="hover:text-[#33251F] transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <Lightbulb className="w-3.5 h-3.5" /> Teacher Insights
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
