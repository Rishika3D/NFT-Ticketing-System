// blockchain/scripts/deploy_with_events.js
const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting Full Deployment...");

  // 1. Deploy the TicketSystem Contract
  const TicketSystem = await hre.ethers.getContractFactory("TicketSystem");
  const ticketSystem = await TicketSystem.deploy();
  await ticketSystem.waitForDeployment();
  const address = await ticketSystem.getAddress();

  console.log("✅ TicketSystem deployed to:", address);
  console.log("------------------------------------------------");

  // 2. Define your exact frontend data here
  const events = [
    { title: 'Ethereal Sounds Festival', price: '0.5', supply: 2450 },
    { title: 'Web3 Summit 2025', price: '1.2', supply: 5800 },
    { title: 'Neon Nights Gala', price: '0.8', supply: 1200 },
    { title: 'Digital Art Exposition', price: '0.3', supply: 950 },
    { title: 'Electric Dreams Party', price: '0.6', supply: 3500 },
    { title: 'Future of Design', price: '0.4', supply: 1800 }
  ];

  // 3. Loop through and create each event on the blockchain
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    console.log(`Creating Event #${i + 1}: ${event.title}...`);

    const tx = await ticketSystem.createEvent(
      event.title,
      hre.ethers.parseEther(event.price), // Converts '0.5' to Wei
      event.supply,
      `ipfs://metadata-placeholder-${i+1}` // Placeholder metadata
    );
    
    await tx.wait(); // Wait for block confirmation
  }

  console.log("------------------------------------------------");
  console.log("🎉 All 6 Events created successfully!");
  console.log("👉 UPDATE YOUR FRONTEND: src/utils.ts");
  console.log(`export const CONTRACT_ADDRESS = "${address}";`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});