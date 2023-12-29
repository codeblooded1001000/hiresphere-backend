import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {authApp} from './routes/auth.routes'
import { mongoConnection } from "./configs/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use("/api/v1/users", authApp)

app.get("/", (req: Request, res: Response) => {
  res.send("Express & TypeScript Server");
});

mongoConnection();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});