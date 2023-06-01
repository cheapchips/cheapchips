import { useContext } from "react";
import { etherToWei, weiToEther } from "./utils/web3unitsConversion";
import Web3Context from "../contexts/Web3Context";
import useContractFunction from "./useContractFunction";

export default function useLinkToken():[any, any]{

    const web3 = useContext(Web3Context)

    const [performApproveTx] = useContractFunction(web3.linkToken?.approve!)
    
    function approve(amount:number){
        const {linkToken, jackpot} = web3
        if(!linkToken || !jackpot) return
        performApproveTx(jackpot.address, etherToWei(amount))
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
        {approve},
        {checkAllowance, checkBalance}
    ]    
}