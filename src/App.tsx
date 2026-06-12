import { useState } from "react";
import { Header } from "./components/Header";
import { TimerDisplay } from "./components/TimerDisplay";
import { CharacterPet } from "./components/CharacterPet";
import { TaskList } from "./components/TaskList";
import { SettingsModal } from "./components/SettingsModal";
import { Footer } from "./components/Footer";
import { FocusStats } from "./components/FocusStats";
import { THEMES, type ThemeKey } from "./constants";

export default function App() {
  const [theme, setTheme] = useState<ThemeKey>("NEUTRAL");
  const [isActive, setIsActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
<<<<<<< HEAD
  const [times, setTimes] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

=======
  const [times, setTimes] = useState({ pomodoro: 25, shortBreak: 5, longBreak: 15 });
  const [pomodoroCount, setPomodoroCount] = useState(0); 
>>>>>>> a5e1ed4 (mejorar pomodoro)
  const toggleTheme = () => {
    setTheme((prev) => {
      const order: ThemeKey[] = Object.keys(THEMES) as ThemeKey[];
      const currentIndex = order.indexOf(prev);
      return order[(currentIndex + 1) % order.length];
    });
  };

  return (
<<<<<<< HEAD
    <div
      className={`min-h-screen transition-colors duration-500 ${THEMES[theme].bg}`}
    >
      <Header toggleTheme={toggleTheme} theme={theme} />

      <main className="flex flex-col lg:flex-row w-full pt-8 px-4 items-center lg:items-start justify-center gap-8 pb-12">
        
        <div className="w-full max-w-sm lg:w-48 lg:order-first">
          <FocusStats theme={theme} completedPomodoros={completedPomodoros} />
=======
    <div className={`flex flex-col min-h-screen transition-colors duration-500 ${getBgColor()}`}>
      <Header toggleTheme={toggleTheme} theme={theme} pomodoroCount={pomodoroCount} />
      
      <main className="grow flex flex-col lg:flex-row w-full pt-8 px-4 items-center lg:items-start justify-center gap-8 pb-12">
        <div className="flex justify-center mt-25">
          <MikuPet isActive={isActive} />
>>>>>>> a5e1ed4 (mejorar pomodoro)
        </div>

        <div className="flex flex-col items-center w-full max-w-2xl">
          <TimerDisplay
            key={`${times.pomodoro}-${times.shortBreak}-${times.longBreak}-${theme}`}
            theme={theme}
            isActive={isActive}
            setIsActive={setIsActive}
            times={times}
            onOpenSettings={() => setIsSettingsOpen(true)}
<<<<<<< HEAD
            onComplete={() => setCompletedPomodoros((prev) => prev + 1)}
=======
            setPomodoroCount={setPomodoroCount}
>>>>>>> a5e1ed4 (mejorar pomodoro)
          />
          <CharacterPet theme={theme} isActive={isActive} />
        </div>

        <div className="w-full max-w-sm mt-4 lg:mt-0">
          <TaskList theme={theme} />
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          times={times}
          setTimes={setTimes}
          theme={theme}
        />
      </main>
      
      <Footer theme={theme} />
    </div>
  );
}