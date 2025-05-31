const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

// Extract only the ABI
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "name": "owner",
    "inputs": [],
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "addTask",
    "inputs": [
      { "internalType": "string", "name": "_task", "type": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "getTask",
    "inputs": [
      { "internalType": "uint256", "name": "_index", "type": "uint256" }
    ],
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "getTaskCount",
    "inputs": [],
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "markCompleted",
    "inputs": [
      { "internalType": "uint256", "name": "_index", "type": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


let provider, signer, contract; // Define here, assign later

const connectBtn = document.getElementById("connect");
const walletDisplay = document.getElementById("walletAddress");
const ownerBtn = document.getElementById("getOwner");
const ownerDisplay = document.getElementById("ownerDisplay");
const statusDisplay = document.getElementById("status");
const taskCountDisplay = document.getElementById("taskCountDisplay");

const addTaskBtn = document.getElementById("addTask");
const markCompleteBtn = document.getElementById("markComplete");
const getTaskBtn = document.getElementById("getTask");

const taskInput = document.getElementById("text-addTask");
const taskIdInput = document.getElementById("text-getTask");

updateStatus = (message, type = "info") => {
  statusDisplay.innerText = message;
  statusDisplay.className = `alert alert-${type}`;
  statusDisplay.style.display = "block";
}



getCount = async () => {
  if (!contract) return;
  try{
  const count = await contract.getTaskCount();
  taskCountDisplay.innerText = `Total Task: ${count}`;
  } catch(error){
  updateStatus(`Fail to get task: ${error.message}`, "danger")
  }
}

connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask Plug-in.");
    return;
  }

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);

    const userAddress = await signer.getAddress();
    walletDisplay.innerText = `Connected: ${userAddress}`;
    updateStatus("Wallet connected");
    getCount();
  } catch (error) {
    updateStatus(`Connection failed: ${error.message}`, "danger");
  }
};

ownerBtn.onclick = async () => {
  if (!contract) return;

  try {
    const ownerAddress = await contract.owner();
    ownerDisplay.innerText = `Contract Owner: ${ownerAddress}`;
  } catch (error) {
    updateStatus(`Failed to fetch owner: ${error.message}`, "danger");
  }
};

addTaskBtn.onclick = async() => {
  if (!contract) return;
  const task = taskInput.value.trim();
  if (!task) {
    updateStatus("Task cannot be empty.", "warning");
    return;
  }

  try {
    const tx = await contract.addTask(task);
    updateStatus("Adding task...");
    await tx.wait();
    updateStatus("Task added successfully");
    taskInput.value = "";
    getCount();
  } catch (err) {
    updateStatus(`Failed to add task: ${err.message}`, "danger");
  }
};

markCompleteBtn.onclick = async () => {
  if (!contract) return;
  const taskId = parseInt(taskInput.value.trim());
  if (isNaN(taskId)) {
    updateStatus("Enter a valid task ID to mark complete.", "warning");
    return;
  }

  try {
    const tx = await contract.markCompleted(taskId);
    updateStatus("Marking task as completed...");
    await tx.wait();
    updateStatus(`Task #${taskId} marked as complete`);
    taskInput.value = "";
  } catch (err) {
    updateStatus(`Failed to complete task: ${err.message}`, "danger");
  }
};

getTaskBtn.onclick = async () => {
  if (!contract) return;
  const taskId = parseInt(taskIdInput.value.trim());
  if (isNaN(taskId)) {
    updateStatus("Enter a valid task ID.", "warning");
    return;
  }

  try {
    const [task, completed] = await contract.getTask(taskId);
    updateStatus(`Task #${taskId}: ${task} | Completed: ${completed ? "Yes" : "No"}`);
    taskIdInput.value = "";
  } catch (err) {
    updateStatus(`Failed to fetch task: ${err.message}`, "danger");
  }
};