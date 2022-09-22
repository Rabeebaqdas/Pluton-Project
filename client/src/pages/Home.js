import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useMoralis, useWeb3Contract } from "react-moralis"
import nftAbi from "../constants/NFT.json"
import networkMapping from "../constants/networkMapping.json"
import NFTBOX from '../components/NFTBOX'

const Home = () => {
  const [nft,setNft] = useState([])
  const { isWeb3Enabled, account, chainId } = useMoralis()
  const chainString = chainId ? parseInt(chainId).toString() : "31337"
  const NftAddress = networkMapping[chainString].NFT[0]
  const { runContractFunction: getAllNFTs } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: NftAddress,
    functionName: "getAllNFTs",
    params: {}
})

async function updateUI() {
  const NFTs = await getAllNFTs()
  console.log(`The NFTs are ${NFTs}`)
  console.log("nfts",JSON.parse(JSON.stringify(NFTs)))
  setNft(JSON.parse(JSON.stringify(NFTs)))

  }

  useEffect(()=> {
    updateUI()
  },[account])
  return (
    <div className="container mx-auto">
        <NavBar />
        <div className="flex flex-wrap">
        {isWeb3Enabled ? nft?.map((res)=>{
          return(
          <NFTBOX tokenId={res[0].hex.replace("0x0","")} owner={res[1]} />
          )
        }) : "Please Connect Your Wallet"
      }
      </div>

    </div>
  )
}

export default Home