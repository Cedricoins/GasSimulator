// hardhat.config.js
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/demo", // gratuit
      accounts: [] // pas besoin de clé
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};

export default config;
