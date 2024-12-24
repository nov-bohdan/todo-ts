import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import { Task } from "../../shared/types";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import useTasks from "./hooks/useTasks";

function App() {
  const { error, tasklist, createTask, loading, deleteTask, updateTask } =
    useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditButton = (taskId: number) => {
    const task = tasklist.find((v) => v.id === taskId);
    if (task) {
      setEditingTask(task);
    }
  };

  useEffect(() => {
    setEditingTask(null);
  }, [tasklist]);

  return (
    <>
      {error && <p>{error}</p>}
      <TaskForm createTask={createTask} />
      {loading && <p>Loading...</p>}
      <TaskList
        tasklist={tasklist}
        handleEditButton={handleEditButton}
        deleteTask={deleteTask}
      />
      {editingTask && <TaskModal task={editingTask} updateTask={updateTask} />}
    </>
  );
}

export default App;
