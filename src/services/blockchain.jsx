import abi from "../abis/src/contracts/Genesis.sol/Genesis.json";
import address from "../abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "../store";
import { ethers } from "ethers";
import addresss from "../abis/contractAddress.json";
const Web3 = require("web3"); // If you're using Node.js
const web3 = new Web3(window.ethereum); // For MetaMask
const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;
let tx;
const addressvalue = addresss.address;

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
  } catch (error) {
    reportError(error);
  }
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      await isWallectConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found.");
    }
  } catch (error) {
    reportError(error);
  }
};

const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");

  console.log(contractAddress);
  const contractBalance = await web3.eth.getBalance(contractAddress);

  console.log("Contract Ether balance:", web3.utils.fromWei(contractBalance, "ether"), "ETH");
  // console.log(connectedAccount);

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  } else {
    return getGlobalState("contract");
  }
};
const buyProduct = async (productId) => {
  console.log("Entering the buyProduct in blockchain service");
  console.log(productId);
  try {
    console.log("inside try block of buyProduct");
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const buyerAddress = connectedAccount;
    const contract = await getEtheriumContract();
    console.log("after getethecontract");
    const tx = await // Assuming productId is 0 and productPrice is 1 ether

    await contract.buyProduct(0,1, {              //now farmer is paying 1 ether to the contract for each productId
      from: buyerAddress,
      // to: contractAddress,
      value: web3.utils.toWei("1", "ether"),
    });

    console.log("after conract.buyproduct");

    await tx.wait();
    // console.log(contract);
  } catch (error) {
    reportError(error);
  }
};

const createProject = async ({
  title,
  description,
  imageURL,
  cost,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getEtheriumContract();
    cost = ethers.utils.parseEther(cost);
    tx = await contract.createProject(
      title,
      description,
      imageURL,
      cost,
      expiresAt
    );
    await tx.wait();
    await loadProjects();
  } catch (error) {
    reportError(error);
  }
};

const updateProject = async ({
  id,
  title,
  description,
  imageURL,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getEtheriumContract();
    tx = await contract.updateProject(
      id,
      title,
      description,
      imageURL,
      expiresAt
    );
    await tx.wait();
    await loadProject(id);
  } catch (error) {
    reportError(error);
  }
};

const deleteProject = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getEtheriumContract();
    await contract.deleteProject(id);
  } catch (error) {
    reportError(error);
  }
};

const loadProjects = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getEtheriumContract();
    const projects = await contract.getProjects();
    const stats = await contract.stats();

    setGlobalState("stats", structureStats(stats));
    setGlobalState("projects", structuredProjects(projects));
  } catch (error) {
    reportError(error);
  }
};

const loadProject = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getEtheriumContract();
    const project = await contract.getProject(id);

    setGlobalState("project", structuredProjects([project])[0]);
  } catch (error) {
    alert(JSON.stringify(error.message));
    reportError(error);
  }
};

const backProject = async (id, amount) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEtheriumContract();
    amount = ethers.utils.parseEther(amount);

    tx = await contract.backProject(id, {
      from: connectedAccount,
      value: amount._hex,
    });

    await tx.wait();
    await getBackers(id);
  } catch (error) {
    reportError(error);
  }
};

const getBackers = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getEtheriumContract();
    let backers = await contract.getBackers(id);

    setGlobalState("backers", structuredBackers(backers));
  } catch (error) {
    reportError(error);
  }
};

const payoutProject = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEtheriumContract();

    tx = await contract.payOutProject(id, {
      from: connectedAccount,
    });

    await tx.wait();
    await getBackers(id);
  } catch (error) {
    reportError(error);
  }
};

const structuredBackers = (backers) =>
  backers
    .map((backer) => ({
      owner: backer.owner.toLowerCase(),
      refunded: backer.refunded,
      timestamp: new Date(backer.timestamp.toNumber() * 1000).toJSON(),
      contribution: parseInt(backer.contribution._hex) / 10 ** 18,
    }))
    .reverse();

const structuredProjects = (projects) =>
  projects
    .map((project) => ({
      id: project.id.toNumber(),
      owner: project.owner.toLowerCase(),
      title: project.title,
      description: project.description,
      timestamp: new Date(project.timestamp.toNumber()).getTime(),
      expiresAt: new Date(project.expiresAt.toNumber()).getTime(),
      date: toDate(project.expiresAt.toNumber() * 1000),
      imageURL: project.imageURL,
      raised: parseInt(project.raised._hex) / 10 ** 18,
      cost: parseInt(project.cost._hex) / 10 ** 18,
      backers: project.backers.toNumber(),
      status: project.status,
    }))
    .reverse();

const toDate = (timestamp) => {
  const date = new Date(timestamp);
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const structureStats = (stats) => ({
  totalProjects: stats.totalProjects.toNumber(),
  totalBacking: stats.totalBacking.toNumber(),
  totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
});

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export {
  connectWallet,
  isWallectConnected,
  createProject,
  updateProject,
  deleteProject,
  loadProjects,
  loadProject,
  backProject,
  getBackers,
  payoutProject,
  buyProduct,
};
