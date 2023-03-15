const { ethers } = require("hardhat");
 //import hardhat and use ethers from it..


const mozart = require("../artifacts/contracts/Mozart.sol/mozart.json");
//save the path to abi in variable called mozart


async function main() {

  const deployer = await ethers.getSigner();
  /*this was quite tricky for me,cost me a day+ to get my head around..
  the getSigner() uses hardhat config that's imported to access the provider url
  and network specified in hardhat and they save it in variable called deployer
  */
   
  console.log(`Deploying contract with the account: ${deployer.address}`);
  //logging on console

  const MozartFactory = await ethers.getContractFactory("mozart");
  //saving the contractfactoery to mozartfactory,contract factory sets the contract for deployment

  const mozart = await MozartFactory.deploy();
  //saving the deployed contract to mozart variable

  console.log(`Contract deployed to address: ${mozart.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
