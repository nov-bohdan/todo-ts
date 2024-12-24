import { FormEvent, useState } from "react";
import { Task } from "../../../shared/types";

type TaskModalProps = {
  task: Task;
  updateTask: (task: Task) => void;
};

export default function TaskModal({ task, updateTask }: TaskModalProps) {
  const [taskData, setTaskData] = useState<Task>(task);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateTask(taskData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setTaskData((oldData) => ({
      ...oldData,
      [field]: e.target.value,
    }));
  };

  return (
    <div>
      <hr />
      <h3>Updating task {task.title}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={(e) => handleChange(e, "title")}
        ></input>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={(e) => handleChange(e, "description")}
        ></input>
        <button type="submit">Save</button>
      </form>
      <hr />
    </div>
  );
}
