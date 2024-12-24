import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import { Task } from "../../shared/types";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import { getErrorMessage } from "./utils";

function App() {
  const [tasklist, setTasklist] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string>("");

  const addNewTask = (newTask: Task) => {
    setTasklist((oldTasks) => [...oldTasks, newTask]);
  };

  const handleEditButton = (taskId: number) => {
    setError("");
    const task = tasklist.find((v) => v.id === taskId);
    if (task) {
      setEditingTask(task);
    }
  };

  const createNewTask = async (taskData: Task) => {
    setError("");
    try {
      const r = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/task`,
        {
          taskData,
        }
      );

      const createdTask: Task = r.data;

      addNewTask(createdTask);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const updateTask = async (updatedTask: Task) => {
    setLoading(true);
    setError("");
    try {
      const data = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/task`,
        {
          taskData: updatedTask,
        }
      );
      console.log(data);
      const newUpdatedTask: Task = data.data;
      setTasklist((oldList) => {
        const newList = oldList.map((task) => {
          if (task.id !== newUpdatedTask.id) return task;
          return newUpdatedTask;
        });
        return newList;
      });
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
      setEditingTask(null);
    }
  };

  const deleteTask = async (taskId: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/task/${taskId}`
      );
      console.log(response);
      setTasklist((oldTasklist) =>
        oldTasklist.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError("");
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/tasks`)
      .then((data) => {
        setTasklist(data.data);
      })
      .catch((error) => {
        setError(getErrorMessage(error));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {error}
      <TaskForm createNewTask={createNewTask} />
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
