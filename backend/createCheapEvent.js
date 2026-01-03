import { ethers } from "ethers";
import dotenv from "dotenv";
import { createRequire } from "module";

dotenv.config();
const require = createRequire(import.meta.url);

// ✅ FIXED PATH: Only one "../" because we are in the backend folder
// If this still fails, try changing "Ticketing.sol" to "TicketSystem.sol"
const TicketArtifact = require("../blockchain/artifacts/contracts/Ticketing.sol/TicketSystem.json");

const CONTRACT_ADDRESS = "0x5E3D1C4a40A0039CB69035604f8CE50FA470a780"; 
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function createCheapEvent() {
  console.log("🔌 Connecting to Sepolia...");
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketArtifact.abi, wallet);

  console.log("🎟️ Creating 'GitHub Demo' Event (Price: 0.0001 ETH)...");

  // Price is 0.0001 ETH (Very cheap!)
  const tx = await contract.createEvent(
    "GitHub Project Demo",       
    ethers.parseEther("0.0001"), 
    100,                        
    "ipfs://bafkreic...metadata" 
  );
  
  console.log("⏳ Transaction sent... waiting for confirmation...");
  await tx.wait();
  console.log(`✅ Success! Cheap Event Created. Tx: ${tx.hash}`);
}

createCheapEvent().catch((error) => {
  console.error(error);
  process.exit(1);
});