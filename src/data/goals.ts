export interface FastingGoal {
  id: string;
  title: string;
  description: string;
  iconName: 'repeat' | 'activity' | 'lightbulb' | 'calendar' | 'sliders';
}

export const FASTING_GOALS: FastingGoal[] = [
  {
    id: 'habit',
    title: 'Build a consistent habit',
    description: 'Establish a regular fasting routine that fits your lifestyle effortlessly.',
    iconName: 'repeat',
  },
  {
    id: 'health',
    title: 'Track for health',
    description: 'Monitor metrics like autophagy, fat burn, and overall well-being.',
    iconName: 'activity',
  },
  {
    id: 'routine',
    title: 'Improve daily routine',
    description: 'Gain more energy, focus, and clarity throughout your day.',
    iconName: 'lightbulb',
  },
  {
    id: 'maintain',
    title: 'Maintain schedule',
    description: 'I already fast, I just need a precise tool to track my existing windows.',
    iconName: 'calendar',
  },
  {
    id: 'custom',
    title: 'Set a personal goal',
    description: 'Define custom parameters and objectives unique to your needs.',
    iconName: 'sliders',
  },
];
