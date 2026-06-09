export type ThemeKey = 'NEUTRAL' | 'DEEP' | 'OCEAN' | 'WARM';

export interface ThemeConfig {
  bg: string;
  border: string;
  text: string;
  primaryBtn: string;
  tabActive: string; 
  tabInactive: string;
}

export const THEMES: Record<ThemeKey, ThemeConfig> = {
  NEUTRAL: {
    bg: 'bg-white',
    border: 'border-slate-200',
    text: 'text-slate-800',
    primaryBtn: 'bg-slate-800 text-white hover:bg-slate-700',
    tabActive: 'bg-slate-100',
    tabInactive: 'bg-transparent',
  },
  DEEP: {
    bg: 'bg-slate-900',
    border: 'border-slate-700',
    text: 'text-slate-100',
    primaryBtn: 'bg-blue-600 text-white hover:bg-blue-500',
    tabActive: 'bg-slate-800',
    tabInactive: 'bg-transparent',
  },
  OCEAN: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-900',
    primaryBtn: 'bg-teal-600 text-white hover:bg-teal-500',
    tabActive: 'bg-teal-100',
    tabInactive: 'bg-transparent',
  },
  WARM: {
    bg: 'bg-orange-50',
    border: 'border-amber-200',
    text: 'text-amber-900',
    primaryBtn: 'bg-amber-600 text-white hover:bg-amber-500',
    tabActive: 'bg-amber-100',
    tabInactive: 'bg-transparent',
  }
};