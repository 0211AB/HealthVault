const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");

task("accounts", "Print the list of all Accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (var acc of accounts) {
    const add = await acc.getAddress()
    const bal = await acc.getBalance()
    console.log(add + " : " + bal)
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: process.env.URL,
      accounts: [process.env.ACC1, process.env.ACC2]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};
