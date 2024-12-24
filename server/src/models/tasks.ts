import { getDbClient } from "./DbClient";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { Task } from "../../../shared/types";

// interface DbTasks {
//   createTask(task: Task): Promise<Task | PostgrestError>;
//   getTask(id: number): Promise<Task | PostgrestError>;
// }

const dbClient: SupabaseClient | null = getDbClient();
if (!dbClient) {
  throw new Error("Failed to initialize database client");
}

export type DeleteTaskResponse = {
  status: number;
  statusText: string;
};

const dbTasks = {
  createTask: async function (
    task: Task
  ): Promise<[Task | null, PostgrestError | null]> {
    const { data, error } = await dbClient
      .from("tasks")
      .insert({
        title: task.title,
        description: task.description,
        completed: task.completed,
      })
      .select();
    if (error) return [null, error];
    const newTask: Task = data[0];
    return [newTask, null];
  },

  getAllTasks: async function (): Promise<
    [Task[] | null, PostgrestError | null]
  > {
    const { data, error } = await dbClient.from("tasks").select();
    if (error) return [null, error];
    const tasklist: Task[] = data;
    return [tasklist, error];
  },

  updateTask: async function (
    task: Task
  ): Promise<[Task | null, PostgrestError | null]> {
    const { data, error } = await dbClient
      .from("tasks")
      .update({
        title: task.title,
        description: task.description,
      })
      .eq("id", task.id)
      .select();

    if (error) return [null, error];
    const updatedTask: Task | null = data[0];
    return [updatedTask, null];
  },

  deleteTask: async function (taskId: string): Promise<DeleteTaskResponse> {
    const response = await dbClient.from("tasks").delete().eq("id", taskId);
    const deleteTaskResponse: DeleteTaskResponse = response;
    return deleteTaskResponse;
  },
};

export default dbTasks;
