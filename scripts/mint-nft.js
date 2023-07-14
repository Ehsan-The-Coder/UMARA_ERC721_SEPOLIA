require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/UMARA-TIK.sol/UMARATIK.json");

console.log(JSON.stringify(contract.abi));

const contractAddress = "0xe9f38B296A81FDAB5A369D45e02E01a6fdE56fDd";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
//create transaction
async function mintNFT(tokenURI) 
{
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = 
  {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 9000000,
    data: nftContract.methods.safeMint(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}



async function main() {
  try {
    // await mintNFT(
    //   "https://tomato-superior-whippet-160.mypinata.cloud/ipfs/QmehTFGbSbiU7bzoU6HBaR1ZptMUeY8cwM5mNK6chsDMeP"
    // );
    // await mintNFT(
    //   "https://tomato-superior-whippet-160.mypinata.cloud/ipfs/QmcU4UcMzK8gD8xUZKDHc3qbm1fZ5FuHpkBQ8ZcBLVgTDi"
    // );
    // await mintNFT(
    //   "https://tomato-superior-whippet-160.mypinata.cloud/ipfs/QmZkXY1Evu8LYNn6RX7U8TyYu1iDyJ6kKKszV163isP3BM"
    // );
    // await mintNFT(
    //   "https://tomato-superior-whippet-160.mypinata.cloud/ipfs/QmcFUSkugrtGCy16sLdb1bmwCzrtJPtFRCTzMuP7YmvrTc"
    // );
    // await mintNFT(
    //   "https://tomato-superior-whippet-160.mypinata.cloud/ipfs/QmesCf2JUqET2PPH6oakSfhdUDUe7gUHULtqb2MBp3bazf"
    // );
    // await mintNFT(
    //   "https://tomato-superior-whippet-160.mypinata.cloud/ipfs/QmWMrcYxnciAXyJhLQPJMhXLLTSNBaNx9VkJNMfrBx1YCw"
    // );
    // await mintNFT(
    //   "https://tomato-superior-whippet-160.mypinata.cloud/ipfs/QmPZcNywug3CKKawmNtYyksPxqWWcoaCYpWeaE14Pa8ERr"
    // );
    await mintNFT(
      "https://tomato-superior-whippet-160.mypinata.cloud/ipfs/QmYp6ATSTWiakSfdpp3PXeaQoEvxYhdu6ne8rJB8hrpUfP"
    );
    // await mintNFT(
    //   "https://tomato-superior-whippet-160.mypinata.cloud/ipfs/QmRca2V9F2F95a5wsHVLyot1jd6NmxhwpjYHDXQUAxb8Xg"
    // );
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

// Call the async function
main();