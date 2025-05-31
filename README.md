# solidity-template-practice (3 Project Templates)

This repo contains my Solidity and ethers.js practice projects as part of my Web3 developer journey. These templates cover the basics of contract interaction, state management, and deploying smart contracts on a local blockchain.

### Contracts Included

### 1. Counter.sol
- Contract: `Counter.sol`
- Functions: `increment()`, `decrement()`, `getCount()` *(or public `count`)*
- Frontend: Real-time UI for count interaction
- Notes: Shows `require()` for input validation

### 2. TodoList.sol
- Contract: `TodoList.sol`
- Functions: `addTask(string)`, `getTask(uint)`, `markCompleted(uint)`, `getTaskCount()`
- Frontend: Add/view/complete todos, input + task info feedback
- Features: Array of structs (`string`, `bool`), public `owner`

### 3. SimpleWallet.sol
- Contract: `SimpleWallet.sol`
- Functions: `deposit()`, `withdraw(uint)`, `getBalance()`, `owner()`
- Frontend: Deposit/withdraw ETH, show connected wallet + balance
- Features: Access control via `msg.sender == owner`, uses payable functions

## How to Use (Local Hardhat Setup)

1. **Start Hardhat node** (in one terminal):
npx hardhat node
2. **Deploy any Contract (in a second Terminal):
npx hardhat run scripts/deployCounter.js --network localhost
npx hardhat run scripts/deployTodoList.js --network localhost
npx hardhat run scripts/deployWallet.js --network localhost
3. **Update each frontend's app.js with the contract address from the delpoy step
const contractAddress = "0x..."; // copy from deploy output
4. **Open the HTML file in browser(I used Live Sever extention to execute MetaMask)
5. **Connect MetaMask to localhost: 8545 and interact: Success!
###  Tools Used
- Solidity ^0.8.x
- Hardhat
- Ethers.js
- JavaScript for deployment and interaction scripts
- MetaMask
- Bootstrap

###  Coming Soon
- A resuable frontend template generator
- Github Pages live demos
- DEX bot repo (PumpSwap or Uniswap V2 clone)
- More Beginner friendly Smart Contract Templates to come!

---

I'm currently open to entry-level freelance opportunities, bounties, and Web3 contributions. I'm especially focused on DeFi scripting and smart contract logic.  
Feel free to contact me if you need help building or testing small contracts and scripts.
