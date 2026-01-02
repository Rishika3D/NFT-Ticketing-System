// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Deploying TicketSystem...");

  // 1. Get the contract factory
  const TicketSystem = await hre.ethers.getContractFactory("TicketSystem");

  // 2. Deploy the contract
  const ticketSystem = await TicketSystem.deploy();

  // 3. Wait for it to finish deploying
  await ticketSystem.waitForDeployment();

  const address = await ticketSystem.getAddress();
  console.log("✅ TicketSystem deployed to:", address);

  // ---------------------------------------------------------
  // 👇 CRITICAL STEP FOR YOUR FRONTEND
  // We must create Event #1 immediately, or the frontend will show nothing/crash.
  // ---------------------------------------------------------
  console.log("Creating Event #1...");
  
  // Create an event: Name, Price (0.0001 ETH), Capacity, Metadata
  const tx = await ticketSystem.createEvent(
    "Neon Horizon Festival", 
    hre.ethers.parseEther("0.0001"), 
    100, 
    "ipfs://bafkreidmvq5z5..." 
  );
  
  await tx.wait();
  console.log("✅ Event #1 created successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});