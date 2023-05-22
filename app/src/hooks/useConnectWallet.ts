import { useEffect, useState } from "react"

import { ethers } from "ethers"

type Web3Provider = ethers.providers.Web3Provider
type JsonRpcSigner = ethers.providers.JsonRpcSigner
type ExternalProvider = ethers.providers.ExternalProvider

declare global {
    interface Window {
        ethereum: ExternalProvider
    }
}

/**
 * 1. Connect wallet with dapp (via connect wallet button) (once)
 * 2. Connect wallet to blockchain (every time, after connection button fades away [auto])
 */

export default function useConnectWallet(network?: string): [boolean, Web3Provider | undefined, JsonRpcSigner | undefined, () => Promise<void>]{
    const [connected, setConnected] = useState<boolean>(false)
    const [provider, setProvider] = useState<Web3Provider>()
    const [signer, setSigner] = useState<JsonRpcSigner>()


    useEffect(() => {
        main()
    }, [])

    const main = async () => {
        // if(await isWalletConnected()){
        //     connect()
        // }
    }

    // const isWalletConnected = async () => {
    //     if(!provider) return
        
    //     return accounts.length > 0
    // }

    const restartProvider = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
        const accounts:string[] = await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner()
        setSigner(signer)
    }

    const connect = async() => {
        if(connected) return
        console.log('connecting')
        await restartProvider()
        setConnected(true)

        // if(provider){
        //     provider.removeAllListeners()
        //     provider.removeAllListeners("accountsChanged")
    
        //     provider.on("accountsChanged", async() => {
        //         restartProvider()
        //     })
        // }
    }

    return [connected, provider, signer, connect]

    // connected = is wallet connected State
    // connect = function to connect the wallet through metamask
}