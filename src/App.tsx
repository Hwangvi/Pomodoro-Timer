import { useState, useEffect } from 'react'; 
import { Header } from './components/Header';
import { TimerDisplay } from './components/TimerDisplay'; 
import { CharacterPet } from './components/CharacterPet';
import { MikuPet } from './components/mikuPet'; 
import { TaskList } from './components/TaskList';

export default function App() {
  const [isCuteMode, setIsCuteMode] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const stopImages = [
      '/bunnyStop/stop_bunny_1.png',
      '/bunnyStop/stop_bunny_2.png',
      '/bunnyStop/stop_bunny_3.png'
    ];

    stopImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []); 

  const toggleTheme = () => setIsCuteMode(!isCuteMode);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 ${isCuteMode ? 'bg-pink-100' : 'bg-orange-50'}`}>
      <Header toggleTheme={toggleTheme} isCuteMode={isCuteMode} />
      
      <main className="grow flex flex-row w-full pt-16 px-4 items-start">
        
        <div className="flex-1 flex justify-center mt-24 pb-8">
          <MikuPet isActive={isActive} />
        </div>

        <div className="flex-2 flex flex-col items-center">
          <TimerDisplay 
            isCuteMode={isCuteMode} 
            isActive={isActive} 
            setIsActive={setIsActive} 
          />
          <CharacterPet 
            isCuteMode={isCuteMode} 
            isActive={isActive} 
          />
        </div>

        <div className="flex-1">
          <TaskList isCuteMode={isCuteMode} />
        </div>
        
      </main>
    </div>
  );
}