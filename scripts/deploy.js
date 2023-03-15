const { ethers, hardhat } = require("hardhat");





async function main(){

    const provider = new ethers.providers.JsonRpcProvider(url);

    const {deployer} = await ethers.getSigners();  // this is to get the deployer method i guess..


    console.log("Deploying contract with the address : ", deployer.address);

    const weiAmmount = (await deployer.getBalance()).toString();

    console.log("Account balance :", (await ethers.utils.formatEther(weiAmmount)));

    const Token = await ethers.getContractFactory("mozart");
    const token = await Token.deploy();



    console.log( "Token address :",token.address);



}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });