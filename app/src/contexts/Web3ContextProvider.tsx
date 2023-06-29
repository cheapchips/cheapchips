import {useEffect, useState } from "react"
import Web3Context from "./Web3Context"
import { ChipStable, ChipStable__factory, ChipsJackpot, ChipsJackpot__factory, LinkTokenInterface, LinkTokenInterface__factory } from "../../../contracts/typechain-types"
import { TxHash, TxStatus } from "../types/useTransactionTypes"
import Web3ContextProviderInterface from "../types/Web3ContextProviderInterface"
import { ethers } from "ethers"
import useConnectWallet from "../hooks/useConnectWallet"
import Skeleton from "../components/layout/Skeleton"
import SwitchNetworkModal from "../components/logical/modals/SwitchNetworkModal"
import InstallMetamaskModal from "../components/logical/modals/InstallMetamaskModal"
import useModal from "../hooks/useModal"
import JackpotContextProvider from "./JackpotContextProvider"




const Web3ContextProvider = ({children}:Web3ContextProviderInterface) => {

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
    const [isJackpotContextReady, setIsJackpotContextReady] = useState<boolean>(false)

    const [isMetamask, walletState, provider, signer, connect] = useConnectWallet()
    const [,toggleInstallMetamaskvisible] = useModal()


    useEffect(() => {
        if(walletState === "READY" && signer){
            (async() => {
                const address = await signer.getAddress()
                const chip = ChipStable__factory.connect("0xC3013DF5d62c3D29Ed302BA2D76dC47e06BD254a", signer)
                const jackpot = ChipsJackpot__factory.connect("0xB9e0E83E8664dB7FCd9a1a120B047d40e2656c54", signer)
                const linkToken = LinkTokenInterface__factory.connect("0x326C977E6efc84E512bB9C30f76E30c160eD06FB", signer)
                

                setChipStable(chip)
                setChipStableBalance((await chip.balanceOf(address)).toNumber().toString())
                setLinkTokenBalance(ethers.utils.formatUnits((await linkToken.balanceOf(address)),"ether"))
                setAddress(address)
                setJackpot(jackpot)
                setLinkToken(linkToken)
                setIsReady(true)
            })()
        }
    }, [walletState, signer])

    if(isReady) return (
        <Web3Context.Provider value={{
            address,
            provider: provider,
            signer: signer,
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
            <JackpotContextProvider
                setIsJackpotContextReady={setIsJackpotContextReady}
            >
                {isJackpotContextReady 
                ? children 
                : <Skeleton connected={walletState !== "NOT_CONNECTED" ? true : false } connect={connect} />}

                {/* {children} */}
            </JackpotContextProvider>
        </Web3Context.Provider>
    )

    return(
        <>
        {walletState === "WRONG_NETWORK" && <SwitchNetworkModal onClickClose={() => { console.log("CLOSE") }} closeBtnDisabled={true} />}
        {!isMetamask && <InstallMetamaskModal onClickClose={toggleInstallMetamaskvisible} closeBtnDisabled={true} />} 
        <Skeleton connected={walletState !== "NOT_CONNECTED" ? true : false } connect={connect} />
        </>
    )

}

export default Web3ContextProvider