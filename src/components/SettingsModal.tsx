import { THEMES, type ThemeKey } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  times: { pomodoro: number; shortBreak: number; longBreak: number };
  setTimes: (times: { pomodoro: number; shortBreak: number; longBreak: number }) => void;
  theme: ThemeKey;
}

export const SettingsModal = ({ isOpen, onClose, times, setTimes, theme }: SettingsModalProps) => {
  if (!isOpen) return null;

  const config = THEMES[theme];

  const labels: Record<keyof typeof times, string> = {
    pomodoro: 'Tiempo Pomodoro (min)',
    shortBreak: 'Descanso Corto (min)',
    longBreak: 'Descanso Largo (min)'
  };

  const handleChange = (key: keyof typeof times, value: string) => {
    const numValue = parseInt(value);
    setTimes({ ...times, [key]: isNaN(numValue) ? 0 : Math.max(0, numValue) });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`p-8 rounded-2xl border ${config.border} ${config.bg} w-full max-w-sm shadow-xl`}>
        <h2 className={`text-xl font-bold mb-8 text-center ${config.text}`}>Configuración</h2>
        
        <div className="space-y-6">
          {(['pomodoro', 'shortBreak', 'longBreak'] as const).map((key) => (
            <div key={key} className="flex justify-between items-center">
              <label className={`text-sm font-medium ${config.text} opacity-80`}>
                {labels[key]}
              </label>
              <input 
                type="number" 
                min="1"
                value={times[key] === 0 ? '' : times[key]} 
                onChange={(e) => handleChange(key, e.target.value)}
                className={`w-20 p-2 rounded-lg border text-center font-mono ${config.border} ${config.bg} ${config.text} focus:ring-2 focus:ring-blue-500 outline-none`}
              />
            </div>
          ))}
        </div>

        <button 
          onClick={onClose} 
          className={`mt-10 w-full py-3 rounded-lg font-semibold transition-all ${config.primaryBtn}`}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
};