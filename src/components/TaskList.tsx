import { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  isCuteMode: boolean;
}

export const TaskList = ({ isCuteMode }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className={`p-6 rounded-2xl border-4 mt-15 -translate-x-12 ${isCuteMode ? 'bg-white/50 border-pink-200' : 'bg-white/50 border-amber-200'}`}>
      <h2 className={`text-2xl font-['Press_Start_2P'] text-center mb-6 ${isCuteMode ? 'text-pink-600' : 'text-amber-700'}`}>Tareas pendientes:</h2>
      
      <div className="flex gap-2 mb-6">
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          className="grow p-3 rounded border-2 border-pink-200 outline-none font-['Press_Start_2P'] text-xs"
          placeholder="¿Qué vas a hacer hoy?"
        />
        <button 
          onClick={addTask} 
          className={`px-6 py-3 font-['Press_Start_2P'] text-xs rounded-xl transition-all border-b-8 active:border-b-0 active:mt-2 ${
            isCuteMode 
              ? 'bg-pink-400 text-white border-pink-700 hover:bg-pink-500' 
              : 'bg-amber-400 text-amber-950 border-amber-700 hover:bg-amber-500'
          }`}
        >
          OK
        </button>
      </div>

      <div className="space-y-3 mb-6 font-['Press_Start_2P'] text-sm">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-3">
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="w-5 h-5 cursor-pointer" />
            <span className={`${task.completed ? 'line-through text-gray-400' : ''}`}>{task.text}</span>
          </div>
        ))}
      </div>

      {tasks.length > 0 && (
  <div className="flex justify-center mt-6">
    <button 
      onClick={() => setTasks([])} 
      className={`px-4 py-3 font-['Press_Start_2P'] text-[10px] rounded-xl transition-all border-b-4 active:border-b-0 active:mt-1 ${
        isCuteMode 
          ? 'bg-red-300 text-white border-red-500 hover:bg-red-400' 
          : 'bg-red-300 text-red-950 border-red-600 hover:bg-red-400'
      }`}
    >
      BORRAR TODO
    </button>
  </div>
)}
    </div>
  );
};