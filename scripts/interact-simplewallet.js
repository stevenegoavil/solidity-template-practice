const hre = require("hardhat");

let SimpleWalletTrigger = async () => {
    try {
        const SimpleWallet = await hre.ethers.getContractFactory("SimpleWallet");
        const owner = await SimpleWallet.deploy();

        await owner.deployed();

        console.log("SimpleWallet Solidity Contract deployed to:", owner.address);
    }
    catch(error){
        console.log(error, "Error ");
        process.exitCode = 1;
    }
}

SimpleWalletTrigger();
//contract.methods.deposit().send({ value: 1000000000000000000 }); // 1 ETH in wei
