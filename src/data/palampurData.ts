import {
  Achievement,
  ClassDataset,
  ConceptInsight,
  LearningModule,
  Mission,
  NotificationItem,
  StudentRecord,
  VillageBuilding,
} from '../types/palampur';

export const INITIAL_VILLAGE_BUILDINGS: VillageBuilding[] = [
  {
    id: 'schoolhouse',
    name: 'Palampur Primary School',
    category: 'Education',
    linkedSubject: 'English',
    description:
      'A cedar-framed Himalayan schoolhouse with slate roofing, sun-warmed classrooms, and a community reading porch.',
    restorationCostXp: 250,
    progress: 100,
    status: 'restored',
    communityBenefit: 'Opens daily literacy workshops for 42 village children.',
    position: [-5.5, 0, -2.5],
    rotationY: 0.35,
    linkedModuleId: 'mod-english-story',
  },
  {
    id: 'water-plant',
    name: 'Clearwater Filtration Station',
    category: 'Water',
    linkedSubject: 'Science',
    description:
      'Gravity-fed mountain spring filtration tanks with multi-stage sand, charcoal, and UV purification.',
    restorationCostXp: 350,
    progress: 72,
    status: 'restoring',
    communityBenefit: 'Delivers safe drinking water free of invisible microbes to 120 households.',
    position: [5.4, 0, -3.4],
    rotationY: -0.45,
    linkedModuleId: 'mod-water-safety',
  },
  {
    id: 'solar-microgrid',
    name: 'Ridge Solar Microgrid',
    category: 'Energy',
    linkedSubject: 'Science',
    description:
      'South-facing photovoltaic ridge array and battery storage hub powering evening study lamps.',
    restorationCostXp: 400,
    progress: 58,
    status: 'restoring',
    communityBenefit: 'Supplies clean evening electricity for homework and clinic refrigeration.',
    position: [4.8, 0, 4.4],
    rotationY: -0.9,
    linkedModuleId: 'mod-electricity',
  },
  {
    id: 'granary-mill',
    name: 'Terraced Granary & Mill',
    category: 'Agriculture',
    linkedSubject: 'Maths',
    description:
      'Stone grain storehouse and water-driven flour mill calibrated with precision harvest weight scales.',
    restorationCostXp: 300,
    progress: 85,
    status: 'restoring',
    communityBenefit: 'Prevents monsoon spoilage and tracks fair harvest shares for farmers.',
    position: [-4.8, 0, 4.6],
    rotationY: 0.75,
    linkedModuleId: 'mod-fractions-harvest',
  },
  {
    id: 'eco-conservatory',
    name: 'Valley Eco-Conservatory',
    category: 'Health',
    linkedSubject: 'EVS',
    description:
      'Terrace soil research greenhouse studying native deodar roots, composting, and rain catchment.',
    restorationCostXp: 320,
    progress: 64,
    status: 'restoring',
    communityBenefit: 'Stabilizes hillside terraces against landslides and boosts crop yields.',
    position: [0.4, 0, -6.2],
    rotationY: 0.1,
    linkedModuleId: 'mod-terrace-ecology',
  },
  {
    id: 'community-hall',
    name: 'Palampur Knowledge Hall',
    category: 'Community',
    linkedSubject: 'Maths',
    description:
      'Central octagonal timber pavilion for village assemblies, peer tutoring, and winter science fairs.',
    restorationCostXp: 500,
    progress: 30,
    status: 'foundation',
    communityBenefit: 'Unites students, parents, and teachers under one solar-lit roof.',
    position: [0, 0, 0.8],
    rotationY: 0,
    linkedModuleId: 'mod-village-budget',
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod-water-safety',
    title: 'Mountain Spring & Water Safety',
    subject: 'Science',
    difficulty: 'Intermediate',
    estimatedMinutes: 8,
    xpReward: 150,
    villageImpactPct: 5,
    linkedBuildingId: 'water-plant',
    description:
      'Investigate why crystal-clear mountain water can still carry invisible microbes and design a 3-stage Palampur filter.',
    conceptTag: 'Clear water vs. potable water',
    progress: 65,
    completed: false,
    questions: [
      {
        id: 'q-ws-1',
        conceptId: 'concept-water-safety',
        conceptName: 'Clear water is safe to drink',
        prompt:
          'After heavy monsoon rain, the spring near Palampur looks completely clear again. Is it safe to drink directly without boiling or filtering?',
        contextStory:
          'The Clearwater Filtration Station pipes water from the upper stream into village taps.',
        options: [
          {
            id: 'a',
            label: 'Yes — if water is transparent with no mud, it has no germs.',
            isCorrect: false,
            misconceptionTag: 'Clear water is safe to drink',
            explanation:
              'Common misconception: Transparency only tells us large dirt particles settled out. Bacteria and viruses are microscopic and completely invisible.',
          },
          {
            id: 'b',
            label: 'No — microscopic pathogens and dissolved salts can remain invisible in clear water.',
            isCorrect: true,
            explanation:
              'Correct! Pathogens like bacteria and protozoa are thousands of times smaller than a grain of sand, so clear water still requires disinfection or boiling.',
          },
          {
            id: 'c',
            label: 'Yes, as long as the water smells fresh and feels cold.',
            isCorrect: false,
            misconceptionTag: 'Clear water is safe to drink',
            explanation:
              'Most harmful waterborne microbes have no smell or taste, and cold mountain water can still carry pathogens.',
          },
        ],
        xpReward: 50,
      },
      {
        id: 'q-ws-2',
        conceptId: 'concept-water-safety',
        conceptName: 'Clear water is safe to drink',
        prompt:
          'Which sequence best turns cloudy stream water into safe drinking water for the school kitchen?',
        contextStory: 'Help the village engineers order the filtration chambers.',
        options: [
          {
            id: 'a',
            label: 'Sand & gravel filtration -> Boiling / UV disinfection',
            isCorrect: true,
            explanation:
              'Spot on! Sand removes suspended particles first so UV or boiling can reliably neutralize invisible microbes.',
          },
          {
            id: 'b',
            label: 'Let mud settle until clear, then serve immediately.',
            isCorrect: false,
            misconceptionTag: 'Clear water is safe to drink',
            explanation:
              'Settling clears turbidity, not living microorganisms. A disinfection step is always required.',
          },
          {
            id: 'c',
            label: 'Filter through a cotton cloth once to trap all bacteria.',
            isCorrect: false,
            misconceptionTag: 'Clear water is safe to drink',
            explanation:
              'Woven cloth traps sand and leaves, but bacteria pass straight through the cloth pores.',
          },
        ],
        xpReward: 50,
      },
      {
        id: 'q-ws-3',
        conceptId: 'concept-water-safety',
        conceptName: 'Clear water is safe to drink',
        prompt:
          'Why does Palampur add an activated charcoal layer after coarse gravel?',
        contextStory: 'Final inspection of the Clearwater Filtration Station.',
        options: [
          {
            id: 'a',
            label: 'It adsorbs dissolved chemicals and odors while sand traps fine silt.',
            isCorrect: true,
            explanation:
              'Exactly right! Multi-stage filtration pairs physical straining with chemical adsorption before disinfection.',
          },
          {
            id: 'b',
            label: 'It turns saltwater into sugar water.',
            isCorrect: false,
            explanation:
              'Charcoal removes odors and trace organics, not dissolved salt ions.',
          },
          {
            id: 'c',
            label: 'Charcoal makes water clear, which guarantees zero microbes.',
            isCorrect: false,
            misconceptionTag: 'Clear water is safe to drink',
            explanation:
              'Even after charcoal makes water clear and odor-free, boiling or UV treatment is still necessary to kill microbes.',
          },
        ],
        xpReward: 50,
      },
    ],
  },
  {
    id: 'mod-electricity',
    title: 'Solar Microgrid & Circuits Lab',
    subject: 'Science',
    difficulty: 'Challenge',
    estimatedMinutes: 10,
    xpReward: 180,
    villageImpactPct: 6,
    linkedBuildingId: 'solar-microgrid',
    description:
      'Wire Palampur’s Ridge Solar Microgrid by understanding how electric current flows in closed loops without getting "used up".',
    conceptTag: 'Conservation of current in circuits',
    progress: 50,
    completed: false,
    questions: [
      {
        id: 'q-el-1',
        conceptId: 'concept-electricity',
        conceptName: 'Current gets used up in the wire',
        prompt:
          'In a simple series circuit powering a classroom lantern, how does the electric current leaving the bulb compare to the current entering the bulb?',
        contextStory: 'Testing the first solar-powered lantern line on Ridge Microgrid.',
        options: [
          {
            id: 'a',
            label: 'Current leaving the bulb is smaller because the bulb uses up electricity.',
            isCorrect: false,
            misconceptionTag: 'Current gets used up in the wire',
            explanation:
              'Common misconception: Energy is transformed into light and heat inside the filament, but charge carriers (current) are conserved and flow at the exact same rate all around a series loop.',
          },
          {
            id: 'b',
            label: 'Current is identical before and after the bulb — energy is transferred, not charges.',
            isCorrect: true,
            explanation:
              'Brilliant! In a series loop, the ammeter reads the exact same current before and after the bulb; electrical energy is converted into light.',
          },
          {
            id: 'c',
            label: 'Zero current returns to the solar battery.',
            isCorrect: false,
            misconceptionTag: 'Current gets used up in the wire',
            explanation:
              'A circuit must be a complete loop with current returning to the source for any bulb to stay lit.',
          },
        ],
        xpReward: 60,
      },
      {
        id: 'q-el-2',
        conceptId: 'concept-electricity',
        conceptName: 'Current gets used up in the wire',
        prompt:
          'If two village homes are wired in parallel to the microgrid and one home switches off its lamp, what happens to the second home’s lamp?',
        contextStory: 'Designing reliable night lighting for the Palampur lanes.',
        options: [
          {
            id: 'a',
            label: 'It stays lit at the same brightness because each branch has its own closed path.',
            isCorrect: true,
            explanation:
              'Correct! Parallel branches share the same voltage independently, so switching off one branch keeps the others shining.',
          },
          {
            id: 'b',
            label: 'It goes dark because the return wire is broken.',
            isCorrect: false,
            misconceptionTag: 'Current gets used up in the wire',
            explanation:
              'That happens in a series circuit, not a parallel circuit.',
          },
          {
            id: 'c',
            label: 'It burns out immediately because unused current piles up.',
            isCorrect: false,
            misconceptionTag: 'Current gets used up in the wire',
            explanation:
              'Current does not pile up; opening one switch simply stops flow in that branch.',
          },
        ],
        xpReward: 60,
      },
      {
        id: 'q-el-3',
        conceptId: 'concept-electricity',
        conceptName: 'Current gets used up in the wire',
        prompt:
          'Ammeter A1 sits right next to the solar panel positive terminal and A2 sits near the negative terminal in a single loop. If A1 reads 2.4 A, what does A2 read?',
        contextStory: 'Final safety check before energizing Ridge Solar Microgrid.',
        options: [
          {
            id: 'a',
            label: '2.4 A — current is conserved around the entire series loop.',
            isCorrect: true,
            explanation:
              'Exact! Charge flow rate stays constant throughout a single continuous loop.',
          },
          {
            id: 'b',
            label: '1.2 A — half of the current was consumed by the lamps.',
            isCorrect: false,
            misconceptionTag: 'Current gets used up in the wire',
            explanation:
              'Lamps transform electrical energy into light, leaving the current (amperes) unchanged at 2.4 A.',
          },
          {
            id: 'c',
            label: '0.0 A — all current stops at the last lamp.',
            isCorrect: false,
            misconceptionTag: 'Current gets used up in the wire',
            explanation:
              'Without return current to the negative terminal, the circuit would be open and no lamps would light.',
          },
        ],
        xpReward: 60,
      },
    ],
  },
  {
    id: 'mod-fractions-harvest',
    title: 'Harvest Ratios & Granary Fractions',
    subject: 'Maths',
    difficulty: 'Intermediate',
    estimatedMinutes: 7,
    xpReward: 140,
    villageImpactPct: 5,
    linkedBuildingId: 'granary-mill',
    description:
      'Balance grain sacks and compare harvest fractions accurately to calibrate the Terraced Granary & Mill.',
    conceptTag: 'Comparing fractions & ratios',
    progress: 85,
    completed: false,
    questions: [
      {
        id: 'q-fr-1',
        conceptId: 'concept-fractions',
        conceptName: 'Larger denominator means larger fraction',
        prompt:
          'Two farmers bring wheat sacks of the same total capacity. Meera’s sack is 3/4 full and Kabir’s sack is 3/8 full. Which sack holds more wheat?',
        contextStory: 'Weighing the autumn harvest at the Terraced Granary.',
        options: [
          {
            id: 'a',
            label: 'Kabir’s 3/8 sack, because 8 is greater than 4.',
            isCorrect: false,
            misconceptionTag: 'Larger denominator means larger fraction',
            explanation:
              'Watch out! A larger denominator splits the same whole into smaller pieces. Eighths are half the size of fourths.',
          },
          {
            id: 'b',
            label: 'Meera’s 3/4 sack, because fourths are larger pieces than eighths.',
            isCorrect: true,
            explanation:
              'Correct! 3/4 equals 6/8, which is double 3/8.',
          },
          {
            id: 'c',
            label: 'Both hold the same amount because both numerators are 3.',
            isCorrect: false,
            misconceptionTag: 'Larger denominator means larger fraction',
            explanation:
              'Equal numerators only compare equal amounts if the denominators (piece sizes) are also equal.',
          },
        ],
        xpReward: 70,
      },
      {
        id: 'q-fr-2',
        conceptId: 'concept-fractions',
        conceptName: 'Larger denominator means larger fraction',
        prompt:
          'The mill blends millet and barley in a 2:3 ratio. If we pour 12 kg of millet, how many kilograms of barley keep the blend balanced?',
        contextStory: 'Setting the stone mill hopper ratios.',
        options: [
          {
            id: 'a',
            label: '18 kg of barley',
            isCorrect: true,
            explanation:
              'Right on! Multiplying both parts of 2:3 by 6 gives 12 kg : 18 kg.',
          },
          {
            id: 'b',
            label: '13 kg of barley (adding 10 to both numbers)',
            isCorrect: false,
            misconceptionTag: 'Larger denominator means larger fraction',
            explanation:
              'Ratios scale by multiplication, not addition!',
          },
          {
            id: 'c',
            label: '8 kg of barley',
            isCorrect: false,
            explanation:
              'Barley is the larger part of the 2:3 ratio, so it must exceed 12 kg.',
          },
        ],
        xpReward: 70,
      },
    ],
  },
  {
    id: 'mod-terrace-ecology',
    title: 'Terrace Roots & Plant Nutrition',
    subject: 'EVS',
    difficulty: 'Foundation',
    estimatedMinutes: 6,
    xpReward: 120,
    villageImpactPct: 4,
    linkedBuildingId: 'eco-conservatory',
    description:
      'Discover how terrace trees make their own food via photosynthesis and hold Himalayan slopes intact.',
    conceptTag: 'Photosynthesis & soil conservation',
    progress: 64,
    completed: false,
    questions: [
      {
        id: 'q-ev-1',
        conceptId: 'concept-photosynthesis',
        conceptName: 'Plants absorb all food from soil',
        prompt:
          'Where does a young deodar sapling get most of the mass it uses to build its wooden trunk and needles?',
        contextStory: 'Planting windbreaks around the Valley Eco-Conservatory.',
        options: [
          {
            id: 'a',
            label: 'Mostly from carbon dioxide in the air and water, turned into sugars using sunlight.',
            isCorrect: true,
            explanation:
              'Yes! Through photosynthesis, plants fix atmospheric CO2 and water into glucose and cellulose; soil supplies minerals, not bulk food.',
          },
          {
            id: 'b',
            label: 'Directly by eating soil particles through its roots.',
            isCorrect: false,
            misconceptionTag: 'Plants absorb all food from soil',
            explanation:
              'Common misconception: Roots absorb water and trace minerals, while leaves manufacture sugars from CO2 and sunlight.',
          },
          {
            id: 'c',
            label: 'From rainwater temperature alone.',
            isCorrect: false,
            explanation:
              'Water is essential, but carbon from air forms the main dry mass of plant structures.',
          },
        ],
        xpReward: 60,
      },
      {
        id: 'q-ev-2',
        conceptId: 'concept-photosynthesis',
        conceptName: 'Plants absorb all food from soil',
        prompt:
          'Why do Himalayan farmers build stone-walled stepped terraces instead of plowing straight down a steep slope?',
        contextStory: 'Protecting Palampur’s valley floor during heavy rains.',
        options: [
          {
            id: 'a',
            label: 'Terraces slow water runoff so topsoil soaks up moisture instead of washing away.',
            isCorrect: true,
            explanation:
              'Exactly! Level steps reduce runoff speed, preventing erosion and recharging mountain groundwater.',
          },
          {
            id: 'b',
            label: 'Steep slopes get no sunlight at all.',
            isCorrect: false,
            explanation:
              'Terracing is primarily for water retention and topsoil conservation.',
          },
          {
            id: 'c',
            label: 'Stone walls feed sugar directly into crop roots.',
            isCorrect: false,
            misconceptionTag: 'Plants absorb all food from soil',
            explanation:
              'Plants make their own sugars in green leaves; stone walls prevent soil erosion.',
          },
        ],
        xpReward: 60,
      },
    ],
  },
  {
    id: 'mod-english-story',
    title: 'Voices of Palampur: Reading & Craft',
    subject: 'English',
    difficulty: 'Foundation',
    estimatedMinutes: 6,
    xpReward: 110,
    villageImpactPct: 3,
    linkedBuildingId: 'schoolhouse',
    description:
      'Analyze village letters, strengthen inference skills, and compose clear community bulletins for the Schoolhouse board.',
    conceptTag: 'Inference & evidence in prose',
    progress: 100,
    completed: true,
    questions: [
      {
        id: 'q-en-1',
        conceptId: 'concept-english-inference',
        conceptName: 'Evidence-based reading inference',
        prompt:
          '"Before dawn, Asha checked the brass rain gauge twice, smiled at the rising mist, and rolled open the cedar shutters of the library." What can we infer about Asha?',
        contextStory: 'Morning dispatch from the Palampur Primary School.',
        options: [
          {
            id: 'a',
            label: 'She is conscientious and welcomes the morning rain for the village.',
            isCorrect: true,
            explanation:
              'Great reading! Checking the gauge twice and smiling at the mist both point to care and optimism.',
          },
          {
            id: 'b',
            label: 'She is afraid of storms and locks the building.',
            isCorrect: false,
            explanation:
              'She smiled and rolled open the shutters, showing readiness rather than fear.',
          },
        ],
        xpReward: 55,
      },
      {
        id: 'q-en-2',
        conceptId: 'concept-english-inference',
        conceptName: 'Evidence-based reading inference',
        prompt:
          'Which sentence gives the clearest, most actionable notice for the village bulletin board?',
        contextStory: 'Drafting announcements for the community.',
        options: [
          {
            id: 'a',
            label: 'Water Testing Workshop: Saturday, 9:00 AM at Clearwater Station — bring a clean bottle.',
            isCorrect: true,
            explanation:
              'Crisp and complete: gives event, day, time, place, and preparation in one scannable line.',
          },
          {
            id: 'b',
            label: 'There might be some water thing happening sometime soon near the hill maybe.',
            isCorrect: false,
            explanation:
              'Vague notices leave readers unsure when or where to show up.',
          },
        ],
        xpReward: 55,
      },
    ],
  },
  {
    id: 'mod-village-budget',
    title: 'Knowledge Hall Timber & Budget',
    subject: 'Maths',
    difficulty: 'Challenge',
    estimatedMinutes: 9,
    xpReward: 200,
    villageImpactPct: 7,
    linkedBuildingId: 'community-hall',
    description:
      'Calculate timber beam spans, percentage discounts, and seating area to raise Palampur’s central Knowledge Hall.',
    conceptTag: 'Percentages & perimeter geometry',
    progress: 30,
    completed: false,
    questions: [
      {
        id: 'q-vb-1',
        conceptId: 'concept-percentages',
        conceptName: 'Percentages & proportional reasoning',
        prompt:
          'The Knowledge Hall needs 200 slate tiles. 35% have arrived in Palampur. How many tiles are still on the mountain road?',
        contextStory: 'Planning the octagonal roof assembly.',
        options: [
          {
            id: 'a',
            label: '130 tiles remaining',
            isCorrect: true,
            explanation:
              'Spot on! 65% remain, and 0.65 × 200 = 130 tiles.',
          },
          {
            id: 'b',
            label: '70 tiles remaining',
            isCorrect: false,
            explanation:
              '70 tiles is the 35% that already arrived (200 - 70 = 130 remaining).',
          },
          {
            id: 'c',
            label: '165 tiles remaining',
            isCorrect: false,
            explanation:
              '35% of 200 is 70, not 35 (that would be 35% of 100).',
          },
        ],
        xpReward: 100,
      },
      {
        id: 'q-vb-2',
        conceptId: 'concept-percentages',
        conceptName: 'Percentages & proportional reasoning',
        prompt:
          'A rectangular study courtyard measures 12 m by 8 m. Leaving a 1 m stone border inside, what is the area of the central timber deck?',
        contextStory: 'Measuring floor planks for the Knowledge Hall.',
        options: [
          {
            id: 'a',
            label: '60 m² (10 m × 6 m)',
            isCorrect: true,
            explanation:
              'Exact! Subtracting 1 m on all four sides reduces each dimension by 2 m: (12-2) × (8-2) = 10 × 6 = 60 m².',
          },
          {
            id: 'b',
            label: '77 m² (11 m × 7 m)',
            isCorrect: false,
            explanation:
              'Remember a border on both opposite edges subtracts 2 m from width and 2 m from length.',
          },
          {
            id: 'c',
            label: '96 m² (12 m × 8 m)',
            isCorrect: false,
            explanation:
              '96 m² is the entire courtyard including the stone border.',
          },
        ],
        xpReward: 100,
      },
    ],
  },
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'mis-today',
    title: "Today's Mission: Clear Water Check",
    cadence: 'Daily',
    description:
      'Complete a learning challenge in Mountain Spring & Water Safety and restore the Clearwater Filtration Station.',
    xpReward: 150,
    villageBoostPct: 4,
    currentCount: 0,
    targetCount: 1,
    completed: false,
    claimed: false,
    linkedModuleId: 'mod-water-safety',
  },
  {
    id: 'mis-streak',
    title: '7-Day Himalayan Streak',
    cadence: 'Daily',
    description: 'Stay active 7 days in a row to keep the schoolhouse lanterns burning.',
    xpReward: 200,
    villageBoostPct: 3,
    currentCount: 7,
    targetCount: 7,
    completed: true,
    claimed: false,
  },
  {
    id: 'mis-solar',
    title: 'Power the Ridge Microgrid',
    cadence: 'Weekly',
    description: 'Master all 3 circuit diagnostics in Solar Microgrid & Circuits Lab.',
    xpReward: 250,
    villageBoostPct: 6,
    currentCount: 1,
    targetCount: 3,
    completed: false,
    claimed: false,
    linkedModuleId: 'mod-electricity',
  },
  {
    id: 'mis-hall',
    title: 'Raise the Knowledge Hall',
    cadence: 'Milestone',
    description: 'Reach 75% overall Palampur Village Restoration across your learning modules.',
    xpReward: 400,
    villageBoostPct: 8,
    currentCount: 68,
    targetCount: 75,
    completed: false,
    claimed: false,
    linkedModuleId: 'mod-village-budget',
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-quick-learner',
    title: 'Quick Learner',
    description: 'Earned over 1,000 XP through consistent mastery across subjects.',
    criteria: 'Earn 1,000 XP',
    xpBonus: 100,
    unlocked: true,
    unlockedDate: 'Nov 12, 2026',
    tier: 'Gold',
  },
  {
    id: 'ach-village-hero',
    title: 'Village Hero',
    description: 'Completed 10 community restoration challenges across Palampur.',
    criteria: 'Complete 10 missions',
    xpBonus: 150,
    unlocked: true,
    unlockedDate: 'Nov 15, 2026',
    tier: 'Gold',
  },
  {
    id: 'ach-streak-keeper',
    title: 'Lantern Keeper',
    description: 'Maintained a 7-day continuous learning streak without missing a day.',
    criteria: '7-Day Streak',
    xpBonus: 80,
    unlocked: true,
    unlockedDate: 'Nov 17, 2026',
    tier: 'Silver',
  },
  {
    id: 'ach-school-builder',
    title: 'Schoolhouse Architect',
    description: 'Restored Palampur Primary School to 100% completion.',
    criteria: '100% on 1 Building',
    xpBonus: 120,
    unlocked: true,
    unlockedDate: 'Nov 10, 2026',
    tier: 'Silver',
  },
  {
    id: 'ach-hydro-scientist',
    title: 'Clearwater Scientist',
    description: 'Resolve all water-safety misconceptions and bring Clearwater Station to 100%.',
    criteria: 'Restore Water Station',
    xpBonus: 200,
    unlocked: false,
    tier: 'Gold',
  },
  {
    id: 'ach-circuit-master',
    title: 'Microgrid Engineer',
    description: 'Score 100% on the Solar Microgrid & Circuits diagnostic challenge.',
    criteria: 'Master Electricity Lab',
    xpBonus: 200,
    unlocked: false,
    tier: 'Bronze',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-s-1',
    title: "Today's Mission is Ready",
    detail: 'Clearwater Filtration Station is at 72%. One challenge brings it closer to launch.',
    timeAgo: '18m ago',
    unread: true,
    audience: 'student',
    targetTab: 'learn',
  },
  {
    id: 'n-s-2',
    title: '7-Day Streak Reward Available',
    detail: 'Claim your +200 XP Lantern Keeper bonus in Missions.',
    timeAgo: '2h ago',
    unread: true,
    audience: 'student',
    targetTab: 'missions',
  },
  {
    id: 'n-t-1',
    title: 'Water Safety Misconception Spike',
    detail: '13 students in Class 6A believe clear water is automatically safe to drink.',
    timeAgo: '25m ago',
    unread: true,
    audience: 'teacher',
    targetTab: 'recommendations',
  },
  {
    id: 'n-t-2',
    title: '3 Students Need Immediate Support',
    detail: 'Riya Sharma (45%), Arjun Mehta (52%), and Diya Verma (54%) fell below target accuracy.',
    timeAgo: '1h ago',
    unread: true,
    audience: 'teacher',
    targetTab: 'class',
  },
];

