import { useEffect, useContext } from "react"
import Web3Context from "../contexts/Web3Context"
import JackpotContext from "../contexts/JackpotContext";
import { BigNumber } from "ethers";
import useJackpot from "./useJackpot";

export default function useRound(){
    const web3 = useContext(Web3Context)
    const jackpotContext = useContext(JackpotContext)
    const [,readJackpot ] = useJackpot()

    useEffect(() => {
        if(!web3.jackpot) return
        web3.jackpot!.removeAllListeners("Deposit")
        web3.jackpot!.removeAllListeners("RoundEnded")


        listenForChipsDeposit()
        listenForRandomNumber()
    }, [web3.jackpot])

    useEffect(()=> {
        if(jackpotContext.players?.length! >= 3){
            if(jackpotContext.roundState === "closed") return
            jackpotContext.setRoundState("closed")
        }
    }, [jackpotContext.players])
    
    function listenForChipsDeposit(){
        web3.jackpot!.on("Deposit", (from:string, id:number, amount:BigNumber) => {
            jackpotContext.addPlayer({
                address: from === web3.address ? web3.address : id.toString(),
                ticketAmount: amount.toNumber(),
                id
            })
            const newChipsBalance = +web3.chipStableBalance! - amount.toNumber()
            web3.setChipStableBalance(newChipsBalance.toString())
            jackpotContext.incrementPrizePool(amount.toNumber())
        })
    }

    // function listenForChipsWithdrawal() {
    //     web3.jackpot!.on("Withdrawal", () => {
            
    //     })
    // }

    function listenForRandomNumber(){
        web3.jackpot!.on("RoundEnded", async(roundId:BigNumber, randomNumber:BigNumber) => {

            const { tickets } = await readJackpot.getRoundData(roundId)
            const ticketWinnerIndex = randomNumber.mod(tickets.length).toNumber()
            const winnerId = tickets[ticketWinnerIndex]
            
            jackpotContext.winnerId!.current = winnerId
            jackpotContext.setRoundState("ended")
            jackpotContext.incrementRoundId()
            // clean players
            // jackpotContext.setRoundState("default")
            console.log('winner id: ', winnerId)
          })
    }
}