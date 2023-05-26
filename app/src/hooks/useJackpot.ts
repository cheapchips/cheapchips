import { useState } from "react";
import { ChipsJackpot } from "../../../contracts/typechain-types";
import useTrasaction from "./useTransaction";
import { etherToWei, weiToEther } from "./utils/convertion";
import { BigNumber } from "ethers";

interface RoundData {
    id: number,
    numberOfPlayers: number,
    tickets: number[],
    endTime: BigNumber,
    randomNumber: BigNumber
}


export default function useJackpot():[(contract:ChipsJackpot) => void, any, any]{

    const [contract, setContract] = useState<ChipsJackpot>()

    const [txStatus, performTx] = useTrasaction()


    function depositFees(amount:number){
        if(!contract) return
        performTx(contract.depositFees, etherToWei(amount))
    }

    async function checkFeesBalance(){
        if(!contract) return
        return weiToEther(await contract.balanceFees())
    }

    function deposit(amount: number){
        if(!contract) return
        performTx(contract.deposit, amount)
        
    }

    async function getCurrentRoundId(){
        if(!contract) return
        return (await contract.getCurrentRoundId()).toString()
    }

    async function getRoundData(id:number):Promise<RoundData | undefined>{
        if(!contract) return

        const [numberOfPlayers, tickets,, endTime, randomNumber] = await contract.getRoundData(id)

        return {
            id,
            numberOfPlayers,
            tickets,
            endTime,
            randomNumber
        } 
    }
    

    // debug

    async function checkUpkeep(){
        if(!contract) return
        return (await contract.checkUpkeep("0x"))
    }

    async function getTotalFeeForLastRound(){
        if(!contract) return
        return (await contract.getTotalFeeForLastRound()).toString()
    }


    function closeRound(){
        if(!contract) return
        performTx(contract.closeRound)
    }



    function setupContract(contract:ChipsJackpot){
        setContract(contract)
    }



    return [
        setupContract, 
        {depositFees, deposit, closeRound}, 
        {checkFeesBalance, getCurrentRoundId, getRoundData, getTotalFeeForLastRound}
    ]
    
}