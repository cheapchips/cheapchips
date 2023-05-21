import { HardhatUserConfig } from "hardhat/config";
import "hardhat-gas-reporter"
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true" ? true : false,
    currency: "USD",
    token: "MATIC",
    gasPriceApi: "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  },
  networks: {
    hardhat: {
      // gas: 2100000,
      gasPrice: 300000000000,
      forking: {
        enabled: process.env.FORK === "true" ? true : false,
        blockNumber: 42981138,
        url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_POLYGON_API_KEY}`
      }
    }
  }
};

export default config;
