import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Web3Provider, JsonRpcSigner } from "../types/ethersTypes"
import WalletState from "../types/WalletState"

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ethereum: any
    }
}

type ConnectFunction = () => Promise<void>

type UseConnectWalletInterface = [
    boolean,
    WalletState,
    Web3Provider | undefined,
    JsonRpcSigner | undefined,
    ConnectFunction
]


export default function useConnectWallet(): UseConnectWalletInterface{
    
    const [isMetamask, setIsMetamask] = useState<boolean>(true)
    const [provider, setProvider] = useState<Web3Provider>()
    const [signer, setSigner] = useState<JsonRpcSigner>()
    const [walletState, setWalletState] = useState<WalletState>("NOT_CONNECTED")

    const TESTNET_NETWORK = 80001

    useEffect(() => {
        setIsMetamask(window.ethereum ? true : false)
    }, [])

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

            window.ethereum.on("chainChanged", () => {
                window.location.reload()
            })       
    }

    const connect = async() => {
        await setupProviderAndSigner()
    }

    return [isMetamask, walletState, provider, signer, connect]

}