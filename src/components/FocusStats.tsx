import { THEMES, type ThemeKey } from '../constants';

interface FocusStatsProps {
  theme: ThemeKey;
  completedPomodoros: number;
}

export const FocusStats = ({ theme, completedPomodoros }: FocusStatsProps) => {
  const config = THEMES[theme];
  
  return (
    <div className={`p-6 rounded-2xl border ${config.border} ${config.bg} w-full shadow-sm flex flex-col items-center`}>
      <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${config.text} opacity-70`}>
        Sesiones
      </h3>
      <div className={`text-5xl font-bold ${config.text}`}>
        {completedPomodoros}
      </div>
      <p className={`text-[10px] uppercase mt-2 ${config.text} opacity-50`}>
        Completadas hoy
      </p>
    </div>
  );
};