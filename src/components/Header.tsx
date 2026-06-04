import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Theme } from '../App'; 

interface HeaderProps {
  toggleTheme: () => void;
  theme: Theme;
}

export const Header = ({ toggleTheme, theme }: HeaderProps) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFrame((p) => (p === 0 ? 1 : 0)), 600);
    return () => clearInterval(interval);
  }, []);

  const configMap: Record<Theme, { border: string; bg: string; text: string; label: string }> = {
    CUTE:   { border: 'border-pink-300', bg: 'bg-pink-200', text: 'text-pink-700', label: 'ESTILO FRESA 🍓' },
    VERANO: { border: 'border-amber-300', bg: 'bg-amber-200', text: 'text-amber-900', label: 'ESTILO NARANJA🍊' },
    BUNNY:  { border: 'border-stone-400', bg: 'bg-orange-100', text: 'text-stone-1100', label: 'ESTILO CONEJITO 🐰' },
    DARK:   { border: 'border-gray-700',  bg: 'bg-gray-800',  text: 'text-gray-200', label: 'ESTILO NOCTURNO 🌙' },
    MIKU:   { border: 'border-teal-300',  bg: 'bg-teal-200',  text: 'text-teal-900', label: 'ESTILO MIKU 💚' }
  };

  const config = configMap[theme];

  return (
    <header className={`flex items-center justify-center px-6 py-8 border-b-4 border-dashed ${config.border}`}>
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
          className={`px-8 py-5 rounded-xl font-['Press_Start_2P'] text-xs shadow-lg transition-transform hover:scale-105 active:scale-95 ${config.bg} ${config.text}`}
        >
          {config.label}
        </button>
      </div>
    </header>
  );
};