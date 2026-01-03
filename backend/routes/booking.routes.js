import express from "express";
import { ticketHandler } from "../controllers/booking.controller.js";

const router = express.Router();

// Matches POST http://localhost:5050/api/booking
router.post("/", ticketHandler);

export default router;