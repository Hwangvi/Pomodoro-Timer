import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HeaderProps {
  toggleTheme: () => void;
  isCuteMode: boolean;
}

export const Header = ({ toggleTheme, isCuteMode }: HeaderProps) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev === 0 ? 1 : 0));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`flex items-center justify-center px-6 py-8 border-b-4 border-dashed ${isCuteMode ? 'border-pink-300' : 'border-amber-300'}`}>
      
      <div className="w-16 mr-12">
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <img src={frame === 0 ? "/miku_header_1.png" : "/miku_header_2.png"} alt="Miku" className="w-14 h-14 pixelated" />
        </motion.div>
      </div>

      <h1 className="font-['Press_Start_2P'] text-2xl md:text-4xl text-pink-500 tracking-tight whitespace-nowrap">
        POMODORO
      </h1>

      <div className="ml-12">
        <button 
          onClick={toggleTheme} 
          className={`px-8 py-5 rounded-xl font-['Press_Start_2P'] text-xs shadow-lg transition-transform hover:scale-105 active:scale-95 ${
            isCuteMode 
              ? 'bg-pink-200 text-pink-700' 
              : 'bg-amber-200 text-amber-900'
          }`}
        >
          STYLE 🎀
        </button>
      </div>
    </header>
  );
};