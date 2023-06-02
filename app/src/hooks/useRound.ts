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
        listenForDeposit()
        listenForRandomNumber()
    }, [web3.jackpot])

    useEffect(()=> {
        console.log(jackpotContext)
    }, [jackpotContext])
    
    function listenForDeposit(){
        web3.jackpot!.on("Deposit", (from:string, id:number, amount:BigNumber) => {

            // add player
            jackpotContext.addPlayer({
                address: from === web3.address ? web3.address : id.toString(),
                ticketAmount: amount.toNumber(),
                id
            })

            // update chips balance
            const newChipsBalance = +web3.chipStableBalance! - amount.toNumber()
            web3.setChipStableBalance(newChipsBalance.toString())

            // increment prize pool by ticket entry value
            jackpotContext.incrementPrizePool(amount.toNumber())

            // handle roundState if needed
            if(jackpotContext.players!.length == 2){
                jackpotContext.setRoundState("closed")
            }

        })
    }
    
    function listenForRandomNumber(){
        web3.jackpot!.on("RoundEnded", async(roundId:BigNumber, randomNumber:BigNumber) => {
            const { tickets } = await readJackpot.getRoundData(roundId)
            const ticketWinnerIndex = randomNumber.mod(tickets.length).toNumber()
            const winnerId = tickets[ticketWinnerIndex]
            jackpotContext.winnerId!.current = winnerId
            console.log('winner id: ', winnerId)
          })
    }
}