require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "./src/Backend/artifacts",
    sources: "./src/Backend/contracts",
    cache: "./src/Backend/cache",
    tests: "./src/Backend/test"
  },
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545"
    },
    polygon: {
      url: "https://rpc-mumbai.maticvigil.com/v1/2b5009cfe0dfe8f45a8f6c3083bee90d5c251034",
      accounts: [privateKey]
    },
    hardhat: {
    },
  },
};
