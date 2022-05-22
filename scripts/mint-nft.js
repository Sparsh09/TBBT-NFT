require("dotenv").config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const contract = require('../artifacts/contracts/TBBTNFT.sol/TBBTNFT.json');


const contractAddress = "0x33457FE4A42Aa90966b4b209777AbB0Cb6aDEDf2";
const nftContract = new web3.eth.Contract(contract.abi , contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await  web3.eth.getTransactionCount(PUBLIC_KEY , "latest");

    const tx = {
        'from' : PUBLIC_KEY,
        'to' : contractAddress,
        'nonce' : nonce,
        'gas' : 500000,
        'data' : nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI

    };
}
