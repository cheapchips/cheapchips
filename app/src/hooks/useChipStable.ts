import { useState, useContext } from "react";
import useContractFunction from "./useContractFunction";
import { etherToWei, weiToEther } from "./utils/web3unitsConversion";
import Web3Context from "../contexts/Web3Context";


export default function useChipStable():[any, any]{

    const web3 = useContext(Web3Context)
    
    const [performApproveTx] = useContractFunction(web3.chipStable!.approve)    
    const [performMintTx] = useContractFunction(web3.chipStable!.mint)    


    function approve(amount:number){
        performApproveTx(web3.jackpot!.address, etherToWei(amount))
    }

    function mint(){
        performMintTx()
    }

    async function checkAllowance(){
        return (await web3.chipStable!.allowance(web3.address!, web3.jackpot!.address)).toString()
    }

    return [{approve, mint}, {checkAllowance}]
    
}