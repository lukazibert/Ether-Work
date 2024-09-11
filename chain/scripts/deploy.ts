import { ethers } from "hardhat";

async function main() {
  const ArbitratorContract = await ethers.getContractFactory("Arbitrator");
  const arbitrator = await ArbitratorContract.deploy({value: ethers.utils.parseEther("10.0")}); 
  console.log("Arbitrator deployed to:", arbitrator.address);

  // Check the balance of the deployer
  const balance = await ethers.provider.getBalance(arbitrator.address);
  console.log(`Balance of deployer (${arbitrator.address}): ${ethers.utils.formatEther(balance)} ETH`);

  // Check the nonce of the deployer (number of transactions sent)
  const nonce = await ethers.provider.getTransactionCount(arbitrator.address);
  console.log(`Transaction count (nonce) of deployer: ${nonce}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
