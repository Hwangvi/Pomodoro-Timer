import { THEMES, type ThemeKey } from "../constants";

interface HeaderProps {
  toggleTheme: () => void;
<<<<<<< HEAD
  theme: ThemeKey;
}

export const Header = ({ toggleTheme, theme }: HeaderProps) => {
  const config = THEMES[theme];

  return (
    <header className={`w-full border-b-2 ${config.border} ${config.bg}`}>
      <div className="max-w-4xl mx-auto flex items-center justify-between px-8 py-6">
        
        <h1 className={`text-xl font-bold tracking-tight ${config.text}`}>
          POMODORO TIMER
        </h1>
=======
  theme: Theme;
  pomodoroCount: number;
}

export const Header = ({ toggleTheme, theme, pomodoroCount }: HeaderProps) => {
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
    <header className={`relative flex items-center justify-center px-6 py-8 border-b-4 border-dashed ${config.border}`}>
      
      <div className="w-16 mr-12">
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <img src={frame === 0 ? "/miku_header_1.png" : "/miku_header_2.png"} alt="Miku" className="w-14 h-14 pixelated" />
        </motion.div>
      </div>
>>>>>>> a5e1ed4 (mejorar pomodoro)

        <div className="h-11.5 flex items-center">
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border-b-4 border-black/10 
              ${config.primaryBtn} 
              relative 
              active:top-1 
              active:border-b-0`}
          >
            Cambiar Tema
          </button>
        </div>

      </div>

      <div className={`absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-3 rounded-xl border-2 border-dashed ${config.border} ${config.bg} font-['Press_Start_2P']`}>
        <span className="text-[9px] text-gray-500 mb-1">POMOS</span>
        <span className={`text-base font-bold ${config.text} whitespace-nowrap`}>
          🍅 × {pomodoroCount}
        </span>
      </div>
    </header>
  );
};