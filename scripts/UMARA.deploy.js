const hre=require("hardhat");

async function main() 
{
  const UMARA=await hre.ethers.getContractFactory("UMARATIK");
  const gasLimit = 3000000; // Set your desired gas limit
  const gasPrice = ethers.utils.parseUnits("50", "gwei"); // Set your desired gas price
  const umara = await UMARA.deploy({
    gasLimit: gasLimit,
    gasPrice: gasPrice
  });
  await umara.deployed();
  console.log("contract is deployed to Sepolia testnet:",umara.address);
 // contract deployed to sepolia network who's address is 0xe9f38B296A81FDAB5A369D45e02E01a6fdE56fDd
}


main().catch((error) => 
{
  console.error(error);
  process.exitCode = 1;
});



