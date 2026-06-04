import { useState, useEffect, useRef } from "react";
import type { Theme } from "../App";

interface TimerDisplayProps {
  theme: Theme;
  isActive: boolean;
  setIsActive: (val: boolean) => void;
  times: { pomodoro: number; shortBreak: number; longBreak: number };
  onOpenSettings: () => void;
}

export const TimerDisplay = ({
  theme,
  isActive,
  setIsActive,
  times,
  onOpenSettings,
}: TimerDisplayProps) => {
  const [mode, setMode] = useState<"POMODORO" | "SHORT" | "LONG">("POMODORO");

  const config = {
    CUTE: {
      bg: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-400",
      btn: "bg-pink-400",
      btnBorder: "border-pink-700",
      activeTab: "bg-white",
      inactiveTab: "bg-pink-100",
      textTab: "text-pink-300",
    },
    VERANO: {
      bg: "bg-orange-50",
      border: "border-amber-200",
      text: "text-amber-500",
      btn: "bg-amber-400",
      btnBorder: "border-amber-700",
      activeTab: "bg-white",
      inactiveTab: "bg-amber-100",
      textTab: "text-amber-300",
    },
    BUNNY: {
      bg: "bg-orange-100",
      border: "border-amber-700",
      text: "text-amber-900",
      btn: "bg-amber-700",
      btnBorder: "border-amber-900",
      activeTab: "bg-orange-50",
      inactiveTab: "bg-orange-200",
      textTab: "text-amber-700",
    },
    DARK: {
      bg: "bg-gray-800",
      border: "border-gray-600",
      text: "text-gray-300",
      btn: "bg-gray-700",
      btnBorder: "border-gray-900",
      activeTab: "bg-gray-700",
      inactiveTab: "bg-gray-900",
      textTab: "text-gray-500",
    },
    MIKU: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-600",
      btn: "bg-teal-400",
      btnBorder: "border-teal-700",
      activeTab: "bg-white",
      inactiveTab: "bg-teal-100",
      textTab: "text-teal-300",
    },
  }[theme];

  const getTimeForMode = (m: "POMODORO" | "SHORT" | "LONG") => {
    switch (m) {
      case "POMODORO":
        return times.pomodoro * 60;
      case "SHORT":
        return times.shortBreak * 60;
      case "LONG":
        return times.longBreak * 60;
    }
  };

  const [timeLeft, setTimeLeft] = useState(getTimeForMode("POMODORO"));
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startStopSound = useRef(new Audio("/sounds/startStopMiku.mp3"));
  const alarmSound = useRef(new Audio("/sounds/miku-alarm.mp3"));

  const handleModeChange = (m: "POMODORO" | "SHORT" | "LONG") => {
    setMode(m);
    setIsActive(false);
    setIsAlarmPlaying(false);
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
    setTimeLeft(getTimeForMode(m));
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            alarmSound.current
              .play()
              .catch((e) => console.error("Error alarma:", e));
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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, setIsActive]);

  const toggleTimer = () => {
    if (isAlarmPlaying) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
      setIsAlarmPlaying(false);
    } else {
      startStopSound.current.currentTime = 0;
      startStopSound.current
        .play()
        .catch((e) => console.error("Error click:", e));
      setIsActive(!isActive);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`relative mt-12 p-16 rounded-3xl border-4 shadow-2xl w-full max-w-2xl ${config.bg} ${config.border}`}
    >
      <button
        onClick={onOpenSettings}
        className="absolute top-4 right-4 p-2 hover:rotate-180 transition-transform duration-700"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`${config.text}`}
        >
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
            {m === "POMODORO"
              ? "POMODORO"
              : m === "SHORT"
                ? "DESCANSO CORTO"
                : "DESCANSO LARGO"}
          </button>
        ))}
      </div>

      <div
        className={`flex justify-center font-['Press_Start_2P'] text-8xl md:text-[9rem] tracking-tighter mb-12 ${config.text}`}
      >
        {formatTime(timeLeft)}
      </div>

      <div className="flex justify-center">
        <button
          onClick={toggleTimer}
          className={`px-10 py-6 font-['Press_Start_2P'] text-lg transition-all rounded-xl ${isActive || isAlarmPlaying ? "border-b-0 mt-2" : "border-b-8"} 
          ${isAlarmPlaying ? "bg-red-500 text-white border-red-800" : `${config.btn} ${theme === "DARK" ? "text-white" : "text-amber-950"} ${config.btnBorder} hover:brightness-110`}`}
        >
          {isAlarmPlaying ? "APAGAR" : isActive ? "PAUSAR" : "EMPEZAR"}
        </button>
      </div>
    </div>
  );
};
