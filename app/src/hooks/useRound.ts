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
        web3.jackpot!.removeAllListeners("Closed")
        web3.jackpot!.removeAllListeners("Withdrawal")
        web3.chipStable!.removeAllListeners("Transfer")

        listenForChipsWithdrawal()
        listenForChipsDeposit()
        listenForRandomNumber()
        listenForClose()
        listenForMint()
    }, [jackpotContext.roundId])

    function listenForMint(){
        web3.chipStable!.on("Transfer", (from:string, to:string, amount:BigNumber) => {
            if(from === "0x0000000000000000000000000000000000000000" && to === web3.address){
                const newBalance = +web3.chipStableBalance! + amount.toNumber()
                web3.setChipStableBalance(newBalance.toString())
            }
        })
    }
    
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

    function listenForChipsWithdrawal() {
        web3.jackpot!.on("Withdrawal", (to:string, amount:BigNumber) => {
            if(web3.address === to){
                const newBalance = Number(web3.chipStableBalance) + amount.toNumber()
                web3.setChipStableBalance(newBalance.toString())
            }
        })
    }

    function listenForClose(){
        web3.jackpot!.on("Closed", (roundId:BigNumber) => {
            if(roundId.toNumber() == jackpotContext.roundId){
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
            jackpotContext.setRoundState("ended")
          })
    }
}