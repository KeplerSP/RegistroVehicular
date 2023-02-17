require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
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
    hardhat: {
    },
  },
};
