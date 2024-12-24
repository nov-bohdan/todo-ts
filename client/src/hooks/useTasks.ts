import axios from "axios";
import { useState, useEffect } from "react";
import { Task } from "../../../shared/types";
import { getErrorMessage } from "../utils";

export default function useTasks() {
  const [tasklist, setTasklist] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const createTask = async (taskData: Task) => {
    setError("");
    try {
      const r = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/task`,
        {
          taskData,
        }
      );

      const createdTask: Task = r.data;

      setTasklist((oldTasks) => [...oldTasks, createdTask]);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const updateTask = async (updatedTask: Task) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/task`,
        {
          taskData: updatedTask,
        }
      );
      setTasklist((oldList) =>
        oldList.map((task) =>
          task.id !== updatedTask.id ? task : response.data
        )
      );
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: number) => {
    setLoading(true);
    setError("");
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/task/${taskId}`
      );
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

  return { error, tasklist, createTask, loading, deleteTask, updateTask };
}