function makeRoster30(): StudentRecord[] {
  const specs: Array<{
    name: string;
    overall: number;
    maths: number;
    science: number;
    english: number;
    evs: number;
    xp: number;
    streak: number;
    completion: number;
    active: boolean;
    waterState: 'secure' | 'fragile' | 'misconception' | 'unseen';
    elecState: 'secure' | 'fragile' | 'misconception' | 'unseen';
    fracState: 'secure' | 'fragile' | 'misconception' | 'unseen';
    photoState: 'secure' | 'fragile' | 'misconception' | 'unseen';
  }> = [
    { name: 'Aditya Kumar', overall: 78, maths: 82, science: 76, english: 85, evs: 73, xp: 1250, streak: 7, completion: 86, active: true, waterState: 'fragile', elecState: 'fragile', fracState: 'secure', photoState: 'secure' },
    { name: 'Riya Sharma', overall: 45, maths: 48, science: 41, english: 52, evs: 39, xp: 540, streak: 1, completion: 52, active: true, waterState: 'misconception', elecState: 'misconception', fracState: 'misconception', photoState: 'fragile' },
    { name: 'Arjun Mehta', overall: 52, maths: 55, science: 46, english: 58, evs: 49, xp: 680, streak: 2, completion: 60, active: true, waterState: 'misconception', elecState: 'misconception', fracState: 'fragile', photoState: 'misconception' },
    { name: 'Diya Verma', overall: 54, maths: 51, science: 49, english: 61, evs: 55, xp: 710, streak: 2, completion: 62, active: true, waterState: 'misconception', elecState: 'fragile', fracState: 'misconception', photoState: 'fragile' },
    { name: 'Kabir Thakur', overall: 91, maths: 94, science: 89, english: 92, evs: 89, xp: 1620, streak: 12, completion: 96, active: true, waterState: 'secure', elecState: 'secure', fracState: 'secure', photoState: 'secure' },
    { name: 'Ananya Katoch', overall: 88, maths: 90, science: 85, english: 91, evs: 86, xp: 1510, streak: 10, completion: 94, active: true, waterState: 'secure', elecState: 'secure', fracState: 'secure', photoState: 'secure' },
    { name: 'Vivaan Rana', overall: 84, maths: 88, science: 81, english: 86, evs: 81, xp: 1380, streak: 9, completion: 90, active: true, waterState: 'secure', elecState: 'fragile', fracState: 'secure', photoState: 'secure' },
    { name: 'Meera Chauhan', overall: 82, maths: 80, science: 83, english: 88, evs: 77, xp: 1310, streak: 8, completion: 88, active: true, waterState: 'secure', elecState: 'secure', fracState: 'secure', photoState: 'secure' },
    { name: 'Ishaan Negi', overall: 56, maths: 58, science: 52, english: 62, evs: 52, xp: 740, streak: 1, completion: 64, active: false, waterState: 'misconception', elecState: 'misconception', fracState: 'fragile', photoState: 'unseen' },
    { name: 'Saanvi Dogra', overall: 79, maths: 84, science: 75, english: 83, evs: 74, xp: 1210, streak: 6, completion: 85, active: true, waterState: 'fragile', elecState: 'misconception', fracState: 'secure', photoState: 'secure' },
    { name: 'Rohan Pathania', overall: 75, maths: 79, science: 72, english: 78, evs: 71, xp: 1120, streak: 5, completion: 82, active: true, waterState: 'misconception', elecState: 'fragile', fracState: 'secure', photoState: 'fragile' },
    { name: 'Kavya Sharma', overall: 86, maths: 87, science: 84, english: 90, evs: 83, xp: 1420, streak: 9, completion: 92, active: true, waterState: 'secure', elecState: 'secure', fracState: 'secure', photoState: 'secure' },
    { name: 'Aarav Mahajan', overall: 58, maths: 60, science: 54, english: 63, evs: 55, xp: 760, streak: 2, completion: 66, active: true, waterState: 'misconception', elecState: 'misconception', fracState: 'misconception', photoState: 'fragile' },
    { name: 'Naina Jamwal', overall: 81, maths: 83, science: 78, english: 86, evs: 77, xp: 1260, streak: 7, completion: 87, active: true, waterState: 'secure', elecState: 'fragile', fracState: 'secure', photoState: 'secure' },
    { name: 'Devansh Parmar', overall: 74, maths: 77, science: 70, english: 79, evs: 70, xp: 1090, streak: 4, completion: 81, active: true, waterState: 'misconception', elecState: 'misconception', fracState: 'fragile', photoState: 'secure' },
    { name: 'Tanya Guleria', overall: 89, maths: 91, science: 88, english: 93, evs: 84, xp: 1540, streak: 11, completion: 95, active: true, waterState: 'secure', elecState: 'secure', fracState: 'secure', photoState: 'secure' },
    { name: 'Pranav Sood', overall: 71, maths: 75, science: 68, english: 74, evs: 67, xp: 1010, streak: 4, completion: 79, active: true, waterState: 'misconception', elecState: 'misconception', fracState: 'fragile', photoState: 'fragile' },
    { name: 'Zoya Khan', overall: 83, maths: 85, science: 80, english: 89, evs: 78, xp: 1340, streak: 8, completion: 89, active: true, waterState: 'secure', elecState: 'fragile', fracState: 'secure', photoState: 'secure' },
    { name: 'Kunal Banyal', overall: 57, maths: 59, science: 53, english: 61, evs: 55, xp: 750, streak: 0, completion: 61, active: false, waterState: 'misconception', elecState: 'unseen', fracState: 'misconception', photoState: 'unseen' },
    { name: 'Ira Bhardwaj', overall: 85, maths: 86, science: 84, english: 90, evs: 80, xp: 1390, streak: 9, completion: 91, active: true, waterState: 'fragile', elecState: 'secure', fracState: 'secure', photoState: 'secure' },
    { name: 'Reyansh Kapoor', overall: 73, maths: 76, science: 69, english: 77, evs: 70, xp: 1040, streak: 5, completion: 80, active: true, waterState: 'misconception', elecState: 'misconception', fracState: 'fragile', photoState: 'secure' },
    { name: 'Myra Awasthi', overall: 80, maths: 82, science: 79, english: 84, evs: 75, xp: 1220, streak: 6, completion: 86, active: true, waterState: 'fragile', elecState: 'unseen', fracState: 'secure', photoState: 'secure' },
    { name: 'Siddharth Raina', overall: 76, maths: 80, science: 71, english: 81, evs: 72, xp: 1140, streak: 5, completion: 83, active: true, waterState: 'misconception', elecState: 'misconception', fracState: 'secure', photoState: 'fragile' },
    { name: 'Pari Thakur', overall: 87, maths: 89, science: 85, english: 91, evs: 83, xp: 1460, streak: 10, completion: 93, active: true, waterState: 'fragile', elecState: 'unseen', fracState: 'secure', photoState: 'secure' },
    { name: 'Nikhil Verma', overall: 72, maths: 75, science: 67, english: 76, evs: 70, xp: 990, streak: 4, completion: 78, active: true, waterState: 'misconception', elecState: 'misconception', fracState: 'misconception', photoState: 'fragile' },
    { name: 'Avni Sen', overall: 79, maths: 81, science: 76, english: 84, evs: 75, xp: 1190, streak: 6, completion: 85, active: true, waterState: 'fragile', elecState: 'unseen', fracState: 'secure', photoState: 'secure' },
    { name: 'Harshil Puri', overall: 70, maths: 74, science: 65, english: 75, evs: 66, xp: 960, streak: 3, completion: 77, active: true, waterState: 'misconception', elecState: 'misconception', fracState: 'misconception', photoState: 'misconception' },
    { name: 'Gauri Kashyap', overall: 84, maths: 86, science: 82, english: 88, evs: 80, xp: 1360, streak: 8, completion: 90, active: true, waterState: 'unseen', elecState: 'unseen', fracState: 'secure', photoState: 'secure' },
    { name: 'Yashwardhan Gill', overall: 75, maths: 78, science: 71, english: 80, evs: 71, xp: 1100, streak: 5, completion: 82, active: true, waterState: 'unseen', elecState: 'unseen', fracState: 'fragile', photoState: 'fragile' },
    { name: 'Tanvi Jaswal', overall: 77, maths: 80, science: 74, english: 82, evs: 72, xp: 1170, streak: 6, completion: 84, active: true, waterState: 'unseen', elecState: 'unseen', fracState: 'fragile', photoState: 'unseen' },
  ];

  return specs.map((s, idx) => {
    const status: StudentRecord['status'] =
      s.overall < 60 ? 'Needs Attention' : s.overall < 74 ? 'Fragile' : 'On Track';
    const misconceptions: string[] = [];
    if (s.waterState === 'misconception') misconceptions.push('Clear water is safe to drink');
    if (s.elecState === 'misconception') misconceptions.push('Current gets used up in the wire');
    if (s.fracState === 'misconception') misconceptions.push('Larger denominator means larger fraction');
    if (s.photoState === 'misconception') misconceptions.push('Plants absorb all food from soil');

    const base = s.overall;
    return {
      id: `stu-${idx + 1}`,
      name: s.name,
      rollNo: `PLM-${String(idx + 101)}`,
      avatarVariant: idx % 6,
      level: Math.max(1, Math.floor(s.xp / 160)),
      xp: s.xp,
      streakDays: s.streak,
      overallScore: s.overall,
      weeklyDelta: s.overall >= 75 ? 8 : s.overall >= 60 ? 3 : -4,
      completionRate: s.completion,
      activeThisWeek: s.active,
      status,
      subjects: {
        Maths: s.maths,
        Science: s.science,
        English: s.english,
        EVS: s.evs,
      },
      modulesCompleted: Math.round((s.completion / 100) * 6),
      totalModules: 6,
      conceptStates: {
        'concept-water-safety': s.waterState,
        'concept-electricity': s.elecState,
        'concept-fractions': s.fracState,
        'concept-photosynthesis': s.photoState,
      },
      activeMisconceptions: misconceptions,
      weeklySeries: [
        Math.max(30, base - 10),
        Math.max(32, base - 7),
        Math.max(35, base - 5),
        Math.max(35, base - 4),
        Math.max(38, base - 2),
        Math.max(40, base + 2),
        base,
      ],
      monthlySeries: [
        Math.max(30, base - 16),
        Math.max(35, base - 10),
        Math.max(38, base - 4),
        Math.min(98, base + 4),
        base,
      ],
      badgesUnlocked:
        s.xp >= 1000
          ? ['ach-quick-learner', 'ach-village-hero', 'ach-streak-keeper']
          : ['ach-school-builder'],
      recentActivity: [
        {
          id: `act-${idx}-1`,
          title: 'Harvest Ratios & Granary Fractions',
          subject: 'Maths',
          scorePct: s.maths,
          xpEarned: 70,
          timestamp: 'Today, 9:40 AM',
        },
        {
          id: `act-${idx}-2`,
          title: 'Mountain Spring & Water Safety',
          subject: 'Science',
          scorePct: s.science,
          xpEarned: 50,
          timestamp: 'Yesterday, 4:15 PM',
        },
        {
          id: `act-${idx}-3`,
          title: 'Voices of Palampur: Reading & Craft',
          subject: 'English',
          scorePct: s.english,
          xpEarned: 110,
          timestamp: '2 days ago',
        },
      ],
      teacherNote:
        status === 'Needs Attention'
          ? 'Schedule 15-min hands-on visual demo before next unit.'
          : undefined,
    };
  });
}

