const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers");

describe("SimpleWallet", () => {
  let wallet;
  let owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const WalletFactory = await ethers.getContractFactory("SimpleWallet");
    wallet = await WalletFactory.deploy(); 
  });

  it("should set the correct owner", async () => {
    expect(await wallet.owner()).to.equal(owner.address);
  });

  it("should accept deposits", async () => {
    const depositAmount = parseEther("1.0");

    await owner.sendTransaction({
      to: wallet.getAddress(), 
      value: depositAmount,
    });

    const balance = await wallet.getBalance();
    expect(balance).to.equal(depositAmount);
  });

  it("should allow owner to withdraw", async () => {
    const depositAmount = parseEther("1.0");
    const withdrawAmount = parseEther("0.5");

    await owner.sendTransaction({
      to: wallet.getAddress(),
      value: depositAmount,
    });

    await wallet.withdraw(withdrawAmount);
    const remaining = await wallet.getBalance();
    expect(remaining).to.equal(parseEther("0.5")); 
  });

  it("should revert if non-owner tries to withdraw", async () => {
    const depositAmount = parseEther("1.0");

    await owner.sendTransaction({
      to: wallet.getAddress(),
      value: depositAmount,
    });

    await expect(
      wallet.connect(addr1).withdraw(parseEther("0.5"))
    ).to.be.revertedWith("Not the owner");
  });
});