import type { Theme } from "../App";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  times: { pomodoro: number; shortBreak: number; longBreak: number };
  setTimes: (times: { pomodoro: number; shortBreak: number; longBreak: number }) => void;
  theme: Theme;
}

export const SettingsModal = ({ isOpen, onClose, times, setTimes, theme }: SettingsModalProps) => {
  if (!isOpen) return null;

  const config = {
    CUTE:   { bg: "bg-white", border: "border-pink-200", text: "text-pink-600", btn: "bg-pink-400", btnBorder: "border-pink-700" },
    VERANO: { bg: "bg-white", border: "border-amber-200", text: "text-amber-700", btn: "bg-amber-400", btnBorder: "border-amber-700" },
    BUNNY:  { bg: "bg-orange-100", border: "border-amber-700", text: "text-amber-900", btn: "bg-amber-700", btnBorder: "border-amber-900" },
    DARK:   { bg: "bg-gray-800", border: "border-gray-600", text: "text-gray-300", btn: "bg-gray-700", btnBorder: "border-gray-900" },
    MIKU:   { bg: "bg-white", border: "border-teal-200", text: "text-teal-700", btn: "bg-teal-400", btnBorder: "border-teal-700" },
  }[theme];

  const labels: Record<string, string> = {
    pomodoro: 'POMODORO',
    shortBreak: 'DESCANSO CORTO',
    longBreak: 'DESCANSO LARGO'
  };

  const handleChange = (key: keyof typeof times, value: string) => {
    if (value === '') {
      setTimes({ ...times, [key]: 0 });
    } else {
      const numValue = parseInt(value);
      if (numValue >= 0) {
        setTimes({ ...times, [key]: numValue });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`p-10 rounded-3xl border-4 w-full max-w-md ${config.bg} ${config.border} ${config.text}`}>
        <h2 className="text-2xl font-['Press_Start_2P'] text-center mb-10">AJUSTES</h2>
        
        <div className="space-y-8 font-['Press_Start_2P'] text-xs md:text-sm">
          {(['pomodoro', 'shortBreak', 'longBreak'] as const).map((key) => (
            <div key={key} className="flex justify-between items-center gap-4">
              <span className="flex-1">{labels[key]}</span>
              <input 
                type="number" 
                min="1"
                placeholder="-"
                value={times[key] === 0 ? '' : times[key]} 
                onChange={(e) => handleChange(key, e.target.value)}
                className={`w-24 p-4 rounded-xl border-4 text-center text-xl outline-none bg-white text-black ${config.border}`}
              />
            </div>
          ))}
        </div>

        <button 
          onClick={onClose} 
          className={`mt-12 w-full py-5 rounded-2xl text-lg font-bold border-b-8 active:border-b-0 active:mt-13 transition-all text-white ${config.btn} ${config.btnBorder}`}
        >
          GUARDAR
        </button>
      </div>
    </div>
  );
};