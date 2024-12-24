import { Response, Request } from "express";
import dbTasks from "../models/tasks";
import { Task } from "../../../shared/types";

export async function createTask(req: Request, res: Response): Promise<void> {
  const taskData: Task = req.body.taskData;
  if (!taskData.title) {
    res.status(400).json({ error: "Title is empty" });
    return;
  }
  const [newTask, error] = await dbTasks.createTask(taskData);
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).json(newTask);
}

export async function getAllTasks(req: Request, res: Response): Promise<void> {
  const [tasklist, error] = await dbTasks.getAllTasks();
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).json(tasklist);
}

export async function updateTask(req: Request, res: Response): Promise<void> {
  const taskData: Task = req.body.taskData;
  if (!taskData.title) {
    res.status(400).json({ error: "Title is empty" });
    return;
  }
  const [updatedTask, error] = await dbTasks.updateTask(taskData);
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).json(updatedTask);
}

export async function deleteTask(req: Request, res: Response): Promise<void> {
  const taskId = req.params.id;
  if (!taskId) {
    res.status(400).json({ error: "Provide valid taskId" });
    return;
  }

  const response = await dbTasks.deleteTask(taskId);
  res.status(response.status).send("DELETED");
}