export function buildConceptInsights(students: StudentRecord[]): ConceptInsight[] {
  const defs = [
    {
      id: 'concept-water-safety',
      conceptTitle: 'Clear water is safe to drink',
      misconceptionStatement: 'Clear water is safe to drink',
      domain: 'Water Safety',
      subject: 'Science' as const,
      severity: 'High' as const,
      scientificModel:
        'Visual clarity only measures suspended sediment; invisible bacteria, viruses, and dissolved toxins require boiling, UV, or membrane disinfection.',
      studentMentalModel:
        'Students equate transparency and absence of odor with chemical and biological purity.',
      suggestedClassroomActivity:
        '12-min Microscope Drop Investigation: Compare clear pond water, boiled spring water, and muddy water under a foldscope to reveal living microbes in clear samples.',
      recommendedNextAction: 'Run Clearwater Lab Simulation with Class',
      activityDurationMin: 12,
      linkedModuleId: 'mod-water-safety',
    },
    {
      id: 'concept-electricity',
      conceptTitle: 'Current gets used up in the wire',
      misconceptionStatement: 'Current gets used up in the wire',
      domain: 'Electricity',
      subject: 'Science' as const,
      severity: 'High' as const,
      scientificModel:
        'Electric charge is conserved around a closed series loop; current entering and leaving a bulb is identical while electrical energy converts into light and heat.',
      studentMentalModel:
        'Students imagine electricity as fuel flowing one-way out of a battery and getting consumed inside the glowing bulb.',
      suggestedClassroomActivity:
        '15-min Dual-Ammeter Rope Loop: Place two student ammeter readers before and after a solar lantern to observe identical current readings.',
      recommendedNextAction: 'Assign Solar Microgrid Circuit Check',
      activityDurationMin: 15,
      linkedModuleId: 'mod-electricity',
    },
    {
      id: 'concept-fractions',
      conceptTitle: 'Larger denominator means larger fraction',
      misconceptionStatement: 'Larger denominator means larger fraction',
      domain: 'Fractions & Ratios',
      subject: 'Maths' as const,
      severity: 'Medium' as const,
      scientificModel:
        'The denominator indicates how many equal parts a whole is divided into; more parts mean smaller individual pieces when numerators match.',
      studentMentalModel:
        'Students apply whole-number magnitude directly to denominators (thinking 3/8 > 3/4 because 8 > 4).',
      suggestedClassroomActivity:
        '10-min Granary Sack Folding: Fold equal paper strips into fourths and eighths side-by-side to visually align 3/4 = 6/8.',
      recommendedNextAction: 'Launch Granary Harvest Fraction Drill',
      activityDurationMin: 10,
      linkedModuleId: 'mod-fractions-harvest',
    },
    {
      id: 'concept-photosynthesis',
      conceptTitle: 'Plants absorb all food from soil',
      misconceptionStatement: 'Plants absorb all food from soil',
      domain: 'Plant Ecology',
      subject: 'EVS' as const,
      severity: 'Low' as const,
      scientificModel:
        'Plants synthesize glucose inside chloroplasts using atmospheric CO2, water, and sunlight; soil provides water and mineral ions only.',
      studentMentalModel:
        'Students analogize plant roots to animal mouths eating rich soil as food.',
      suggestedClassroomActivity:
        '10-min Van Helmont Willow Thought Experiment: Weigh dry soil before and after sapling growth to show mass comes from air and water.',
      recommendedNextAction: 'Assign Eco-Conservatory Terrace Case',
      activityDurationMin: 10,
      linkedModuleId: 'mod-terrace-ecology',
    },
  ];

  return defs.map((d) => {
    let holdIdeaCount = 0;
    let fragileCount = 0;
    let secureCount = 0;
    let notSeenCount = 0;
    const affectedStudentIds: string[] = [];

    for (const st of students) {
      const state = st.conceptStates[d.id] ?? 'unseen';
      if (state === 'misconception') {
        holdIdeaCount += 1;
        affectedStudentIds.push(st.id);
      } else if (state === 'fragile') {
        fragileCount += 1;
      } else if (state === 'secure') {
        secureCount += 1;
      } else {
        notSeenCount += 1;
      }
    }

    const total = Math.max(1, students.length);
    const confidenceScore = Math.round(((secureCount + fragileCount * 0.5) / total) * 100);
    // Preserves explicit unsure callouts from original diagnostic engine
    const unsureCount =
      d.id === 'concept-water-safety'
        ? Math.max(9, fragileCount + notSeenCount)
        : d.id === 'concept-electricity'
          ? Math.max(5, fragileCount)
          : fragileCount;

    return {
      ...d,
      holdIdeaCount,
      fragileCount,
      secureCount,
      notSeenCount,
      unsureCount,
      confidenceScore,
      affectedStudentIds,
    };
  });
}

