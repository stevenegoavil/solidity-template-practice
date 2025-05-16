const hre = require("hardhat");

let main = async () => { 
  try{
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.deployed();

  console.log("Counter deployed to:", counter.address);

  } 
  catch(error) {
  console.log(error, "Contract did not deploy");
  process.exitCode = 1;
  }
};

main();