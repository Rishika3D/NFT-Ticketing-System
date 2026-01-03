import { ethers } from "ethers";
import dotenv from "dotenv";
import { createRequire } from "module";

dotenv.config();
const require = createRequire(import.meta.url);

const TicketArtifact = require("../../blockchain/artifacts/contracts/Ticketing.sol/TicketSystem.json");

const CONTRACT_ADDRESS = "0x5E3D1C4a40A0039CB69035604f8CE50FA470a780"; 
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const mintTicket = async (userAddress, eventId) => {
  try {
    if (!RPC_URL || !PRIVATE_KEY) throw new Error("Missing RPC_URL or PRIVATE_KEY");

    // Setup Wallet
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const adminWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketArtifact.abi, adminWallet);

    console.log(`\n🔗 Minting Service: Processing Event ${eventId} for ${userAddress}`);

    // 1. Get Price
    const eventDetails = await contract.events(eventId);
    const price = eventDetails.price;

    // 2. Server Buys Ticket
    console.log(`   Attempting to buy ticket (Price: ${ethers.formatEther(price)} ETH)...`);
    const buyTx = await contract.buyTicket(eventId, { value: price });
    const receipt = await buyTx.wait();

    // 3. Find Token ID from Logs
    let tokenId = null;
    for (const log of receipt.logs) {
        try {
            const parsedLog = contract.interface.parseLog(log);
            if (parsedLog.name === "TicketMinted") {
                tokenId = parsedLog.args[1]; 
                break;
            }
        } catch (e) { continue; }
    }

    if (!tokenId) throw new Error("Token ID not found in transaction logs");
    console.log(`   Minted Token ID: ${tokenId}`);

    // 4. Transfer to User
    console.log(`   Transferring to user...`);
    const transferTx = await contract.transferFrom(adminWallet.address, userAddress, tokenId);
    await transferTx.wait();

    console.log(`   ✅ Success! Tx Hash: ${transferTx.hash}`);

    return {
      success: true,
      txHash: transferTx.hash,
      tokenId: tokenId.toString()
    };

  } catch (error) {
    console.error("❌ Minting Service Error:", error);
    throw new Error(error.reason || error.message || "Blockchain transaction failed");
  }
};