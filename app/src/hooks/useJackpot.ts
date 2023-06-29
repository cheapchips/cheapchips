import { etherToWei, weiToEther } from "./utils/web3unitsConversion";
import useContractFunction from "./useContractFunction";
import useWeb3Context from "./useWeb3Context";
import { ChipsJackpotCoreInterface } from "../../../contracts/typechain-types";
import ParticipationStatus from "../types/ParticipationStatus";

interface RoundData {
    id: number,
    numberOfPlayers: number,
    tickets: number[],
    endTime: Date,
    winnerId: number,
    status: number
}

interface UseJackpotWriteInterface{
    depositFees: (amount:number) => void
    deposit: (amount:number) => void
    closeRound: () => void
    withdrawPrize: (roundId:number) => void
}

interface UseChipStableReadInterface{
    checkFeesBalance: () => Promise<string>
    getCurrentRoundId: () => Promise<string>
    getRoundData: (roundId: number) => Promise<RoundData>
    getRoundDataRange: (startId:number, stopId: number) => Promise<ChipsJackpotCoreInterface.ArchivedRoundStructOutput[]>
    getTotalFeeForLastRound: () => Promise<string>
    getPlayerIdInRound: (roundId: number) => Promise<number | undefined>
    getParticipationStatus: (roundId: number) => Promise<ParticipationStatus>
    checkUpkeep: () => Promise<[boolean, string] & {upkeepNeeded: boolean; perfomData: string}>    

}

type UseJackpotInterface = [UseJackpotWriteInterface, UseChipStableReadInterface]


export default function useJackpot():UseJackpotInterface{

    const web3Context = useWeb3Context()

    const [performDepositTx] = useContractFunction(web3Context.jackpot.deposit)
    const [performDepositFeesTx] = useContractFunction(web3Context.jackpot.depositFees)
    const [performCloseRoundTx] = useContractFunction(web3Context.jackpot.closeRound)
    const [performWithdrawTx] = useContractFunction(web3Context.jackpot.withdrawPrize)

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
        return weiToEther(await web3Context.jackpot.balanceFees())
    }

    async function getCurrentRoundId(){
        return (await web3Context.jackpot.getCurrentRoundId()).toString()
    }

    async function getPlayerIdInRound(roundId:number){
        const {id, exists} = await web3Context.jackpot.getPlayerIdInRound(roundId)
        if(exists) return id;
        return undefined;
    }

    async function getParticipationStatus(roundId:number):Promise<ParticipationStatus> {
        const status = await web3Context.jackpot.getParticipationStatus(roundId)

        switch(status){
            case 0: return "none"
            case 1: return "win"
            case 2: return "lose"
            case 3: return "withdrawn"
            default: return "none"
        }
    }
    async function getRoundData(roundId:number):Promise<RoundData>{
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
        const rounds = await web3Context.jackpot.getRoundDataRange(startId, stopId)
        return rounds
    }
    

    // debug

    async function checkUpkeep(){
        return (await web3Context.jackpot.checkUpkeep("0x"))
    }

    async function getTotalFeeForLastRound(){
        return (await web3Context.jackpot.getTotalFeeForLastRound()).toString()
    }

    return [
        {depositFees, deposit, closeRound, withdrawPrize}, 
        {checkFeesBalance, getCurrentRoundId, getRoundData,
         getRoundDataRange, getTotalFeeForLastRound, getPlayerIdInRound,
         getParticipationStatus, checkUpkeep
        }
    ]
    
}