import { useEffect } from "react"

import { BigNumber } from "ethers";
import useJackpot from "./useJackpot";
import useWeb3Context from "./useWeb3Context";
import useJackpotContext from "./useJackpotContext";

export default function useRound(){
    const web3Context = useWeb3Context()
    const jackpotContext = useJackpotContext()
    const [,readJackpot ] = useJackpot()

    useEffect(() => {
        web3Context.jackpot.removeAllListeners("Deposit")
        web3Context.jackpot.removeAllListeners("RoundEnded")
        web3Context.jackpot.removeAllListeners("Closed")
        web3Context.jackpot.removeAllListeners("Withdrawal")
        web3Context.chipStable.removeAllListeners("Transfer")

        listenForChipsWithdrawal()
        listenForChipsDeposit()
        listenForRandomNumber()
        listenForClose()
        listenForMint()
    }, [jackpotContext.roundId])

    function listenForMint(){
        web3Context.chipStable.on("Transfer", (from:string, to:string, amount:BigNumber) => {
            if(from === "0x0000000000000000000000000000000000000000" && to === web3Context.address){
                const newBalance = +web3Context.chipStableBalance + amount.toNumber()
                web3Context.setChipStableBalance(newBalance.toString())
            }
        })
    }
    
    function listenForChipsDeposit(){
        web3Context.jackpot.on("Deposit", (from:string, id:number, amount:BigNumber) => {
            jackpotContext.addPlayer({
                address: from === web3Context.address ? web3Context.address : id.toString(),
                ticketAmount: amount.toNumber(),
                id
            })
            const newChipsBalance = +web3Context.chipStableBalance - amount.toNumber()
            web3Context.setChipStableBalance(newChipsBalance.toString())
            jackpotContext.incrementPrizePool(amount.toNumber())
        })
    }

    function listenForChipsWithdrawal() {
        web3Context.jackpot.on("Withdrawal", (to:string, amount:BigNumber) => {
            if(web3Context.address === to){
                const newBalance = Number(web3Context.chipStableBalance) + amount.toNumber()
                web3Context.setChipStableBalance(newBalance.toString())
            }
        })
    }

    function listenForClose(){
        web3Context.jackpot.on("Closed", (roundId:BigNumber) => {
            if(roundId.toNumber() == jackpotContext.roundId){
                jackpotContext.setRoundState("closed")
            }
        })
    }

    function listenForRandomNumber(){
        web3Context.jackpot.on("RoundEnded", async(roundId:BigNumber, randomNumber:BigNumber) => {

            const { tickets } = await readJackpot.getRoundData(roundId)
            const ticketWinnerIndex = randomNumber.mod(tickets.length).toNumber()
            const winnerId = tickets[ticketWinnerIndex]
            
            jackpotContext.winnerId!.current = winnerId
            jackpotContext.setRoundState("ended")
          })
    }
}