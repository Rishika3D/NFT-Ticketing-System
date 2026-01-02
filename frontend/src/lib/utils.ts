// src/utils.ts
import { ethers } from 'ethers';

// 👇 UPDATED: This is your real, live contract address on Sepolia
export const CONTRACT_ADDRESS = "0x5E3D1C4a40A0039CB69035604f8CE50FA470a780"; 

export const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_eventId", "type": "uint256" }
        ],
        "name": "buyTicket",
        "outputs": [],
        "stateMutability": "payable",
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
        "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "verifyTicket",
        "outputs": [
            { "internalType": "bool", "name": "", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];