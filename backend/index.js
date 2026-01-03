import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ensure this path matches your actual db file (db.js vs index.js)
import { db } from "./db/db.js"; 

import authRouter from "./routes/auth.js";
import bookingRouter from "./routes/booking.routes.js";
import eventsRouter from "./routes/events.js";
import { syncEventsFromBlockchain } from "./services/syncEvents.js"; // <--- IMPORT SYNC

dotenv.config();

const PORT = 5050;
const app = express();

/* ---------- MIDDLEWARE ---------- */
// Allow frontend (localhost:3000) specifically
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRouter);

// FIX: Changed to singular '/api/booking' to match Frontend Fetch call
app.use("/api/booking", bookingRouter); 

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
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // --- SYNC ON STARTUP ---
  // This populates your Postgres 'events' table from the Blockchain
  await syncEventsFromBlockchain(); 
});