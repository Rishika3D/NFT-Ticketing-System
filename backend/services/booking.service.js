import { db } from "../db/db.js";

export const bookSeats = async (userId, eventId, seatIds) => {
  // 1. Get Event from Postgres
  const result = await db.query('SELECT * FROM events WHERE id = $1', [eventId]);
  const event = result.rows[0];

  if (!event) {
    throw new Error("Event not found");
  }

  // 2. Availability Check
  const availableSeats = event.total_tickets - event.sold;

  if (availableSeats < (seatIds?.length || 1)) {
    throw new Error("Insufficient tickets available");
  }

  return {
    eventId,
    bookedSeats: seatIds || []
  };
};