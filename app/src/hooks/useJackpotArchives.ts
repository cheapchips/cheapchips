import { useEffect, useState } from "react";
import ArchivedJackpot from "../types/ArchivedJackpot";
import useJackpot from "./useJackpot";
import { ChipsJackpotCoreInterface } from "../../../contracts/typechain-types";
import useWeb3Context from "./useWeb3Context";
import useJackpotContext from "./useJackpotContext";

export default function useJackpotArchives():ArchivedJackpot[]{
    const web3Context = useWeb3Context()
    const jackpotContext = useJackpotContext()
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