import { useState, useEffect } from "react";
import { THEMES, type ThemeKey } from "../constants";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  theme: ThemeKey;
}

export const TaskList = ({ theme }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("pomodoro-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const config = THEMES[theme];

  useEffect(() => {
    localStorage.setItem("pomodoro-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!inputValue.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <div
      className={`p-6 rounded-2xl border-2 ${config.border} ${config.bg} shadow-lg w-full`}
    >
      <h2 className={`text-lg font-bold mb-6 ${config.text}`}>Tareas</h2>

      <div className="flex gap-2 mb-6">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className={`grow px-4 py-2 rounded-xl border-2 ${config.border} bg-transparent outline-none ${config.text} placeholder-${config.text.split("-")[1]}-400/50`}
          placeholder="¿Qué tienes pendiente?"
        />
        <button
          onClick={addTask}
          className={`px-4 py-2 rounded-xl font-bold border-b-4 border-black/10 transition-all 
            ${config.primaryBtn} active:border-b-0 active:translate-y-0.5`}
        >
          Añadir
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 group">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5 rounded cursor-pointer accent-teal-500 border-2"
            />
            <span
              className={`text-sm truncate transition-all ${
                task.completed ? "line-through text-gray-500" : config.text
              }`}
            >
              {task.text}
            </span>
          </div>
        ))}
      </div>

      {tasks.length > 0 && (
        <button
          onClick={() => setTasks([])}
          className={`mt-6 w-full py-2 rounded-xl font-bold text-xs transition-all border-b-4 border-black/10 
            ${config.primaryBtn} opacity-70 hover:opacity-100 active:border-b-0 active:translate-y-0.5`}
        >
          Limpiar lista
        </button>
      )}
    </div>
  );
};
