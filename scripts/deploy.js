// scripts/deploy.js
import { ethers } from "hardhat";

async function main() {
  console.log("Déploiement GasSimulator...");

  const GasSimulator = await ethers.getContractFactory("GasSimulator");
  const contract = await GasSimulator.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  const receipt = await contract.deploymentTransaction().wait();

  const gasUsed = receipt.gasUsed.toString();
  const gasPrice = receipt.gasPrice.toString();

  // Prix ETH en direct
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
  const { ethereum: { usd } } = await res.json();
  const costUSD = (gasUsed * gasPrice * usd) / 1e18;

  console.log("");
  console.log("DÉPLOYÉ !");
  console.log("Adresse :", address);
  console.log("Gas utilisé :", gasUsed);
  console.log(`Coût Mainnet ≈ $${costUSD.toFixed(4)}`);
  console.log(`Coût Sepolia = 0$ (faucet)`);
  console.log("");
  console.log("Copie cette adresse dans le frontend → app/page.tsx");
}

main().catch((e) => {
  console.error("ERREUR :", e.message);
  process.exit(1);
});
