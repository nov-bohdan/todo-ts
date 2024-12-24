import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers";

const todoRouter = express.Router();
todoRouter.post("/task", createTask);
todoRouter.get("/tasks", getAllTasks);
todoRouter.put("/task", updateTask);
todoRouter.delete("/task/:id", deleteTask);

export default todoRouter;
