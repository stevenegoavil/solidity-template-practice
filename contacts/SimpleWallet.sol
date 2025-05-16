//SPDX-License-Identifier: MIT
pragma solidity >= 0.4.22 < 0.9.0;

contract SimpleWallet {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Accept ETH when sent directly to contract
    receive() external payable {}

    // Deposit money into the wallet explicitly
    function deposit() public payable {}

    // Only owner can withdraw
    function withdraw(uint _amount) public {
        require(msg.sender == owner, "Not the owner");
        payable(msg.sender).transfer(_amount);
    }

    // View wallet balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}