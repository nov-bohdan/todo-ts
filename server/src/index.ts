import dotenv from "dotenv";
import express, { Express, Response, Request } from "express";
import cors from "cors";
import todoRouter from "./routes/todo";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api", todoRouter);

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
