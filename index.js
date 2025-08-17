require("dotenv").config();
const { ethers } = require("ethers");

// Load env
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// ABI minimal untuk mint NFT di testnet
const abi = [
  "function mint(uint256 _amount) public payable"
];

// Provider dan wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

async function main() {
  try {
    console.log("🚀 Mulai minting NFT testnet...");
    const tx = await contract.mint(1, { value: ethers.parseEther("0.001") }); 
    console.log("✅ Tx terkirim:", tx.hash);

    const receipt = await tx.wait();
    console.log("🎉 Mint sukses di blok:", receipt.blockNumber);
  } catch (err) {
    console.error("❌ Error mint:", err);
  }
}

main();
