import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Web3Provider, JsonRpcSigner } from "../types/ethersTypes"
import WalletState from "../types/WalletState"

declare global {
    interface Window {
        ethereum: any
    }
}

/**
 * 1. Connect wallet with dapp (via connect wallet button) (once)
 * 2. Connect wallet to blockchain (every time, after connection button fades away [auto])
 */

// network?:string
export default function useConnectWallet(): [boolean, WalletState, Web3Provider | undefined, JsonRpcSigner | undefined, () => Promise<void>]{
    
    const [isMetamask, setIsMetamask] = useState<boolean>(true)
    const [provider, setProvider] = useState<Web3Provider>()
    const [signer, setSigner] = useState<JsonRpcSigner>()
    const [walletState, setWalletState] = useState<WalletState>("NOT_CONNECTED")

    // const [networkId, setNetworkId] = useState<number>()
    const TESTNET_NETWORK = 80001

    useEffect(() => {
        setIsMetamask(window.ethereum ? true : false)
    }, [])

    // useEffect(() => {
    //     console.log(walletState)
    // }, [walletState])


    const setupProviderAndSigner = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
        if(!provider) return
        const signer = provider.getSigner()
        setSigner(signer)

        if(provider && signer){
            const accounts:string[] = await provider.send("eth_requestAccounts", []);
            if(accounts.length > 0) setWalletState("CONNECTED")
            listeners()
            const { chainId } = await provider.getNetwork()
            chainId === TESTNET_NETWORK ?  setWalletState("READY") : setWalletState("WRONG_NETWORK")
        }
    }

    const listeners = () => {
            // console.log("LISTENERS ACTIVE")
            window.ethereum.removeAllListeners("chainChanged")
            window.ethereum.removeAllListeners("accountsChanged")

            window.ethereum.on("accountsChanged", () => {
                window.location.reload()
            })

            // chainId:any
            window.ethereum.on("chainChanged", () => {
                window.location.reload()
            })       
    }

    const connect = async() => {
        await setupProviderAndSigner()
    }

    return [isMetamask, walletState, provider, signer, connect]

    // connected = is wallet connected State
    // connect = function to connect the wallet through metamask
}