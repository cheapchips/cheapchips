import { useState } from "react";
import { ChipsJackpot } from "../../../contracts/typechain-types";
import { LinkTokenInterface } from "../../../contracts/typechain-types";
import useTrasaction from "./useTransaction";
import { etherToWei, weiToEther } from "./utils/convertion";

export default function useLinkToken():[(linkContract:LinkTokenInterface, jackpotContract:ChipsJackpot) => void, any, any]{

    const [contract, setContract] = useState<LinkTokenInterface>()
    const [jackpot, setJackpot] = useState<ChipsJackpot>()

    const [txStatus, performTx] = useTrasaction()

    function approve(amount:number){
        if(!contract || !jackpot) return
        performTx(contract.approve, jackpot?.address, etherToWei(amount))
    }

    async function checkAllowance(){
        if(!contract || !jackpot) return
        const address = await contract.signer.getAddress()
        return (await contract?.allowance(address, jackpot.address)).toString()
    }

    function setupContract(linkTokenContract:LinkTokenInterface, jackpotContract:ChipsJackpot){
        setContract(linkTokenContract)
        setJackpot(jackpotContract)
    }


    return [setupContract, {approve}, {checkAllowance}]
    
}