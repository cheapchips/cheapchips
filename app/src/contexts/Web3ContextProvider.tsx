import {useEffect, useState } from "react"
import Web3Context from "./Web3Context"
import { ChipStable, ChipStable__factory, ChipsJackpot, ChipsJackpot__factory, LinkTokenInterface, LinkTokenInterface__factory } from "../../../contracts/typechain-types"
import { TxHash, TxStatus } from "../types/useTransactionTypes"
import Web3ContextProviderInterface from "../types/Web3ContextProviderInterface"
import { ethers } from "ethers"
import Navbar from "../components/logical/Navbar"



const Web3ContextProvider = ({children, walletState, web3Provider, web3Signer}:Web3ContextProviderInterface) => {

    const [chipStable, setChipStable] = useState<ChipStable>()
    const [jackpot, setJackpot] = useState<ChipsJackpot>()
    const [linkToken, setLinkToken] = useState<LinkTokenInterface>()
    const [chipStableBalance, setChipStableBalance] = useState<string>()
    const [linkTokenBalance, setLinkTokenBalance] = useState<string>()
    const [txStatus, setTxStatus] = useState<TxStatus>("nonexist")
    const [txHash, setTxHash] = useState<TxHash>("")
    const [txErrorMessage, setTxErrorMessage] = useState<string>()
    const [address, setAddress] = useState<string>()
    const [isReady, setIsReady] = useState<boolean>(false)

    useEffect(() => {
        if(walletState === "READY" && web3Signer){
            (async() => {
                const address = await web3Signer.getAddress()
                const chip = ChipStable__factory.connect("0xC3013DF5d62c3D29Ed302BA2D76dC47e06BD254a", web3Signer)
                const jackpot = ChipsJackpot__factory.connect("0xB9e0E83E8664dB7FCd9a1a120B047d40e2656c54", web3Signer)
                const linkToken = LinkTokenInterface__factory.connect("0x326C977E6efc84E512bB9C30f76E30c160eD06FB", web3Signer)
                

                setChipStable(chip)
                setChipStableBalance((await chip.balanceOf(address)).toNumber().toString())
                setLinkTokenBalance(ethers.utils.formatUnits((await linkToken.balanceOf(address)),"ether"))
                setAddress(address)
                setJackpot(jackpot)
                setLinkToken(linkToken)
                setIsReady(true)
            })()
        }
    }, [walletState, web3Signer])

    if(isReady) return (
        <Web3Context.Provider value={{
            address,
            provider: web3Provider,
            signer: web3Signer,
            chipStable,
            linkToken,
            linkTokenBalance,
            jackpot,
            chipStableBalance,
            tx: {status: txStatus, hash: txHash, errorMessage: txErrorMessage},
            setTxStatus,
            setTxHash,
            setTxErrorMessage,
            setChipStableBalance,
            setLinkTokenBalance
        }}>
            {children}
        </Web3Context.Provider>
    )

    return(
        <>
        </>
    )

}

export default Web3ContextProvider