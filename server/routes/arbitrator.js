const express = require("express");
const arbitrator = express.Router();
const { Web3 } = require("web3");
const contractAbi = require("../../chain/artifacts/contracts/Arbitrator.sol/Arbitrator.json");

const contractABI = contractAbi.abi; 
const contractAddress = process.env.CONTRACT_ADDRESS;
const arbitratorAddress = process.env.ARBITRATOR_ADDRESS;
const arbitratorPrivateKey = process.env.ARBITRATOR_PRIVATE_KEY;

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Get the contract instance
const contractInstance = new web3.eth.Contract(contractAbi.abi, contractAddress);

// Get the contract balance
arbitrator.get("/contract-instance", async (req, res) => {
  try {
    const contractBalance = await web3.eth.getBalance(contractAddress);

    const contractData = {
      address: contractAddress,
      abi: contractAbi.abi,
    };
  
    res.json(contractData);
  
  } catch (err) {
    res.status(404).send(err);
  }
});

arbitrator.post("/release-funds", async (req, res) => {
  // if (req.body == "Hellow World!") {
  //   console.log(req.body);
  // }
  // res.send("Hello Back!");

  try {
    // Set up the contract instance
    const contractInstance = new web3.eth.Contract(contractAbi.abi, contractAddress);

    // Set up the transaction parameters
    const trustedAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const privateKey =
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const transactionObject = {
      from: trustedAccount,
      to: contractAddress,
      gas: 2000000,
      data: contractInstance.methods.releaseEscrow(0).encodeABI(),
    };

    // Sign and send the transaction
    const signedTx = await web3.eth.accounts.signTransaction(
      transactionObject,
      privateKey
    );
    if (signedTx.rawTransaction) {
      const txReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
    res.send(txReceipt);

    }
  } catch (err) {
    console.log(err);
  }

  res.end();
});

module.exports = arbitrator;
