import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Web3Provider, JsonRpcSigner, ExternalProvider } from "../types/ethersTypes"

declare global {
    interface Window {
        ethereum: ExternalProvider
    }
}

/**
 * 1. Connect wallet with dapp (via connect wallet button) (once)
 * 2. Connect wallet to blockchain (every time, after connection button fades away [auto])
 */

export default function useConnectWallet(network?: string): [boolean, boolean, boolean, Web3Provider | undefined, JsonRpcSigner | undefined, () => Promise<void>]{
    
    const [metamask, setMetamask] = useState<boolean>(false)
    const [connected, setConnected] = useState<boolean>(false)
    const [provider, setProvider] = useState<Web3Provider>()
    const [signer, setSigner] = useState<JsonRpcSigner>()
    const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(true)
    
    const [networkId, setNetworkId] = useState<number>()
    const TESTNET_NETWORK = 80001

    useEffect(() => {
        main()
    }, [])

    useEffect(() => {
        if(!window.ethereum) setMetamask(false)
        else setMetamask(true)
    }, [window.ethereum])
  
    const main = async () => {
        if(await isWalletConnected()){
            connect()
        }
    }
    
    const getInitialNetwork = async () => {
        const { chainId } = await provider!.getNetwork()
        console.log(chainId)
        setNetworkId(chainId)
    }
    
    const isWalletConnected = async () => {
        if(!provider) return
        const accounts:string[] = await provider.send("eth_requestAccounts", []);
        return accounts.length > 0
    }
    
    const restartProvider = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
        if(!provider) return
        const signer = provider.getSigner()
        setSigner(signer)
        const { chainId } = await provider.getNetwork()
        setNetworkId(chainId)
    }

    const connect = async() => {
        if(connected) return
        await restartProvider()
        setConnected(true)

        // if(provider){
        //     provider.removeAllListeners()
        //     provider.removeAllListeners("accountsChanged")
        //     provider.removeAllListeners("network")
    
        //     provider.on("accountsChanged", async() => {
        //         restartProvider()
        //     })

        //     provider.on("network", (newNetwork, oldNetwork) => {
        //         if (oldNetwork) {
        //         console.log('network switch ', oldNetwork, newNetwork)
        //         window.location.reload();
        //     }
        //     })
        // }
    }

    return [metamask, isCorrectNetwork, connected, provider, signer, connect]

    // connected = is wallet connected State
    // connect = function to connect the wallet through metamask
}