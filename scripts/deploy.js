const { ethers } = require("hardhat");

async function main() {
    const TBBTNFT = await ethers.getContractFactory("TBBTNFT");

    const tbbtNft = await TBBTNFT.deploy();
    console.log(tbbtNft.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });