const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("mozart", function () {
  let Mozart;
  let myToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    Mozart = await ethers.getContractFactory("mozart");
    myToken = await Mozart.connect(owner).deploy();
    await myToken.connect(owner).mint(owner.address, 1000);
  });

  it("Should return the correct total supply", async function () {
    expect(await myToken.totalSupply()).to.equal(1000);
  });

  it("Should transfer tokens between accounts", async function () {
    await myToken.connect(owner).transfer(addr1.address, 100);
    expect(await myToken.balanceOf(addr1.address)).to.equal(100);
    expect(await myToken.balanceOf(owner.address)).to.equal(900);
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    const initialOwnerBalance = await myToken.balanceOf(owner.address);

    await expect(
      myToken.connect(addr1).transfer(owner.address, 1000)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    expect(await myToken.balanceOf(owner.address)).to.equal(
      initialOwnerBalance
    );
  });

  it("Should update balances after transfers", async function () {
    const initialOwnerBalance = await myToken.balanceOf(owner.address);

    await myToken.connect(owner).transfer(addr1.address, 100);
    await myToken.connect(addr1).transfer(addr2.address, 50);

    expect(await myToken.balanceOf(owner.address)).to.equal(
      initialOwnerBalance - 100
    );

    expect(await myToken.balanceOf(addr1.address)).to.equal(50);

    expect(await myToken.balanceOf(addr2.address)).to.equal(50);
  });
});
