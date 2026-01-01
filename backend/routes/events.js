import express from "express";
import { db } from "../db/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM events ORDER BY id ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;
