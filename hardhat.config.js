const dotenv = require("dotenv");

dotenv.config();

const {API_URL, PRIVATE_KEY} = process.env;





/**
 * @type import('hardhat/config').HardhatUserConfig
 *
 */



module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    goerli: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
