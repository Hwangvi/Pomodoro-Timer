import { THEMES, type ThemeKey } from '../constants';

interface FooterProps {
  theme: ThemeKey;
}

export const Footer = ({ theme }: FooterProps) => {
  const config = THEMES[theme];

  return (
    <footer className={`w-full text-center py-8 mt-auto border-t ${config.border} ${config.bg}`}>
      <p className={`text-sm font-medium ${config.text} opacity-70`}>
        © {new Date().getFullYear()} Pomodoro Timer | Desarrollado por HwangVi con React, Vite & Tailwindcss
      </p>
    </footer>
  );
};