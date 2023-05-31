import { useState } from "react";
import { ChipStable, ChipsJackpot } from "../../../contracts/typechain-types";
import useTrasaction from "./useContractFunction";
import { etherToWei, weiToEther } from "./utils/convertion";


export default function useChipStable():[(stableContract:ChipStable, jackpotContract:ChipsJackpot) => void, any, any]{

    const [contract, setContract] = useState<ChipStable>()
    const [jackpot, setJackpot] = useState<ChipsJackpot>()

    const [txStatus, performTx] = useTrasaction()



    function approve(amount:number){
        if(!contract || !jackpot) return
        performTx(contract.approve, jackpot?.address, etherToWei(amount))
    }

    async function checkAllowance(){
        if(!contract || !jackpot) return
        const addresss = await contract.signer.getAddress()
        return (await contract?.allowance(addresss, jackpot.address)).toString()
    }


    function setupContract(stableContract:ChipStable, jackpotContract:ChipsJackpot){
        setContract(stableContract)
        setJackpot(jackpotContract)
    }


    return [setupContract, {approve}, {checkAllowance}]
    
}