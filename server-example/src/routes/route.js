import express from "express";
import { getMessage } from "../controllers/Controller.js";

const route = express.Router();
route.get("/", getMessage);

export default route;