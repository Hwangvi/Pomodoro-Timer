import { THEMES, type ThemeKey } from "../constants";

interface HeaderProps {
  toggleTheme: () => void;
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
    </header>
  );
};