import { useState, useEffect } from "react";
import type { Theme } from "../App";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}
interface TaskListProps {
  theme: Theme;
}

export const TaskList = ({ theme }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("my-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const config = {
    CUTE:   { bg: "bg-white", border: "border-pink-200", text: "text-pink-600", btn: "bg-pink-400", btnBorder: "border-pink-700" },
    VERANO: { bg: "bg-white", border: "border-amber-200", text: "text-amber-700", btn: "bg-amber-400", btnBorder: "border-amber-700" },
    BUNNY:  { bg: "bg-orange-100", border: "border-amber-700", text: "text-amber-900", btn: "bg-amber-700", btnBorder: "border-amber-900" },
    DARK:   { bg: "bg-gray-800", border: "border-gray-600", text: "text-gray-300", btn: "bg-gray-700", btnBorder: "border-gray-900" },
    MIKU:   { bg: "bg-white", border: "border-teal-200", text: "text-teal-700", btn: "bg-teal-400", btnBorder: "border-teal-700" },
  }[theme];

  const addTask = () => {
    if (inputValue.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue("");
  };

  return (
    <div className={`p-6 rounded-2xl border-4 w-full ${config.bg} ${config.border}`}>
      <h2 className={`text-xl font-['Press_Start_2P'] text-center mb-6 ${config.text}`}>TAREAS</h2>

      <div className="flex gap-2 mb-6">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          className={`grow p-3 rounded border-2 ${config.border} outline-none font-['Press_Start_2P'] text-xs ${
            theme === "DARK" ? "bg-gray-900 text-white placeholder-gray-400" : "bg-white text-black"
          }`}
          placeholder="¿Qué harás?"
        />
        <button onClick={addTask} className={`px-4 py-3 font-['Press_Start_2P'] text-xs rounded-xl transition-all border-b-8 active:border-b-0 active:mt-2 ${config.btn} ${config.btnBorder} text-white`}>
          OK
        </button>
      </div>

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
        {task.text}
      </span>
    </div>
  ))}
</div>

      {tasks.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setTasks([])}
            className={`px-4 py-3 font-['Press_Start_2P'] text-[10px] rounded-xl transition-all border-b-4 active:border-b-0 active:mt-1 text-white ${config.btn} ${config.btnBorder}`}
          >
            BORRAR TODO
          </button>
        </div>
      )}
    </div>
  );
};