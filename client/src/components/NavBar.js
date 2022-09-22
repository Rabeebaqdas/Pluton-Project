import { ConnectButton } from "web3uikit"


export default function NavBar() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">NFT Collection</h1>
            <div className="flex flex-row items-center">
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}