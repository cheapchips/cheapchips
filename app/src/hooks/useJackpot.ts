import { useState, useContext, useEffect } from "react";
import { etherToWei, weiToEther } from "./utils/web3unitsConversion";
import Web3Context from "../contexts/Web3Context";
import useContractFunction from "./useContractFunction";



interface RoundData {
    id: number,
    numberOfPlayers: number,
    tickets: number[],
    endTime: Date,
    winnerId: number,
    status: number
}


export default function useJackpot():[any, any]{

    const web3 = useContext(Web3Context)

    const [performDepositTx] = useContractFunction(web3.jackpot?.deposit!)
    const [performDepositFeesTx] = useContractFunction(web3.jackpot?.depositFees!)
    const [performCloseRoundTx] = useContractFunction(web3.jackpot?.closeRound!)
    const [performWithdrawTx] = useContractFunction(web3.jackpot?.withdrawPrize!)

    function depositFees(amount:number){
        performDepositFeesTx(etherToWei(amount))
    }

    function deposit(amount: number){
        performDepositTx(amount)
    }

    function closeRound(){
        performCloseRoundTx()
    }

    function withdrawPrize(roundId:number) {
        performWithdrawTx(roundId)
    }

    async function checkFeesBalance(){
        return weiToEther(await web3.jackpot!.balanceFees())
    }

    async function getCurrentRoundId(){
        return (await web3.jackpot!.getCurrentRoundId()).toString()
    }

    async function getPlayerIdInRound(roundId:number){
        const {id, exists} = await web3.jackpot!.getPlayerIdInRound(roundId)
        if(exists) return id;
        return undefined;
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
        const formattedWinnerIndex = tickets.length > 0 ?  randomNumber.mod(tickets.length).toNumber() : -1
        const formattedWinnerId = tickets[formattedWinnerIndex]

        return {
            id: roundId,
            numberOfPlayers,
            tickets,
            endTime: formattedEndTime,
            winnerId: formattedWinnerId,
            status
        } 
    }

    async function getRoundDataRange(startId:number, stopId: number){
        const rounds = await web3.jackpot!.getRoundDataRange(startId, stopId)
        return rounds
    }
    

    // debug

    async function checkUpkeep(){
        return (await web3.jackpot!.checkUpkeep("0x"))
    }

    async function getTotalFeeForLastRound(){
        return (await web3.jackpot!.getTotalFeeForLastRound()).toString()
    }

    return [
        {depositFees, deposit, closeRound, withdrawPrize}, 
        {checkFeesBalance, getCurrentRoundId, getRoundData, getRoundDataRange, getTotalFeeForLastRound, getPlayerIdInRound, getParticipationStatus, checkUpkeep}
    ]
    
}