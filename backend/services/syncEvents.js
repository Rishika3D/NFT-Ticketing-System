import { db } from "../db/index.js";
import { getAllEvents } from "./blockchain.js";

export async function syncEventsFromBlockchain() {
  const events = await getAllEvents();

  for (const e of events) {
    await db.query(
      `
      INSERT INTO events (
        id, name, price_eth, total_tickets, sold, organizer, metadata_uri
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        price_eth = EXCLUDED.price_eth,
        total_tickets = EXCLUDED.total_tickets,
        sold = EXCLUDED.sold,
        organizer = EXCLUDED.organizer,
        metadata_uri = EXCLUDED.metadata_uri,
        last_synced = NOW()
      `,
      [
        e.id,
        e.name,
        e.price,
        e.totalTickets,
        e.sold,
        e.organizer,
        e.metadataURI
      ]
    );
  }

  console.log("Events synced from blockchain");
}