const class6AStudents = makeRoster30();

export const CLASS_6A_DATASET: ClassDataset = {
  id: 'class-6a',
  label: 'Class 6A — Palampur',
  schoolName: 'Palampur Model School',
  gradeLabel: 'Grade 6 · Section A',
  teacherName: 'Mrs. Sharma',
  villageProgressPct: 68,
  classConfidencePct: 78,
  classConfidenceDelta: 12,
  students: class6AStudents,
  conceptInsights: buildConceptInsights(class6AStudents),
  assignments: [
    {
      id: 'asg-1',
      title: 'Water Safety & Spring Disinfection',
      subject: 'Science',
      conceptFocus: 'Clear water is safe to drink',
      dueDate: 'Nov 19, 2026',
      assignedTo: 'All Class 6A (30)',
      submittedCount: 27,
      totalCount: 30,
      averageScore: 76,
      status: 'Active',
    },
    {
      id: 'asg-2',
      title: 'Series vs Parallel Village Microgrid',
      subject: 'Science',
      conceptFocus: 'Current gets used up in the wire',
      dueDate: 'Nov 21, 2026',
      assignedTo: 'All Class 6A (30)',
      submittedCount: 22,
      totalCount: 30,
      averageScore: 71,
      status: 'Active',
    },
    {
      id: 'asg-3',
      title: 'Granary Harvest Fraction Comparison',
      subject: 'Maths',
      conceptFocus: 'Larger denominator means larger fraction',
      dueDate: 'Nov 16, 2026',
      assignedTo: 'All Class 6A (30)',
      submittedCount: 29,
      totalCount: 30,
      averageScore: 82,
      status: 'Completed',
    },
    {
      id: 'asg-4',
      title: 'Palampur Bulletin & Reading Inference',
      subject: 'English',
      conceptFocus: 'Evidence-based reading inference',
      dueDate: 'Nov 14, 2026',
      assignedTo: 'All Class 6A (30)',
      submittedCount: 30,
      totalCount: 30,
      averageScore: 85,
      status: 'Completed',
    },
  ],
};

