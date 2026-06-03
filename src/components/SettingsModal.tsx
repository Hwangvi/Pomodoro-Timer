interface TimeSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  times: TimeSettings;
  setTimes: (times: TimeSettings) => void;
  isCuteMode: boolean;
}

export const SettingsModal = ({ isOpen, onClose, times, setTimes, isCuteMode }: SettingsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`p-8 rounded-3xl border-4 w-full max-w-sm ${isCuteMode ? 'bg-pink-50 border-pink-300' : 'bg-orange-50 border-amber-300'}`}>
        <h2 className="text-xl font-['Press_Start_2P'] text-center mb-6">Settings</h2>
        <div className="space-y-4 font-['Press_Start_2P'] text-xs">
          {(['pomodoro', 'shortBreak', 'longBreak'] as const).map((type) => (
            <div key={type} className="flex justify-between items-center">
              <label className="capitalize">{type}:</label>
              <input type="number" value={times[type]} onChange={(e) => setTimes({...times, [type]: parseInt(e.target.value) || 0})} className="w-20 p-2 rounded border-2 border-pink-200 text-center" />
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-8 w-full py-3 bg-pink-400 text-white rounded-xl font-bold hover:bg-pink-500 transition-all border-b-4 border-pink-700 active:border-b-0 active:mt-1">
          OK
        </button>
      </div>
    </div>
  );
};