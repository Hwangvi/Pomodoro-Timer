import { useState } from 'react';
import { Header } from './components/Header';
import { TimerDisplay } from './components/TimerDisplay';
import { CharacterPet } from './components/CharacterPet';
import { MikuPet } from './components/mikuPet';
import { TaskList } from './components/TaskList';
import { SettingsModal } from './components/SettingsModal';
import { Footer } from './components/Footer';

export type Theme = 'CUTE' | 'VERANO' | 'BUNNY' | 'DARK' | 'MIKU';

export default function App() {
  const [theme, setTheme] = useState<Theme>('CUTE');
  const [isActive, setIsActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [times, setTimes] = useState({ pomodoro: 25, shortBreak: 5, longBreak: 15 });

  const toggleTheme = () => {
    setTheme((prev) => {
      const order: Theme[] = ['CUTE', 'VERANO', 'BUNNY', 'DARK', 'MIKU'];
      const currentIndex = order.indexOf(prev);
      return order[(currentIndex + 1) % order.length];
    });
  };

  const getBgColor = () => {
    switch (theme) {
      case 'CUTE': return 'bg-pink-100';
      case 'VERANO': return 'bg-orange-50';
      case 'BUNNY': return 'bg-stone-100';
      case 'DARK': return 'bg-gray-900';
      case 'MIKU': return 'bg-teal-50';
      default: return 'bg-pink-100';
    }
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 ${getBgColor()}`}>
      <Header toggleTheme={toggleTheme} theme={theme} />
      
      <main className="grow flex flex-col lg:flex-row w-full pt-8 px-4 items-center lg:items-start justify-center gap-8 pb-12">
        <div className="flex justify-center mt-25">
          <MikuPet isActive={isActive} />
        </div>

        <div className="flex flex-col items-center w-full max-w-2xl">
          <TimerDisplay 
            key={`${times.pomodoro}-${times.shortBreak}-${times.longBreak}`}
            theme={theme} 
            isActive={isActive} 
            setIsActive={setIsActive}
            times={times}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
          <CharacterPet theme={theme} isActive={isActive} />
        </div>

        <div className="w-full max-w-sm mt-12">
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