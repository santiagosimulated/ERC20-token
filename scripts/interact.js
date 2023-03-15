const hre = require("hardhat");

const ethers = hre.ethers;


async function main() {
  // Get the contract and signer
  const Token = await hre.ethers.getContractFactory("mozart");
  const token = await Token.attach("0x08215664c52F9ea125a702F15C650Cf514009923"); // Replace with the deployed contract address
  const [PRIVATE_KEY1, FRANKLIN,MICHEAL] = await hre.ethers.getSigners();

  const owner = PRIVATE_KEY1;
  const addr1 = FRANKLIN;
  const addr2 = MICHEAL;
  

  // Get initial balance of owner
  const initialBalance = await token.balanceOf(owner.address);

  console.log("Owner balance:", initialBalance.toString());

  // Transfer tokens from owner to addr1
  const amount = hre.ethers.utils.parseUnits("100000000", 0); // 100000 tokens
  //await token.transfer(addr1.address, amount);
  //console.log("Transferred", amount.toString(), "tokens from owner to addr1");

  // Get new balances
  const ownerBalanceFormat = await token.balanceOf(owner.address);

  const ownerBalance =await ethers.utils.formatUnits(ownerBalanceFormat, 0);

  const addr1BalanceFormat = await token.balanceOf(addr1.address);

  const addr1Balance =await ethers.utils.formatUnits(addr1BalanceFormat, 0);

  console.log("Owner balance:", ownerBalance.toString());
  console.log("addr1 balance:", addr1Balance.toString());

  // Approve addr2 to spend tokens on behalf of owner
  await token.connect(owner).approval(addr2.address, amount);
  console.log("Approved", addr2.address, "to spend", amount.toString(), "tokens on behalf of owner");

  // Transfer tokens from owner to addr2 using addr2's approval
  await token.connect(addr2).transferFrom(owner.address, addr2.address, amount);
  console.log("Transferred", amount.toString(), "tokens from owner to addr2 using addr2's approval");

  // Get new balances
  const newOwnerBalanceFormat = await token.balanceOf(owner.address);

  const newOwnerBalance = await ethers.utils.formatUnits(newOwnerBalanceFormat, 0);

  const newAddr2BalanceFormat = await token.balanceOf(addr2.address);

  const newAddr2Balance =  await ethers.utils.formatUnits(newAddr2BalanceFormat, 0);

  console.log("Owner balance:", newOwnerBalance.toString());
  console.log("addr2 balance:", newAddr2Balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
