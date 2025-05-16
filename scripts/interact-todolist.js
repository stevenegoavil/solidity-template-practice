const hre = require("hardhat"); // this is needed to make sure this works within the Hardhat network

let TodoListTrigger = async () => {
  try {
    const TodoList = await hre.ethers.getContractFactory("TodoList");
    const todo = await TodoList.deploy();

    await todo.deployed();

    console.log("TodoList deployed to:", todo.address);
  } catch (error) {
  console.log("Error, did not deploy correctly");
  console.log(error);
  process.exitCode = 1;
  }
};

//deploy TodoListTrigger
TodoListTrigger();