import { FormEvent, useState } from "react";
import { Task } from "../../../shared/types";

type TaskFormProps = {
  createNewTask: (taskData: Task) => void;
};

function TaskForm({ createNewTask }: TaskFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const taskData: Task = {
      title,
      description,
      completed: false,
    };

    createNewTask(taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></input>

      <button type="submit">Submit</button>
    </form>
  );
}

export default TaskForm;
