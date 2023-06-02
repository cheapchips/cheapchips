import { useEffect, useContext } from "react"
import Web3Context from "../contexts/Web3Context"
import JackpotContext from "../contexts/JackpotContext";
import { BigNumber } from "ethers";

export default function useRound(){
    const web3 = useContext(Web3Context)
    const jackpotContext = useContext(JackpotContext)


    useEffect(() => {
        if(!web3.jackpot) return
        listenForDeposit()
    }, [web3.jackpot])

    function listenForDeposit(){
        web3.jackpot!.on("Deposit", (from:string, id:number, amount:BigNumber) => {

            jackpotContext.addPlayer({
                address: Math.random().toString(36).substring(2,9),
                ticketAmount: amount.toNumber(),
                id
            })

        })
    }
}