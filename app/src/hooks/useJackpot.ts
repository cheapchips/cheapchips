import { useState, useContext, useEffect } from "react";
import { ChipsJackpot } from "../../../contracts/typechain-types";
import useTrasaction from "./useContractFunction";
import { etherToWei, weiToEther } from "./utils/convertion";
import { BigNumber } from "ethers";
import Web3Context from "../contexts/Web3Context";


interface RoundData {
    id: number,
    numberOfPlayers: number,
    tickets: number[],
    endTime: BigNumber,
    randomNumber: BigNumber
}


export default function useJackpot():[any, any]{

    const web3 = useContext(Web3Context)

    const [performDepositTx] = useTrasaction(web3.jackpot?.deposit!)
    const [performDepositFeesTx] = useTrasaction(web3.jackpot?.depositFees!)
    const [performCloseRoundTx] = useTrasaction(web3.jackpot?.closeRound!)

    const [contract, setContract] = useState<ChipsJackpot>()

    useEffect(() => {
        const {jackpot} = web3
        setContract(jackpot)
    }, [])


    function depositFees(amount:number){
        if(!contract) return
        performDepositFeesTx(etherToWei(amount))
    }

    async function checkFeesBalance(){
        if(!contract) return
        return weiToEther(await contract.balanceFees())
    }

    function deposit(amount: number){
        if(!contract) return
        performDepositTx(amount)
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
        performCloseRoundTx()
    }


    return [
        {depositFees, deposit, closeRound}, 
        {checkFeesBalance, getCurrentRoundId, getRoundData, getTotalFeeForLastRound}
    ]
    
}