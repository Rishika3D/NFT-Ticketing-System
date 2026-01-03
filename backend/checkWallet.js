import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
console.log("---------------------------------------------------");
console.log("💰 SERVER WALLET ADDRESS:", wallet.address);
console.log("---------------------------------------------------");