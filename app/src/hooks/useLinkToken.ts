import { useContext, useState } from "react";
import { ChipsJackpot } from "../../../contracts/typechain-types";
import { LinkTokenInterface } from "../../../contracts/typechain-types";
import useTrasaction from "./useTransaction";
import { etherToWei, weiToEther } from "./utils/convertion";
import Web3Context from "../contexts/Web3Context";
import { ethers } from "ethers";

export default function useLinkToken():[any, any]{

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
        return (await linkToken.allowance(address, jackpot.address)).toString()
    }

    async function checkBalance() {
        const {linkToken, signer} = web3
        if(!linkToken || !signer) return
        const address = await signer.getAddress()
        return ethers.utils.formatUnits(await linkToken.balanceOf(address), "ether").toString()
    }

    return [{approve}, {checkAllowance}]    
}