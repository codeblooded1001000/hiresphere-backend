import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {authApp} from './routes/auth.routes'
import { mongoConnection } from "./configs/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/users", authApp);

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

app.post("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

app.patch("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

app.put("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

app.delete("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

mongoConnection();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});