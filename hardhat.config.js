require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

const {API_URL, PRIVATE_KEY1,FRANKLIN,MICHEAL} = process.env;

module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: API_URL,
      accounts: [PRIVATE_KEY1, FRANKLIN, MICHEAL,]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}