import { useState, useEffect, useRef } from 'react';
import { THEMES, type ThemeKey } from '../constants';

interface TimerDisplayProps {
  theme: ThemeKey;
  isActive: boolean;
  setIsActive: (val: boolean) => void;
  times: { pomodoro: number; shortBreak: number; longBreak: number };
  onOpenSettings: () => void;
  onComplete: () => void;
}

type Mode = 'POMODORO' | 'SHORT' | 'LONG';

export const TimerDisplay = ({ theme, isActive, setIsActive, times, onOpenSettings, onComplete }: TimerDisplayProps) => {
  const [mode, setMode] = useState<Mode>('POMODORO');
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  
  const startStopSound = useRef(new Audio("/sounds/startStop.mp3"));
  const alarmSound = useRef(new Audio("/sounds/alarm.mp3"));

  const isDark = theme === 'DEEP'; 
  const config = THEMES[theme];

  const timeMap: Record<Mode, number> = { 
    POMODORO: times.pomodoro, 
    SHORT: times.shortBreak, 
    LONG: times.longBreak 
  };

  const [timeLeft, setTimeLeft] = useState(timeMap['POMODORO'] * 60);

  const handleModeChange = (newMode: Mode) => {
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
    setIsAlarmPlaying(false);
    
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(timeMap[newMode] * 60);
  };

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          alarmSound.current.play().catch(e => console.error("Error alarma:", e));
          setIsAlarmPlaying(true);
          setIsActive(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, setIsActive, onComplete]);

  const toggleTimer = () => {
    if (isAlarmPlaying) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
      setIsAlarmPlaying(false);
    } else {
      startStopSound.current.currentTime = 0;
      startStopSound.current.play().catch(e => console.error("Error click:", e));
      setIsActive(!isActive);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`p-8 rounded-3xl border-2 ${config.border} ${config.bg} shadow-xl w-full max-w-xl`}>
      <div className="flex justify-between items-center mb-8">
        <div className="flex w-full justify-center gap-2">
          {(['POMODORO', 'SHORT', 'LONG'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-4 py-2 rounded-xl font-bold transition-all border-b-4 
                ${mode === m 
                  ? `${config.primaryBtn} border-black/20 text-white shadow-md` 
                  : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-black/5 text-gray-500'} border-transparent hover:bg-black/10`
                } relative active:top-1 active:border-b-0`}
            >
              {m === 'POMODORO' ? 'Pomodoro' : m === 'SHORT' ? 'Descanso' : 'Largo'}
            </button>
          ))}
        </div>
        
        <button onClick={onOpenSettings} className={`p-2 ml-2 rounded-xl hover:bg-black/10 transition-colors ${config.text}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>

      <div className={`text-8xl font-bold tracking-tight text-center mb-8 ${config.text}`}>
        {formatTime(timeLeft)}
      </div>

      <div className="h-19">
        <button
          onClick={toggleTimer}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all border-b-8 
            ${isAlarmPlaying 
              ? 'bg-red-500 text-white border-red-800' 
              : `${config.primaryBtn} border-black/10 text-white hover:brightness-105`
            } 
            relative active:top-2 active:border-b-0`}
        >
          {isAlarmPlaying ? 'APAGAR' : isActive ? 'PAUSAR' : 'INICIAR'}
        </button>
      </div>
    </div>
  );
};