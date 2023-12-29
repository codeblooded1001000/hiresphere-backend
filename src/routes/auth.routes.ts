import express from "express";
import { login, signUp } from "../controllers/auth.controller";
// import { configDotenv } from "dotenv";

export const authApp = express.Router();

authApp.post("/login", login);

authApp.post("/signUp", signUp);