import { AbstractProvider, BrowserProvider, Eip1193Provider, JsonRpcSigner } from "ethers"
import { useEffect, useState } from "react"

declare global {
    interface Window {
        ethereum: Eip1193Provider & AbstractProvider 
    }
}

/**
 * 1. Connect wallet with dapp (via connect wallet button) (once)
 * 2. Connect wallet to blockchain (every time, after connection button fades away [auto])
 */

export default function useConnectWallet(network?: string): [boolean, BrowserProvider | undefined, JsonRpcSigner | undefined, () => Promise<void>]{
    const [connected, setConnected] = useState<boolean>(false)
    const [provider, setProvider] = useState<BrowserProvider>()
    const [signer, setSigner] = useState<JsonRpcSigner>()

    useEffect(() => {
        main()
    }, [])

    const main = async () => {
        if(await isWalletConnected()){
            connect()
        }
    }

    const isWalletConnected = async () => {
        const accounts:string[] = await window.ethereum.request({method: "eth_accounts"})
        return accounts.length > 0
    }

    const restartProvider = async() => {
        const provider = new BrowserProvider(window.ethereum)
        setProvider(provider)
        const signer = await provider.getSigner()
        setSigner(signer)
    }

    const connect = async() => {
        if(connected) return
    
        await restartProvider()
        setConnected(true)

        window.ethereum.removeAllListeners("accountsChanged")

        window.ethereum.on("accountsChanged", async() => {
            restartProvider()
        })
    }

    return [connected, provider, signer, connect]

    // connected = is wallet connected State
    // connect = function to connect the wallet through metamask
}