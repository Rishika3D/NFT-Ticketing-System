import express from "express";
import { db } from "../db/db.js";

const router = express.Router();

// GET /api/events
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM events ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// GET /api/events/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM events WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

export default router;