import { useState, useEffect, useRef } from 'react';
import { THEMES, type ThemeKey } from '../constants';

interface TimerDisplayProps {
  theme: ThemeKey;
  isActive: boolean;
  setIsActive: (val: boolean) => void;
  times: { pomodoro: number; shortBreak: number; longBreak: number };
  onOpenSettings: () => void;
<<<<<<< HEAD
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
=======
  setPomodoroCount: React.Dispatch<React.SetStateAction<number>>;
}

export const TimerDisplay = ({
  theme,
  isActive,
  setIsActive,
  times,
  onOpenSettings,
  setPomodoroCount,
}: TimerDisplayProps) => {
  const [mode, setMode] = useState<"POMODORO" | "SHORT" | "LONG">("POMODORO");

  const config = {
    CUTE: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-400", btn: "bg-pink-400", btnBorder: "border-pink-700", activeTab: "bg-white", inactiveTab: "bg-pink-100", textTab: "text-pink-300" },
    VERANO: { bg: "bg-orange-50", border: "border-amber-200", text: "text-amber-500", btn: "bg-amber-400", btnBorder: "border-amber-700", activeTab: "bg-white", inactiveTab: "bg-amber-100", textTab: "text-amber-300" },
    BUNNY: { bg: "bg-orange-100", border: "border-amber-700", text: "text-amber-900", btn: "bg-amber-700", btnBorder: "border-amber-900", activeTab: "bg-orange-50", inactiveTab: "bg-orange-200", textTab: "text-amber-700" },
    DARK: { bg: "bg-gray-800", border: "border-gray-600", text: "text-gray-300", btn: "bg-gray-700", btnBorder: "border-gray-900", activeTab: "bg-gray-700", inactiveTab: "bg-gray-900", textTab: "text-gray-500" },
    MIKU: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600", btn: "bg-teal-400", btnBorder: "border-teal-700", activeTab: "bg-white", inactiveTab: "bg-teal-100", textTab: "text-teal-300" },
  }[theme];

  const getTimeForMode = (m: "POMODORO" | "SHORT" | "LONG") => {
    switch (m) {
      case "POMODORO": return times.pomodoro * 60;
      case "SHORT": return times.shortBreak * 60;
      case "LONG": return times.longBreak * 60;
    }
  };

  const [timeLeft, setTimeLeft] = useState(getTimeForMode("POMODORO"));
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  const hasTriggeredEndRef = useRef(false);

  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const startStopSound = useRef(new Audio("/sounds/startStopMiku.mp3"));
  const alarmSound = useRef(new Audio("/sounds/miku-alarm.mp3"));

  const handleModeChange = (m: "POMODORO" | "SHORT" | "LONG") => {
    setMode(m);
    setIsActive(false);
    setIsAlarmPlaying(false);
    hasTriggeredEndRef.current = false; 
>>>>>>> a5e1ed4 (mejorar pomodoro)
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
    setIsAlarmPlaying(false);
    
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(timeMap[newMode] * 60);
  };

  useEffect(() => {
<<<<<<< HEAD
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
=======
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }

            if (hasTriggeredEndRef.current) return 0;
            hasTriggeredEndRef.current = true;

            alarmSound.current
              .play()
              .catch((e) => console.error("Error alarma:", e));

            if (modeRef.current === "POMODORO") {
              setPomodoroCount((count) => count + 1);
            }

            setIsAlarmPlaying(true);
            setIsActive(false);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, setIsActive, setPomodoroCount]);
>>>>>>> a5e1ed4 (mejorar pomodoro)

  const toggleTimer = () => {
    if (isAlarmPlaying) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
      setIsAlarmPlaying(false);
      hasTriggeredEndRef.current = false; 
    } else {
      startStopSound.current.currentTime = 0;
<<<<<<< HEAD
      startStopSound.current.play().catch(e => console.error("Error click:", e));
=======
      startStopSound.current
        .play()
        .catch((e) => console.error("Error click:", e));
      
      if (!isActive) {
        hasTriggeredEndRef.current = false; 
      }
>>>>>>> a5e1ed4 (mejorar pomodoro)
      setIsActive(!isActive);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
<<<<<<< HEAD
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
=======
    <div className={`relative mt-12 p-16 rounded-3xl border-4 shadow-2xl w-full max-w-2xl ${config.bg} ${config.border}`}>
      <button
        onClick={onOpenSettings}
        className="absolute top-4 right-4 p-2 hover:rotate-180 transition-transform duration-700"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${config.text}`}>
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
        </svg>
      </button>

      <div className="absolute -top-7.5 left-1/2 -translate-x-1/2 flex gap-1">
        {(["POMODORO", "SHORT", "LONG"] as const).map((m) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`px-8 py-3 min-w-32.5 font-['Press_Start_2P'] text-[12px] transition-all border-4 border-b-0 rounded-t-2xl 
            ${mode === m ? `${config.activeTab} ${config.border} ${config.text}` : `${config.inactiveTab} ${config.border} ${config.textTab}`}`}
          >
            {m === "POMODORO" ? "POMODORO" : m === "SHORT" ? "DESCANSO CORTO" : "DESCANSO LARGO"}
          </button>
        ))}
      </div>

      <div className={`flex justify-center font-['Press_Start_2P'] text-8xl md:text-[9rem] tracking-tighter mb-12 ${config.text}`}>
>>>>>>> a5e1ed4 (mejorar pomodoro)
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