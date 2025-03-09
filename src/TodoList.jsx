import { useState, useEffect } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const handleEdit = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    setEditingTaskId(null);
  };

  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "pending") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className={`todo-container ${darkMode ? "dark-mode" : ""}`}>
      <h2>To-Do List</h2>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode 🔆" : "Dark Mode 🌙"}
      </button>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {filteredTasks.map((task, index) => (
          <li
            key={task.id}
            className={task.completed ? "completed" : ""}
          >
            {editingTaskId === task.id ? (
              <input
                type="text"
                defaultValue={task.text}
                onBlur={(e) => handleEdit(task.id, e.target.value)}
                autoFocus
              />
            ) : (
              <>
                {task.text}
                <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleComplete(task.id)}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
