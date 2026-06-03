import { useState, useEffect, useRef } from 'react';

interface TimerDisplayProps {
  isCuteMode: boolean;
  isActive: boolean;
  setIsActive: (val: boolean) => void;
}

const MODES = {
  POMODORO: { time: 25 * 60, label: 'POMODORO' },
  SHORT: { time: 0.3 * 60, label: 'SHORT BREAK' },
  LONG: { time: 15 * 60, label: 'LONG BREAK' },
};

export const TimerDisplay = ({ isCuteMode, isActive, setIsActive }: TimerDisplayProps) => {
  const [mode, setMode] = useState<'POMODORO' | 'SHORT' | 'LONG'>('POMODORO');
  const [timeLeft, setTimeLeft] = useState(MODES.POMODORO.time);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false); // Nuevo estado
  const intervalRef = useRef<number | null>(null);

  const startStopSound = useRef(new Audio('/sounds/startStopMiku.mp3'));
  const alarmSound = useRef(new Audio('/sounds/miku-alarm.mp3'));

  const handleModeChange = (m: 'POMODORO' | 'SHORT' | 'LONG') => {
    setMode(m);
    setIsActive(false);
    setIsAlarmPlaying(false); 
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
    setTimeLeft(MODES[m].time);
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            alarmSound.current.play().catch(e => console.error("Error alarma:", e));
            setIsAlarmPlaying(true); 
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isActive, setIsActive]);

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
    <div className={`relative mt-12 p-16 rounded-3xl border-4 shadow-2xl w-full max-w-2xl ${
      isCuteMode ? 'bg-pink-50 border-pink-200' : 'bg-orange-50 border-amber-200'
    }`}>
      <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 flex gap-1">
        {(['POMODORO', 'SHORT', 'LONG'] as const).map((m) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`px-6 py-3 font-['Press_Start_2P'] text-[15px] transition-all border-4 border-b-0 rounded-t-2xl ${
              isCuteMode 
                ? (mode === m ? 'bg-white border-pink-200 text-pink-400' : 'bg-pink-100 border-pink-200 text-pink-300')
                : (mode === m ? 'bg-white border-amber-200 text-amber-500' : 'bg-amber-100 border-amber-200 text-amber-300')
            }`}
          >
            {MODES[m].label}
          </button>
        ))}
      </div>

      <div className={`flex justify-center font-['Press_Start_2P'] text-8xl md:text-[9rem] tracking-tighter mb-12 ${
        isCuteMode ? 'text-pink-400' : 'text-amber-500'
      }`}>
        {formatTime(timeLeft)}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={toggleTimer}
          className={`px-10 py-6 font-['Press_Start_2P'] text-lg transition-all rounded-xl ${
            isActive || isAlarmPlaying ? 'border-b-0 mt-2' : 'border-b-8'
          } ${
            isCuteMode 
              ? (isAlarmPlaying ? 'bg-red-400 text-white border-red-700 hover:bg-red-500' : 'bg-pink-400 text-white border-pink-700 hover:bg-pink-500')
              : (isAlarmPlaying ? 'bg-red-500 text-white border-red-800 hover:bg-red-600' : 'bg-amber-400 text-amber-950 border-amber-700 hover:bg-amber-500')
          }`}
        >
          {isAlarmPlaying ? 'APAGAR ALARMA' : (isActive ? 'PAUSE' : 'START')}
        </button>
      </div>
    </div>
  );
};