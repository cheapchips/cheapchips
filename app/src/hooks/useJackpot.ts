import { etherToWei, weiToEther } from "./utils/web3unitsConversion";
import useContractFunction from "./useContractFunction";
import useWeb3Context from "./useWeb3Context";
import { useEffect } from "react";



interface RoundData {
    id: number,
    numberOfPlayers: number,
    tickets: number[],
    endTime: Date,
    winnerId: number,
    status: number
}


export default function useJackpot():[any, any]{

    const web3Context = useWeb3Context()

    useEffect(() => {
        console.log(web3Context.jackpot)
    }, [web3Context.jackpot])

    // illegallll
    const [performDepositTx] = useContractFunction(web3Context.jackpot!.deposit!)
    const [performDepositFeesTx] = useContractFunction(web3Context.jackpot!.depositFees!)
    const [performCloseRoundTx] = useContractFunction(web3Context.jackpot!.closeRound!)
    const [performWithdrawTx] = useContractFunction(web3Context.jackpot!.withdrawPrize!)

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
        if(!web3Context.jackpot) return
        return weiToEther(await web3Context.jackpot.balanceFees())
    }

    async function getCurrentRoundId(){
        if(!web3Context.jackpot) return
        return (await web3Context.jackpot.getCurrentRoundId()).toString()
    }

    async function getPlayerIdInRound(roundId:number){
        if(!web3Context.jackpot) return
        const {id, exists} = await web3Context.jackpot.getPlayerIdInRound(roundId)
        if(exists) return id;
        return undefined;
    }

    async function getParticipationStatus(roundId:number) {
        if(!web3Context.jackpot) return
        const status = await web3Context.jackpot.getParticipationStatus(roundId)

        switch(status){
            case 0: return "none"
            case 1: return "win"
            case 2: return "lose"
            case 3: return "withdrawn"
        }
    }
    async function getRoundData(roundId:number):Promise<RoundData | undefined>{
        if(!web3Context.jackpot) return
        const [numberOfPlayers, tickets,, endTime, randomNumber, status] = await web3Context.jackpot.getRoundData(roundId)
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
        if(!web3Context.jackpot) return
        const rounds = await web3Context.jackpot.getRoundDataRange(startId, stopId)
        return rounds
    }
    

    // debug

    async function checkUpkeep(){
        if(!web3Context.jackpot) return
        return (await web3Context.jackpot.checkUpkeep("0x"))
    }

    async function getTotalFeeForLastRound(){
        if(!web3Context.jackpot) return
        return (await web3Context.jackpot.getTotalFeeForLastRound()).toString()
    }

    return [
        {depositFees, deposit, closeRound, withdrawPrize}, 
        {checkFeesBalance, getCurrentRoundId, getRoundData, getRoundDataRange, getTotalFeeForLastRound, getPlayerIdInRound, getParticipationStatus, checkUpkeep}
    ]
    
}