// Sample Class dataset for the "Show Sample Class" toggle in Teaching Recommendations & Top Bar
const sampleStudents = class6AStudents.slice(0, 24).map((s, idx) => ({
  ...s,
  id: `sample-${idx + 1}`,
  rollNo: `SMP-${idx + 201}`,
  overallScore: Math.min(96, s.overallScore + (idx % 3 === 0 ? 5 : -2)),
  subjects: {
    Maths: Math.min(97, s.subjects.Maths + 4),
    Science: Math.min(95, s.subjects.Science + 3),
    English: Math.min(98, s.subjects.English + 2),
    EVS: Math.min(94, s.subjects.EVS + 5),
  },
}));

export const SAMPLE_CLASS_DATASET: ClassDataset = {
  id: 'sample-class',
  label: 'Sample Class (Kangra Valley)',
  schoolName: 'Kangra Valley Demo Cohort',
  gradeLabel: 'Grade 6 · Pilot Cohort',
  teacherName: 'Mrs. Sharma',
  villageProgressPct: 74,
  classConfidencePct: 83,
  classConfidenceDelta: 15,
  students: sampleStudents,
  conceptInsights: buildConceptInsights(sampleStudents),
  assignments: [
    {
      id: 'asg-smp-1',
      title: 'Pilot Water Filtration Challenge',
      subject: 'Science',
      conceptFocus: 'Clear water is safe to drink',
      dueDate: 'Nov 20, 2026',
      assignedTo: 'Pilot Cohort (24)',
      submittedCount: 22,
      totalCount: 24,
      averageScore: 81,
      status: 'Active',
    },
    {
      id: 'asg-smp-2',
      title: 'Terrace Slope Soil Retention',
      subject: 'EVS',
      conceptFocus: 'Plants absorb all food from soil',
      dueDate: 'Nov 23, 2026',
      assignedTo: 'Pilot Cohort (24)',
      submittedCount: 19,
      totalCount: 24,
      averageScore: 79,
      status: 'Active',
    },
  ],
};
