import { useContext } from "react";
import useTrasaction from "./useTransaction";
import { etherToWei, weiToEther } from "./utils/convertion";
import Web3Context from "../contexts/Web3Context";

export default function useLinkToken():[any, any, any]{

    const web3 = useContext(Web3Context)

    const [txStatus, performTx] = useTrasaction()

    function approve(amount:number){
        const {linkToken, jackpot} = web3
        if(!linkToken || !jackpot) return
        performTx(linkToken.approve, jackpot.address, etherToWei(amount))
    }

    async function checkAllowance(){
        const {linkToken, jackpot, signer} = web3
        if(!linkToken || !jackpot || !signer) return
        const address = await signer.getAddress()
        return weiToEther(await linkToken.allowance(address, jackpot.address))
    }

    async function checkBalance() {
        const {linkToken, signer} = web3
        if(!linkToken || !signer) return
        const address = await signer.getAddress()
        return weiToEther(await linkToken.balanceOf(address))
    }

    return [
        txStatus,
        {approve},
        {checkAllowance, checkBalance}
    ]    
}