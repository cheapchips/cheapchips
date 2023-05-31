import { useState, useContext, useEffect } from "react";
import { etherToWei, weiToEther } from "./utils/convertion";
import { BigNumber } from "ethers";
import Web3Context from "../contexts/Web3Context";
import useContractFunction from "./useContractFunction";


interface RoundData {
    id: number,
    numberOfPlayers: number,
    tickets: number[],
    endTime: BigNumber,
    randomNumber: BigNumber
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

    async function getRoundData(id:number):Promise<RoundData | undefined>{
        const [numberOfPlayers, tickets,, endTime, randomNumber] = await web3.jackpot!.getRoundData(id)

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
        {checkFeesBalance, getCurrentRoundId, getRoundData, getTotalFeeForLastRound}
    ]
    
}