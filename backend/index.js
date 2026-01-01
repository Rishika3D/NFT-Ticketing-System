import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { db } from "./db/db.js";
import authRouter from "./routes/auth.js";
import bookingRouter from "./routes/booking.routes.js";
import eventsRouter from "./routes/events.js";

dotenv.config();

const PORT = 5050;
const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/events", eventsRouter);


/* ---------- HEALTH ---------- */
app.get("/health/db", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT current_database() AS db, current_user AS user"
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- SERVER ---------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
