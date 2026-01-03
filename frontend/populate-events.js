// populate-events.js
const { ethers } = require('ethers');

// Your contract details
const CONTRACT_ADDRESS = "0x5E3D1C4a40A0039CB69035604f8CE50FA470a780";

const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "uint256", "name": "_price", "type": "uint256" },
      { "internalType": "uint256", "name": "_totalTickets", "type": "uint256" },
      { "internalType": "string", "name": "_metadataURI", "type": "string" }
    ],
    "name": "createEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "events",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "uint256", "name": "price", "type": "uint256" },
      { "internalType": "uint256", "name": "totalTickets", "type": "uint256" },
      { "internalType": "uint256", "name": "sold", "type": "uint256" },
      { "internalType": "address payable", "name": "organizer", "type": "address" },
      { "internalType": "string", "name": "metadataURI", "type": "string" },
      { "internalType": "bool", "name": "exists", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextEventId",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Events to create (matching your frontend EVENTS_DATA)
const EVENTS_TO_CREATE = [
  {
    name: "Ethereal Sounds Festival",
    price: "0.5", // ETH
    totalTickets: 3000,
    metadataURI: "ipfs://QmEventMetadata1"
  },
  {
    name: "Neon Nights Electric",
    price: "0.35",
    totalTickets: 2000,
    metadataURI: "ipfs://QmEventMetadata2"
  },
  {
    name: "Urban Beats Showcase",
    price: "0.25",
    totalTickets: 1500,
    metadataURI: "ipfs://QmEventMetadata3"
  },
  {
    name: "Sunset Groove Sessions",
    price: "0.4",
    totalTickets: 2500,
    metadataURI: "ipfs://QmEventMetadata4"
  },
  {
    name: "Midnight Frequencies",
    price: "0.6",
    totalTickets: 1000,
    metadataURI: "ipfs://QmEventMetadata5"
  },
  {
    name: "Electro Fusion Experience",
    price: "0.45",
    totalTickets: 1800,
    metadataURI: "ipfs://QmEventMetadata6"
  }
];

async function main() {
  // Get private key from environment variable
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const SEPOLIA_RPC = process.env.SEPOLIA_RPC || "https://rpc.sepolia.org";

  if (!PRIVATE_KEY) {
    console.error("❌ Please set your PRIVATE_KEY environment variable");
    console.log("Example: export PRIVATE_KEY=0x...");
    process.exit(1);
  }

  const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

  console.log("🔗 Connected to Sepolia");
  console.log("📍 Contract:", CONTRACT_ADDRESS);
  console.log("👤 Wallet:", wallet.address);

  // Check balance
  const balance = await provider.getBalance(wallet.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "ETH\n");

  if (balance < ethers.parseEther("0.1")) {
    console.log("⚠️  Low balance! Get testnet ETH from https://sepoliafaucet.com\n");
  }

  // Check if you're the contract owner
  try {
    const contractOwner = await contract.owner();
    if (contractOwner.toLowerCase() !== wallet.address.toLowerCase()) {
      console.error("❌ You are not the contract owner!");
      console.log("Contract owner:", contractOwner);
      console.log("Your address:", wallet.address);
      console.log("\n💡 Only the contract owner can create events.");
      process.exit(1);
    }
  } catch (err) {
    console.log("⚠️  Could not verify ownership (contract might not have owner() function)");
  }

  // Create each event
  for (let i = 0; i < EVENTS_TO_CREATE.length; i++) {
    const event = EVENTS_TO_CREATE[i];
    const eventId = i + 1;

    try {
      // Check if event already exists
      try {
        const existingEvent = await contract.events(eventId);
        if (existingEvent.exists) {
          console.log(`✅ Event ${eventId} already exists: ${existingEvent.name}`);
          continue;
        }
      } catch (err) {
        // Event doesn't exist, proceed to create
      }

      console.log(`\n📝 Creating Event ${eventId}...`);
      console.log(`   Name: ${event.name}`);
      console.log(`   Price: ${event.price} ETH`);
      console.log(`   Tickets: ${event.totalTickets}`);

      const priceInWei = ethers.parseEther(event.price);
      
      const tx = await contract.createEvent(
        event.name,
        priceInWei,
        event.totalTickets,
        event.metadataURI
      );

      console.log(`   Transaction: ${tx.hash}`);
      console.log(`   Waiting for confirmation...`);
      
      await tx.wait();
      console.log(`   ✅ Event ${eventId} created successfully!`);

    } catch (error) {
      console.error(`   ❌ Failed to create event ${eventId}:`, error.message);
    }
  }

  console.log("\n✨ All events processed!");
  console.log("🎫 You can now test buying tickets from your frontend");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });