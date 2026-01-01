import { ticketHandler } from "../controllers/booking.controller.js";
import express from "express";

const router= express.Router();

router.post('/book-seats', ticketHandler);

export default router;