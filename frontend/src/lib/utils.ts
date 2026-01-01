// src/lib/contractUtils.ts

// 1. PASTE YOUR DEPLOYED CONTRACT ADDRESS HERE
export const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere"; 

// 2. THIS IS THE ABI (Interfaces to talk to your Solidity code)
export const CONTRACT_ABI = [
  "function buyTicket(uint256 _eventId) external payable",
  "function events(uint256) view returns (uint256 id, string name, uint256 price, uint256 totalTickets, uint256 sold, address organizer, string metadataURI, bool exists)",
  "event TicketMinted(uint256 indexed eventId, uint256 indexed tokenId, address buyer)"
];