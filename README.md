# 🎟️ NFT Event Ticketing System

A decentralized application (dApp) for event ticketing where tickets are minted as NFTs (Non-Fungible Tokens) on the Ethereum blockchain. This ensures authenticity, prevents scalping, and gives users true ownership of their tickets.

## 🚀 Features

* **Create Events:** Organizers can list events with details (date, price, seat limit).
* **Buy Tickets (Mint NFT):** Users purchase tickets using crypto (ETH), which mints a unique NFT to their wallet.
* **Wallet Connection:** Seamless login using MetaMask / WalletConnect.
* **Verification:** Backend validates ownership of the NFT ticket for event entry.
* **Resale Marketplace:** (Optional) Secure secondary market for ticket resale.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS (Styling)
* Ethers.js / Web3.js (Blockchain Interaction)
* Vercel (Deployment)

**Backend:**
* Node.js & Express.js
* PostgreSQL (Database)
* JWT (Authentication)
* Render (Deployment)

**Blockchain:**
* Solidity (Smart Contracts)
* Hardhat (Development Environment)
* Ethereum Sepolia Testnet

---

## 📂 Project Structure

This project is a monorepo organized into three main sections:

```text
├── frontend/       # React client application
├── backend/        # Node.js API server
├── blockchain/     # Smart contracts & Hardhat tests
└── README.md
```

## Environmental Variables

You need to create a .env file in both the frontend and backend directories.

**Backend**

```
PORT=5000
DATABASE_URL=postgres://user:password@hostname:5432/dbname
JWT_SECRET=your_super_secret_key
# Blockchain Keys (If backend handles transactions)
ALCHEMY_API_KEY=your_alchemy_key
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=0x123...
```

**Frontend**

```
VITE_API_URL=http://localhost:5000  # Change to production URL when deploying
VITE_CONTRACT_ADDRESS=0x123...
```

## Getting Started (Local Deployment)

* **Clone the Repository**

```
  https://github.com/Rishika3D/NFT-Ticketing-System
  cd nft-ticketing-system
```
* **Setup Blockchain**

  Compile and deploy the contract to a local node or testnet.

  ```
  cd blockchain
  npm install
  npx hardhat compile
  npx hardhat run scripts/deploy.js --network sepolia
  # ⚠️ Copy the deployed Contract Address to your .env files!
  ```
  
* **Setup Backend**

```
cd ../backend
npm install
# Ensure you created the 'abi' folder and copied TicketSystem.json into it.
npm start
```
*Server runs on http://localhost:5000*

* **Setup Frontend**

```
cd ../frontend
npm install
npm run dev
```
*Client runs on http://localhost:5173*

## 🚀 Deployment Guide

**Backend**

* Create a Web Service on Render.

* Connect your GitHub repo.

* Settings:

  **Root Directory**: (Leave Empty)
  
  **Build Command**: cd backend && npm install
  
  **Start Command**: cd backend && node index.js
  
  **Environment Variables**: Add DATABASE_URL, JWT_SECRET, etc.

**Database (Render PostgreSQL)**

* Create a PostgreSQL instance on Render.

* Copy the Internal Connection String.

* Paste it into the Backend's DATABASE_URL variable.

**Frontend (Vercel)**

* Import the repo to Vercel.

* Root Directory: Select frontend.

* Environment Variables: VITE_API_URL: https://your-backend.onrender.com

* Deploy!


## 📋 License

This project is open-source and available under the MIT License.
