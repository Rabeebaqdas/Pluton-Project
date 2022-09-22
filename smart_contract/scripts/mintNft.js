const {ethers, network} = require("hardhat")
let tokenUris= [
    'ipfs://QmNgzMdmk2QfYcFDJru6hrzVAif8dFvJ98KijVZhqxVEPB',
    'ipfs://QmVhuk7SmSGv5k6LSh2aF3HSHpTB9NGocLmhg32yq6X1oc',
    'ipfs://QmUwk8R9A42rctULQpRqKHZbNSnnu76ibkg6JxXQhebQRj'
  ]

const mint = async() => {
    const token = await ethers.getContract("MyToken")
    const nft = await ethers.getContract("NFT")
    console.log("Minting................")
    const fee = await nft.mintingFees()
    for(let i = 0 ; i <= 2 ; i++) {
        console.log("Giving Approval..........")
        const approve = await token.approval(nft.address,fee)
        await approve.wait(1)
        console.log("Approved!")
        const mint = await nft.mintNft(tokenUris[i]) 
      const response = await mint.wait(1)
      const tokenId = response.events[1].args.tokenId
      console.log("NFT Minted with TokenID:", tokenId.toString())
        const tokenUri = await nft.tokenURI(i)
        console.log("TokenURI:",tokenUri)
    }
    const account = await ethers.getSigners()
    const balance = await nft.balanceOf(account[0].address)
    console.log("Total NFTs : ",balance.toString())

}
const main = async() => {
    try {
        await mint()
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
    }
    
    main()