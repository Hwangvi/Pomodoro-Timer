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

<<<<<<< HEAD
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

=======
  const deleteCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const hasCompletedTasks = tasks.some((task) => task.completed);

>>>>>>> a5e1ed4 (mejorar pomodoro)
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

<<<<<<< HEAD
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
=======
      <div className="space-y-3 mb-6 font-['Press_Start_2P'] text-sm">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start gap-3"> 
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => setTasks(tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)))}
              className="w-5 h-5 cursor-pointer mt-1 shrink-0" 
            />
            <span className={`wrap-break-word min-w-0 ${task.completed ? "line-through text-gray-500" : theme === "DARK" ? "text-white" : "text-black"}`}>
>>>>>>> a5e1ed4 (mejorar pomodoro)
              {task.text}
            </span>
          </div>
        ))}
      </div>

      {tasks.length > 0 && (
<<<<<<< HEAD
        <button
          onClick={() => setTasks([])}
          className={`mt-6 w-full py-2 rounded-xl font-bold text-xs transition-all border-b-4 border-black/10 
            ${config.primaryBtn} opacity-70 hover:opacity-100 active:border-b-0 active:translate-y-0.5`}
        >
          Limpiar lista
        </button>
=======
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setTasks([])}
            className={`px-4 py-3 font-['Press_Start_2P'] text-[10px] rounded-xl transition-all border-b-4 active:border-b-0 active:mt-1 text-white ${config.btn} ${config.btnBorder}`}
          >
            BORRAR TODO
          </button>

          {hasCompletedTasks && (
            <button
              onClick={deleteCompletedTasks}
              className={`px-4 py-3 font-['Press_Start_2P'] text-[10px] rounded-xl transition-all border-b-4 active:border-b-0 active:mt-1 text-white ${config.btn} ${config.btnBorder}`}
            >
              BORRAR TACHADAS
            </button>
          )}
        </div>
>>>>>>> a5e1ed4 (mejorar pomodoro)
      )}
    </div>
  );
};
