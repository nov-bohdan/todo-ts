import { Task } from "../../../shared/types";

type TaskListProps = {
  tasklist: Task[];
  handleEditButton: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
};

export default function TaskList({
  tasklist,
  handleEditButton,
  deleteTask,
}: TaskListProps) {
  return (
    <div>
      {tasklist.map((task: Task) => (
        <div key={task.id}>
          <p>ID: {task.id}</p>
          <p>Title: {task.title}</p>
          <p>Description: {task.description}</p>
          <p>Completed: {task.completed ? 1 : 0}</p>
          <p>Created at: {task.created_at}</p>
          <button onClick={() => handleEditButton(task.id!)}>Edit</button>
          <button onClick={() => deleteTask(task.id!)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
