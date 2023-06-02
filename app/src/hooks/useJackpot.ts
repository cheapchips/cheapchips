import { useState, useContext, useEffect } from "react";
import { etherToWei, weiToEther } from "./utils/web3unitsConversion";
import { BigNumber } from "ethers";
import Web3Context from "../contexts/Web3Context";
import useContractFunction from "./useContractFunction";



interface RoundData {
    id: number,
    numberOfPlayers: number,
    tickets: number[],
    endTime: Date,
    randomNumber: BigNumber,
    status: number
}


export default function useJackpot():[any, any]{

    const web3 = useContext(Web3Context)

    const [performDepositTx] = useContractFunction(web3.jackpot?.deposit!)
    const [performDepositFeesTx] = useContractFunction(web3.jackpot?.depositFees!)
    const [performCloseRoundTx] = useContractFunction(web3.jackpot?.closeRound!)



    function depositFees(amount:number){
        performDepositFeesTx(etherToWei(amount))
    }

    async function checkFeesBalance(){
        return weiToEther(await web3.jackpot!.balanceFees())
    }

    function deposit(amount: number){
        performDepositTx(amount)
    }

    async function getCurrentRoundId(){
        return (await web3.jackpot!.getCurrentRoundId()).toString()
    }

    async function getPlayerIdInRound(roundId:number){
        return await web3.jackpot!.getPlayerIdInRound(roundId)
    }

    async function getParticipationStatus(roundId:number) {
        const status = await web3.jackpot!.getParticipationStatus(roundId)

        switch(status){
            case 0: return "none"
            case 1: return "win"
            case 2: return "lose"
            case 3: return "withdrawn"
        }
    }
    async function getRoundData(roundId:number):Promise<RoundData | undefined>{
        const [numberOfPlayers, tickets,, endTime, randomNumber, status] = await web3.jackpot!.getRoundData(roundId)
        const formattedEndTime = new Date(endTime.toNumber() * 1000)


        return {
            id: roundId,
            numberOfPlayers,
            tickets,
            endTime: formattedEndTime,
            randomNumber,
            status
        } 
    }
    

    // debug

    async function checkUpkeep(){
        return (await web3.jackpot!.checkUpkeep("0x"))
    }

    async function getTotalFeeForLastRound(){
        return (await web3.jackpot!.getTotalFeeForLastRound()).toString()
    }


    function closeRound(){
        performCloseRoundTx()
    }


    return [
        {depositFees, deposit, closeRound}, 
        {checkFeesBalance, getCurrentRoundId, getRoundData, getTotalFeeForLastRound, getPlayerIdInRound, getParticipationStatus, checkUpkeep}
    ]
    
}