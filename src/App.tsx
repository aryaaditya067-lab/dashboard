import React, { useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import {
  Achievement,
  AppRole,
  Assignment,
  ClassDataset,
  ConceptInsight,
  LearningModule,
  Mission,
  NotificationItem,
  StudentNavTab,
  StudentRecord,
  TeacherNavTab,
  VillageBuilding,
} from './types/palampur';
import {
  buildConceptInsights,
  CLASS_6A_DATASET,
  INITIAL_ACHIEVEMENTS,
  INITIAL_MISSIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_VILLAGE_BUILDINGS,
  LEARNING_MODULES,
  SAMPLE_CLASS_DATASET,
} from './data/palampurData';
import { LandingExperience } from './components/landing/LandingExperience';
import { StudentShell } from './components/student/StudentShell';
import { StudentHome } from './components/student/StudentHome';
import {
  AchievementsView,
  LeaderboardView,
  LearningModulesView,
  MissionsView,
  StudentProfileView,
  VillageRestorationView,
} from './components/student/StudentSubViews';
import { LearningActivityModal } from './components/student/LearningActivityModal';
import { TeacherShell } from './components/teacher/TeacherShell';
import { TeacherOverview } from './components/teacher/TeacherOverview';
import {
  MisconceptionsView,
  TeachingRecommendationsView,
} from './components/teacher/TeachingAndMisconceptionsViews';
import {
  ClassAnalyticsView,
  StudentDetailView,
  StudentPerformanceMatrix,
} from './components/teacher/ClassAnalyticsAndMatrixViews';
import {
  AssignmentsView,
  ReportsView,
  TeacherSettingsView,
  TeacherVillageView,
} from './components/teacher/TeacherOperationalViews';
import { AuthModal, AuthSuccessPayload } from './components/auth/AuthModal';

export default function App() {
  const [role, setRole] = useState<AppRole>('landing');
  const [authModalRole, setAuthModalRole] = useState<'student' | 'teacher' | null>(null);
  const [loggedInStudentId, setLoggedInStudentId] = useState<string>('stu-1');
  const [studentTab, setStudentTab] = useState<StudentNavTab>('home');
  const [teacherTab, setTeacherTab] = useState<TeacherNavTab>('overview');

  const [buildings, setBuildings] = useState<VillageBuilding[]>(INITIAL_VILLAGE_BUILDINGS);
  const [modules, setModules] = useState<LearningModule[]>(LEARNING_MODULES);
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const [class6AData, setClass6AData] = useState<ClassDataset>(CLASS_6A_DATASET);
  const [sampleData, setSampleData] = useState<ClassDataset>(SAMPLE_CLASS_DATASET);
  const [activeDatasetId, setActiveDatasetId] = useState<'class-6a' | 'sample-class'>('class-6a');

  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [inspectedStudentId, setInspectedStudentId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Derive overall village restoration percentage (starts cleanly at 68%)
  const villageProgressPct = useMemo(() => {
    const avg =
      buildings.reduce((acc, b) => acc + b.progress, 0) / Math.max(1, buildings.length);
    return Math.round(avg);
  }, [buildings]);

  const activeDataset = activeDatasetId === 'class-6a' ? class6AData : sampleData;
  const setActiveDataset =
    activeDatasetId === 'class-6a' ? setClass6AData : setSampleData;

  const currentStudent =
    class6AData.students.find((s) => s.id === loggedInStudentId) ?? class6AData.students[0];
  const inspectedStudent =
    activeDataset.students.find((s) => s.id === inspectedStudentId) ?? null;

  const activeModule = modules.find((m) => m.id === activeModuleId) ?? null;
  const activeModuleBuilding = activeModule
    ? buildings.find((b) => b.id === activeModule.linkedBuildingId)
    : undefined;

  const handleCompleteModule = (result: {
    moduleId: string;
    scorePct: number;
    xpEarned: number;
    villageBoostPct: number;
    detectedMisconceptions: string[];
    masteredConcepts: string[];
  }) => {
    const completedMod = modules.find((m) => m.id === result.moduleId);
    if (!completedMod) return;

    // 1. Update modules
    setModules((prev) =>
      prev.map((m) =>
        m.id === result.moduleId
          ? {
              ...m,
              progress: Math.max(m.progress, result.scorePct >= 60 ? 100 : 80),
              completed: m.completed || result.scorePct >= 60,
            }
          : m,
      ),
    );

    // 2. Boost linked village building
    const updatedBuildings = buildings.map((b) => {
      if (b.id !== completedMod.linkedBuildingId) return b;
      const nextProg = Math.min(100, b.progress + result.villageBoostPct * 2);
      return {
        ...b,
        progress: nextProg,
        status: (nextProg >= 100 ? 'restored' : 'restoring') as VillageBuilding['status'],
      };
    });
    setBuildings(updatedBuildings);
    const nextVillagePct = Math.round(
      updatedBuildings.reduce((acc, b) => acc + b.progress, 0) /
        Math.max(1, updatedBuildings.length),
    );

    // 3. Update Today's Mission & milestones
    setMissions((prev) =>
      prev.map((mis) => {
        if (mis.id === 'mis-today' && result.moduleId === mis.linkedModuleId) {
          return { ...mis, currentCount: mis.targetCount, completed: true };
        }
        if (mis.id === 'mis-solar' && result.moduleId === 'mod-electricity') {
          const nextCount = Math.min(mis.targetCount, mis.currentCount + 2);
          return {
            ...mis,
            currentCount: nextCount,
            completed: nextCount >= mis.targetCount,
          };
        }
        if (mis.id === 'mis-hall') {
          return {
            ...mis,
            currentCount: nextVillagePct,
            completed: nextVillagePct >= mis.targetCount,
          };
        }
        return mis;
      }),
    );

    // 4. Update active student's record and dynamically recompute Class 6A concept insights
    setClass6AData((prev) => {
      const updatedStudents = prev.students.map((stu) => {
        if (stu.id !== currentStudent.id) return stu;
        const nextConcepts = { ...stu.conceptStates };
        result.masteredConcepts.forEach((cid) => {
          nextConcepts[cid] = 'secure';
        });
        result.detectedMisconceptions.forEach((cid) => {
          nextConcepts[cid] = 'misconception';
        });
        const prevSubj = stu.subjects[completedMod.subject];
        const nextSubj = Math.min(
          99,
          Math.round((prevSubj * 2 + Math.max(result.scorePct, prevSubj)) / 3),
        );
        const nextSubjects = { ...stu.subjects, [completedMod.subject]: nextSubj };
        const nextOverall = Math.round(
          (nextSubjects.Maths +
            nextSubjects.Science +
            nextSubjects.English +
            nextSubjects.EVS) /
            4,
        );
        const nextXp = stu.xp + result.xpEarned;
        return {
          ...stu,
          xp: nextXp,
          level: Math.max(1, Math.floor(nextXp / 160)),
          overallScore: nextOverall,
          subjects: nextSubjects,
          modulesCompleted: Math.min(stu.totalModules, stu.modulesCompleted + 1),
          conceptStates: nextConcepts,
          recentActivity: [
            {
              id: `act-${Date.now()}`,
              title: completedMod.title,
              subject: completedMod.subject,
              scorePct: result.scorePct,
              xpEarned: result.xpEarned,
              timestamp: 'Just now',
            },
            ...stu.recentActivity.slice(0, 4),
          ],
        };
      });

      return {
        ...prev,
        villageProgressPct: nextVillagePct,
        students: updatedStudents,
        conceptInsights: buildConceptInsights(updatedStudents),
      };
    });

    // 5. Check achievement unlocks
    if (result.scorePct === 100 && result.moduleId === 'mod-electricity') {
      setAchievements((prev) =>
        prev.map((a) =>
          a.id === 'ach-circuit-master'
            ? { ...a, unlocked: true, unlockedDate: 'Nov 17, 2026' }
            : a,
        ),
      );
    }
    if (result.scorePct === 100 && result.moduleId === 'mod-water-safety') {
      setAchievements((prev) =>
        prev.map((a) =>
          a.id === 'ach-hydro-scientist'
            ? { ...a, unlocked: true, unlockedDate: 'Nov 17, 2026' }
            : a,
        ),
      );
    }

    showToast(
      `+${result.xpEarned} XP earned! ${completedMod.title} boosted Palampur restoration.`,
    );
  };

  const handleClaimMission = (missionId: string) => {
    const target = missions.find((m) => m.id === missionId);
    if (!target || target.claimed || !target.completed) return;

    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, claimed: true } : m)),
    );
    setClass6AData((prev) => {
      const updated = prev.students.map((s) =>
        s.id === currentStudent.id
          ? {
              ...s,
              xp: s.xp + target.xpReward,
              level: Math.max(1, Math.floor((s.xp + target.xpReward) / 160)),
            }
          : s,
      );
      return { ...prev, students: updated };
    });
    showToast(`Claimed +${target.xpReward} XP from ${target.title}!`);
  };

  const handleInvestXp = (buildingId: string) => {
    if (currentStudent.xp < 100) return;
    const bTarget = buildings.find((b) => b.id === buildingId);
    if (!bTarget || bTarget.progress >= 100) return;

    const updatedBuildings = buildings.map((b) => {
      if (b.id !== buildingId) return b;
      const np = Math.min(100, b.progress + 10);
      return {
        ...b,
        progress: np,
        status: (np >= 100 ? 'restored' : 'restoring') as VillageBuilding['status'],
      };
    });
    setBuildings(updatedBuildings);
    const nextPct = Math.round(
      updatedBuildings.reduce((acc, b) => acc + b.progress, 0) /
        Math.max(1, updatedBuildings.length),
    );

    setClass6AData((prev) => ({
      ...prev,
      villageProgressPct: nextPct,
      students: prev.students.map((s) =>
        s.id === currentStudent.id ? { ...s, xp: s.xp - 100 } : s,
      ),
    }));
    showToast(`Invested 100 XP into ${bTarget.name}!`);
  };

  const handleAssignRemediation = (concept: ConceptInsight) => {
    const newAsg: Assignment = {
      id: `asg-${Date.now()}`,
      title: `Remediation: ${concept.conceptTitle}`,
      subject: concept.subject,
      conceptFocus: concept.conceptTitle,
      dueDate: 'Nov 24, 2026',
      assignedTo: `${concept.affectedStudentIds.length} Flagged Students`,
      submittedCount: 0,
      totalCount: Math.max(1, concept.affectedStudentIds.length),
      averageScore: 0,
      status: 'Active',
    };
    setActiveDataset((prev) => ({
      ...prev,
      assignments: [newAsg, ...prev.assignments],
    }));
    showToast(`Assigned targeted practice for "${concept.conceptTitle}".`);
  };

  const handleCreateAssignment = (
    asg: Omit<Assignment, 'id' | 'submittedCount' | 'averageScore'>,
  ) => {
    const full: Assignment = {
      ...asg,
      id: `asg-${Date.now()}`,
      submittedCount: 0,
      averageScore: 0,
    };
    setActiveDataset((prev) => ({
      ...prev,
      assignments: [full, ...prev.assignments],
    }));
    showToast(`Published "${asg.title}" to ${asg.assignedTo}.`);
  };

  const handleSaveStudentNote = (studentId: string, note: string) => {
    setActiveDataset((prev) => ({
      ...prev,
      students: prev.students.map((s) =>
        s.id === studentId ? { ...s, teacherNote: note } : s,
      ),
    }));
    showToast('Saved teacher intervention note.');
  };

  const handleResetDemo = () => {
    setBuildings(INITIAL_VILLAGE_BUILDINGS);
    setModules(LEARNING_MODULES);
    setMissions(INITIAL_MISSIONS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setClass6AData(CLASS_6A_DATASET);
    setSampleData(SAMPLE_CLASS_DATASET);
    setActiveDatasetId('class-6a');
    showToast('Restored initial Palampur classroom state.');
  };

  const markNotificationsRead = (audience: 'student' | 'teacher') => {
    setNotifications((prev) =>
      prev.map((n) => (n.audience === audience ? { ...n, unread: false } : n)),
    );
  };

  const handleAuthSuccess = (payload: AuthSuccessPayload) => {
    if (payload.role === 'student') {
      if (payload.newStudent) {
        const newId = `stu-${Date.now()}`;
        const nextRoll = `PLM-${101 + class6AData.students.length}`;
        const created: StudentRecord = {
          id: newId,
          name: payload.newStudent.name,
          rollNo: nextRoll,
          avatarVariant: class6AData.students.length % 6,
          level: 1,
          xp: 120,
          streakDays: 1,
          overallScore: 72,
          weeklyDelta: 4,
          completionRate: 18,
          activeThisWeek: true,
          status: 'On Track',
          subjects: { Maths: 72, Science: 70, English: 76, EVS: 70 },
          modulesCompleted: 1,
          totalModules: 6,
          conceptStates: {
            'concept-water-safety': 'unseen',
            'concept-electricity': 'unseen',
            'concept-fractions': 'fragile',
            'concept-photosynthesis': 'secure',
          },
          activeMisconceptions: [],
          recentActivity: [
            {
              id: `act-new-${Date.now()}`,
              title: 'Joined Palampur Class 6A',
              subject: 'English',
              scorePct: 100,
              xpEarned: 120,
              timestamp: 'Just now',
            },
          ],
          weeklySeries: [64, 66, 68, 69, 70, 71, 72],
          monthlySeries: [60, 64, 67, 70, 72],
          badgesUnlocked: ['ach-school-builder'],
        };
        setClass6AData((prev) => {
          const nextStudents = [created, ...prev.students];
          return {
            ...prev,
            students: nextStudents,
            conceptInsights: buildConceptInsights(nextStudents),
          };
        });
        setLoggedInStudentId(newId);
        showToast(`Welcome to Palampur, ${created.name}! (${created.rollNo})`);
      } else if (payload.studentId) {
        setLoggedInStudentId(payload.studentId);
        const signedStu = class6AData.students.find((s) => s.id === payload.studentId);
        if (signedStu) {
          showToast(`Signed in as ${signedStu.name} (${signedStu.rollNo})`);
        }
      }
      setStudentTab('home');
      setRole('student');
    } else {
      if (payload.teacherInfo) {
        const info = payload.teacherInfo;
        setClass6AData((prev) => ({
          ...prev,
          teacherName: info.name,
          schoolName: info.schoolName,
        }));
        setSampleData((prev) => ({
          ...prev,
          teacherName: info.name,
        }));
        showToast(`Signed in as ${info.name}`);
      }
      setTeacherTab('overview');
      setInspectedStudentId(null);
      setRole('teacher');
    }
    setAuthModalRole(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleSignOut = () => {
    setRole('landing');
    setInspectedStudentId(null);
    showToast('Signed out of Rebuild — Palampur.');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <MotionConfig reducedMotion="user">
      {role === 'landing' && (
        <LandingExperience
          buildings={buildings}
          villageProgressPct={villageProgressPct}
          onSelectRole={(selected) => {
            setAuthModalRole(selected);
          }}
        />
      )}

      {role === 'student' && (
        <StudentShell
          student={currentStudent}
          activeTab={studentTab}
          onSelectTab={(tab) => {
            setStudentTab(tab);
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
          onSwitchRole={(nextRole) => {
            if (nextRole === 'landing') {
              setRole('landing');
              window.scrollTo({ top: 0, behavior: 'auto' });
            } else {
              setAuthModalRole('teacher');
            }
          }}
          onSignOut={handleSignOut}
          modules={modules}
          missions={missions}
          notifications={notifications}
          onMarkNotificationsRead={() => markNotificationsRead('student')}
          onStartModule={(modId) => setActiveModuleId(modId)}
        >
          {studentTab === 'home' && (
            <StudentHome
              student={currentStudent}
              villageProgressPct={villageProgressPct}
              buildings={buildings}
              todayMission={missions[0]}
              modules={modules}
              onNavigate={setStudentTab}
              onStartModule={(modId) => setActiveModuleId(modId)}
            />
          )}

          {studentTab === 'learn' && (
            <LearningModulesView
              modules={modules}
              buildings={buildings}
              onStartModule={(modId) => setActiveModuleId(modId)}
            />
          )}

          {studentTab === 'missions' && (
            <MissionsView
              missions={missions}
              onClaimMission={handleClaimMission}
              onStartModule={(modId) => setActiveModuleId(modId)}
            />
          )}

          {studentTab === 'village' && (
            <VillageRestorationView
              buildings={buildings}
              villageProgressPct={villageProgressPct}
              studentXp={currentStudent.xp}
              onInvestXp={handleInvestXp}
              onStartModule={(modId) => setActiveModuleId(modId)}
            />
          )}

          {studentTab === 'achievements' && (
            <AchievementsView achievements={achievements} student={currentStudent} />
          )}

          {studentTab === 'leaderboard' && (
            <LeaderboardView
              students={class6AData.students}
              currentStudentId={currentStudent.id}
            />
          )}

          {studentTab === 'profile' && (
            <StudentProfileView
              student={currentStudent}
              achievements={achievements}
              onOpenAchievements={() => setStudentTab('achievements')}
            />
          )}
        </StudentShell>
      )}

      {role === 'teacher' && (
        <TeacherShell
          dataset={{ ...activeDataset, villageProgressPct }}
          activeDatasetId={activeDatasetId}
          onChangeDataset={(id) => {
            setActiveDatasetId(id);
            setInspectedStudentId(null);
          }}
          activeTab={teacherTab}
          onSelectTab={(tab) => {
            setTeacherTab(tab);
            setInspectedStudentId(null);
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
          onInspectStudent={(stu) => {
            setInspectedStudentId(stu.id);
            setTeacherTab('class');
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
          onSwitchRole={(nextRole) => {
            if (nextRole === 'landing') {
              setRole('landing');
              window.scrollTo({ top: 0, behavior: 'auto' });
            } else {
              setAuthModalRole('student');
            }
          }}
          onSignOut={handleSignOut}
          notifications={notifications}
          onMarkNotificationsRead={() => markNotificationsRead('teacher')}
        >
          {inspectedStudent ? (
            <StudentDetailView
              student={inspectedStudent}
              achievements={achievements}
              onBack={() => setInspectedStudentId(null)}
              onSaveNote={handleSaveStudentNote}
            />
          ) : (
            <>
              {teacherTab === 'overview' && (
                <TeacherOverview
                  dataset={{ ...activeDataset, villageProgressPct }}
                  buildings={buildings}
                  onInspectStudent={(stu) => {
                    setInspectedStudentId(stu.id);
                    setTeacherTab('class');
                  }}
                  onNavigate={setTeacherTab}
                />
              )}

              {teacherTab === 'class' && (
                <StudentPerformanceMatrix
                  dataset={activeDataset}
                  onInspectStudent={(stu) => setInspectedStudentId(stu.id)}
                />
              )}

              {teacherTab === 'recommendations' && (
                <TeachingRecommendationsView
                  dataset={activeDataset}
                  buildings={buildings}
                  isSampleClass={activeDatasetId === 'sample-class'}
                  onToggleSampleClass={() =>
                    setActiveDatasetId((prev) =>
                      prev === 'class-6a' ? 'sample-class' : 'class-6a',
                    )
                  }
                  onInspectStudent={(stu) => {
                    setInspectedStudentId(stu.id);
                    setTeacherTab('class');
                  }}
                  onAssignRemediation={handleAssignRemediation}
                />
              )}

              {teacherTab === 'misconceptions' && (
                <MisconceptionsView
                  dataset={activeDataset}
                  onInspectStudent={(stu) => {
                    setInspectedStudentId(stu.id);
                    setTeacherTab('class');
                  }}
                  onAssignRemediation={handleAssignRemediation}
                />
              )}

              {teacherTab === 'analytics' && (
                <ClassAnalyticsView
                  dataset={activeDataset}
                  buildings={buildings}
                  onInspectStudent={(stu) => {
                    setInspectedStudentId(stu.id);
                    setTeacherTab('class');
                  }}
                />
              )}

              {teacherTab === 'assignments' && (
                <AssignmentsView
                  dataset={activeDataset}
                  onCreateAssignment={handleCreateAssignment}
                />
              )}

              {teacherTab === 'village' && (
                <TeacherVillageView
                  dataset={{ ...activeDataset, villageProgressPct }}
                  buildings={buildings}
                />
              )}

              {teacherTab === 'reports' && (
                <ReportsView
                  dataset={{ ...activeDataset, villageProgressPct }}
                  buildings={buildings}
                />
              )}

              {teacherTab === 'settings' && (
                <TeacherSettingsView
                  activeDatasetId={activeDatasetId}
                  onChangeDataset={setActiveDatasetId}
                  onResetDemoData={handleResetDemo}
                />
              )}
            </>
          )}
        </TeacherShell>
      )}

      {/* Interactive Learning Challenge Modal */}
      {activeModule && (
        <LearningActivityModal
          module={activeModule}
          buildingName={activeModuleBuilding?.name}
          onClose={() => setActiveModuleId(null)}
          onComplete={handleCompleteModule}
        />
      )}

      {/* Student & Teacher Authentication Modal */}
      {authModalRole && (
        <AuthModal
          initialRole={authModalRole}
          students={class6AData.students}
          onClose={() => setAuthModalRole(null)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Subtle Action Feedback Toast */}
      {toastMsg && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-[#E9D9C7] bg-[#33251F] text-[#FFF9F1] px-4 py-3 shadow-lg text-xs font-medium no-print"
        >
          <CheckCircle2 className="w-4 h-4 text-[#65966A] shrink-0" />
          <span>{toastMsg}</span>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            aria-label="Dismiss notification"
            className="text-[#FFF9F1]/70 hover:text-[#FFF9F1] ml-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </MotionConfig>
  );
}
