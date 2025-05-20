import express from "express";
const Router = express.Router();
import { RegisterUser } from "../controllers/UserController.js";

Router.post("/register", RegisterUser);

export default Router;
