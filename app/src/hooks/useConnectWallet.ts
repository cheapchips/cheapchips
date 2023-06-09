import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Web3Provider, JsonRpcSigner } from "../types/ethersTypes"

declare global {
    interface Window {
        ethereum: any
    }
}

/**
 * 1. Connect wallet with dapp (via connect wallet button) (once)
 * 2. Connect wallet to blockchain (every time, after connection button fades away [auto])
 */

export default function useConnectWallet(network?: string): [boolean, boolean, boolean, Web3Provider | undefined, JsonRpcSigner | undefined, () => Promise<void>]{
    
    const [metamask, setMetamask] = useState<boolean>(true)
    const [connected, setConnected] = useState<boolean>(false)
    const [provider, setProvider] = useState<Web3Provider>()
    const [signer, setSigner] = useState<JsonRpcSigner>()
    const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false)
    // const [networkId, setNetworkId] = useState<number>()
    const TESTNET_NETWORK = 80001

    useEffect(() => {
        if(!window.ethereum) setMetamask(false)
        else setMetamask(true)
    }, [])

    useEffect(() => {
        console.log(connected)
    }, [connected])

    useEffect(() => {
        if(provider && signer) {
            (async() => {
                await connectWallet()
                listeners()
            })()
        }
    }, [provider, signer])


    const connectWallet = async () => {
        if(!provider) return
        const accounts:string[] = await provider.send("eth_requestAccounts", []);
        console.log(accounts)
        accounts.length > 0 ? setConnected(true) : setConnected(false)
    }
    
    const setupProviderAndSigner = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
        if(!provider) return
        const signer = provider.getSigner()
        setSigner(signer)
        const { chainId } = await provider.getNetwork()
        chainId === TESTNET_NETWORK ?  setIsCorrectNetwork(true) : setIsCorrectNetwork(false)
    }

    const listeners = () => {
        if(provider){
            // console.log("LISTENERS ACTIVE")
            window.ethereum.removeAllListeners("chainChanged")
            window.ethereum.removeAllListeners("accountsChanged")

            window.ethereum.on("accountsChanged", () => {
                window.location.reload()
            })

            window.ethereum.on("chainChanged", (chainId:any) => {
                window.location.reload()
            })
        }        
                
        
    }

    const connect = async() => {
        console.log('connect')
        await setupProviderAndSigner()
    }

    return [metamask, isCorrectNetwork, connected, provider, signer, connect]

    // connected = is wallet connected State
    // connect = function to connect the wallet through metamask
}