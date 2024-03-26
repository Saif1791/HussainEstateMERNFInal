import express from "express";
import { google } from "../controllers/google.controller.js";

const router = express.Router();

router.post("/google", google);

export default router;
