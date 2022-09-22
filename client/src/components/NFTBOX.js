import React, { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { Card } from 'web3uikit'
import networkMapping from "../constants/networkMapping.json"
import nftAbi from "../constants/NFT.json"

const NFTBOX = ({tokenId, owner}) => {
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")    
    const { chainId, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const NftAddress = networkMapping[chainString].NFT[0]

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: NftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    async function updateUI() {
        const tokenURI = await getTokenURI()
        console.log(`The TokenURI is ${tokenURI}`)
        if (tokenURI) {
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const tokenURIResponse = await (await fetch(requestURL)).json()
            const imageURI = tokenURIResponse.image
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            setImageURI(imageURIURL)
            setTokenName(tokenURIResponse.name)
            setTokenDescription(tokenURIResponse.description)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])


  



  return (
    <div className='ml-10 mt-10'>
    
                <Card
                title={tokenName}
                description={tokenDescription}
            >
                <div className="p-2">
                    <div className="flex flex-col items-end gap-2">
                        <div>#{tokenId}</div>
                        <div className="italic text-sm">
                            Owned by {`${owner.slice(0,4)}...${owner.slice(owner.length - 4)}`}
                        </div>
                        <img 
                            loader={() => imageURI}
                            src={imageURI}
                            height="200"
                            width="200"
                        />
                    </div>
                </div>
            </Card>
            

</div>
  )
}

export default NFTBOX