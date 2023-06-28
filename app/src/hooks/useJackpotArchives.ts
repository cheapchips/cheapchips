import { useContext, useEffect, useState } from "react";
import Web3Context from "../contexts/Web3Context";
import JackpotContext from "../contexts/JackpotContext";
import ArchivedJackpot from "../types/ArchivedJackpot";
import useJackpot from "./useJackpot";
import { ChipsJackpotCoreInterface } from "../../../contracts/typechain-types";

export default function useJackpotArchives():ArchivedJackpot[]{
    const web3Context = useContext(Web3Context)
    const jackpotContext = useContext(JackpotContext)
    const [,readJackpot] = useJackpot()

    const [archivedRounds, setArchivedRounds] = useState<ArchivedJackpot[]>([])
    const [initialized, setInitialized] = useState<boolean>(false)


    useEffect(() => {
        if(jackpotContext && !initialized){
            (async() => {
                if(!jackpotContext.roundId) return
                const rounds = await readJackpot.getRoundDataRange(jackpotContext.roundId - 10, jackpotContext.roundId - 1) as ChipsJackpotCoreInterface.ArchivedRoundStructOutput[]
                console.log(rounds)
                setInitialized(true)
            })()
            
        }

    },[jackpotContext, initialized])


    return archivedRounds
}