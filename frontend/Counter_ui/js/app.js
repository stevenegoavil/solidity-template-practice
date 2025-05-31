const contractAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

// Extract only the ABI
const importCounterArtifact = {
  "abi": [
    {
      "inputs": [],
      "name": "count",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decrement",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCount",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "increment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
};

const abi = importCounterArtifact.abi;

let provider, signer, contract; // Define here, assign later

document.getElementById("connect").onclick = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);

    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = `Connected: ${address}`;
    getCount();
  } else {
    alert("MetaMask not found. Install it to use this DApp.");
  }
};

getCount = async() => {
  if (!contract) return;
  const count = await contract.getCount();
  document.getElementById("count").innerText = count;
}

document.getElementById("increment").onclick = async () => {
  if (!contract) return;
  const tx = await contract.increment();
  document.getElementById("status").innerText = "Transaction sent…";
  await tx.wait();
  getCount();
  document.getElementById("status").innerText = "Counter incremented!";
};

document.getElementById("decrement").onclick = async () => {
  if (!contract) return;
  const tx = await contract.decrement();
  document.getElementById("status").innerText = "Transaction sent…";
  await tx.wait();
  getCount();
  document.getElementById("status").innerText = "Counter decremented!";
};