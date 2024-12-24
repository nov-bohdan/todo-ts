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
          onChange={(event) =>
            setTaskData((oldData) => {
              const newData = { ...oldData };
              newData.title = event.target.value;
              return newData;
            })
          }
        ></input>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={(event) =>
            setTaskData((oldData) => {
              const newData = { ...oldData };
              newData.description = event.target.value;
              return newData;
            })
          }
        ></input>
        <button type="submit">Save</button>
      </form>
      <hr />
    </div>
  );
}
