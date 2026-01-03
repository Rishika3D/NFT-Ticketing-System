import { db } from "../db/db.js";
import { mintTicket } from "./ticket.mint.js";

export const purchaseTicket = async (userId, eventId, walletAddress) => {
  console.log(`\n🎫 Ticket Service: User ${userId} buying Event ${eventId}`);

  try {
    // Start Transaction
    await db.query('BEGIN');

    // 1. Create Pending Ticket in DB
    const ticketInsert = await db.query(
      `INSERT INTO tickets (user_id, event_id, status, purchase_date)
       VALUES ($1, $2, 'PENDING_MINT', NOW())
       RETURNING id`,
      [userId, eventId]
    );
    const ticketId = ticketInsert.rows[0].id;

    // 2. Call Blockchain (This takes time)
    const mintResult = await mintTicket(walletAddress, eventId);

    // 3. Update DB on Success
    await db.query(
      `UPDATE tickets 
       SET status = 'CONFIRMED', token_id = $1, tx_hash = $2 
       WHERE id = $3`,
      [mintResult.tokenId, mintResult.txHash, ticketId]
    );

    // 4. Update Sold Count
    await db.query(
      `UPDATE events SET sold = sold + 1 WHERE id = $1`,
      [eventId]
    );

    await db.query('COMMIT');

    return { 
      id: ticketId, 
      status: 'CONFIRMED', 
      tokenId: mintResult.tokenId, 
      txHash: mintResult.txHash 
    };

  } catch (error) {
    await db.query('ROLLBACK');
    console.error("   ❌ Purchase Failed, Rolled Back DB.");
    throw new Error(error.message);
  }
};