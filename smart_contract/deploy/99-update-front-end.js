const { ethers, network } = require("hardhat")
const fs = require("fs")
const frontendContractFile = "../client/src/constants/networkMapping.json"
const frontendAbi = "../client/src/constants/"

module.exports = async function () {
    if (process.env.UPDATE_FRONTEND) {
        console.log("updating front end........")
         await updateContractAddresses();
        await updateAbi()
        console.log("Frontend Updated Successfully")
    }
}

const updateContractAddresses = async () => {
     const nft = await ethers.getContract("NFT")
    const chainId = network.config.chainId.toString()
    const contractAddress = JSON.parse(fs.readFileSync(frontendContractFile, "utf-8"))
    if (chainId in contractAddress) {
        if (!contractAddress[chainId]["NFT"].includes(nft.address)) {
            contractAddress[chainId]["NFT"].push(nft.address)
        } 

    }else {
        contractAddress[chainId] = {"NFT": [nft.address]}
   }
   console.log("Done!")


   fs.writeFileSync(frontendContractFile, JSON.stringify(contractAddress))

}

const updateAbi = async () => {
    const nft = await ethers.getContract("NFT")
    fs.writeFileSync(`${frontendAbi}NFT.json`, nft.interface.format(ethers.utils.FormatTypes.json))
}
module.exports.tags = ['all', 'frontend']