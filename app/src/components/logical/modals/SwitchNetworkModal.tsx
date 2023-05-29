import ModalSkeleton from "../Modal";
import { ethers } from "ethers";

const SwitchNetworkModal = (props:{onClickClose:() => void}) => {

    const styles = {
        
    }

    const switchToCorrectNetwork = () => {
        if(!window.ethereum) return
        window.ethereum.request!({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x89",
            rpcUrls: ["https://rpc-mainnet.matic.network/"],
            chainName: "Matic Mainnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]
    }]
});
    }

    return (
        <ModalSkeleton title="Please switch your network" size="Medium" onClickClose={props.onClickClose}>

            <div>
            </div>

        </ModalSkeleton>
    )
}

export default SwitchNetworkModal