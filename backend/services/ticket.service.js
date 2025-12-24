export const saveTicket = async (userId, eventId, seatIds) => {
    const result = await db.query(
      `
      INSERT INTO tickets (user_id, event_id, seat_ids, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [userId, eventId, seatIds, "BOOKED"]
    );
  
    return result.rows[0];
  };
  