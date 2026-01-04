import { db } from "../db/db.js"; 

import { ethers } from "ethers";
import dotenv from "dotenv";
import { createRequire } from "module";

dotenv.config();
const require = createRequire(import.meta.url);
const TicketArtifact =require('../abi/TicketSystem.json');

const CONTRACT_ADDRESS = "0x5E3D1C4a40A0039CB69035604f8CE50FA470a780";
const RPC_URL = process.env.RPC_URL;

export async function syncEventsFromBlockchain() {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketArtifact.abi, provider);

    const totalEvents = await contract.nextEventId();
    console.log(`Syncing ${totalEvents - 1n} events from blockchain...`);

    for (let i = 1; i < totalEvents; i++) {
      const e = await contract.events(i);
      
      await db.query(
        `INSERT INTO events (id, name, price_eth, total_tickets, sold, organizer, metadata_uri, last_synced)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          price_eth = EXCLUDED.price_eth,
          total_tickets = EXCLUDED.total_tickets,
          sold = EXCLUDED.sold,
          last_synced = NOW()`,
        [i, e.name, ethers.formatEther(e.price), Number(e.totalTickets), Number(e.sold), e.organizer, e.metadataURI]
      );
    }
    console.log("✅ Events synced to Postgres.");
  } catch (error) {
    console.error("Sync Failed:", error);
  }
}