require("dotenv").config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const contract = require("../artifacts/contracts/TBBTNFT.sol/TBBTNFT.json");

const contractAddress = "0x33457FE4A42Aa90966b4b209777AbB0Cb6aDEDf2";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// console.log(JSON.stringify(contract.abi));

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
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
mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmYKg9BfooLhniaPr2ThRawTDoUMxYGTQXyFXJb8LkpRxh"
);
