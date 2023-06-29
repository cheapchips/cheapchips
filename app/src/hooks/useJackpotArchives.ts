import { useEffect, useRef, useState } from "react";
import ArchivedJackpot from "../types/ArchivedJackpot";
import useJackpot from "./useJackpot";
import { ChipsJackpotCoreInterface } from "../../../contracts/typechain-types";
import useWeb3Context from "./useWeb3Context";
import useJackpotContext from "./useJackpotContext";
import useRunOnceOnMount from "./useRunOnceOnMount";
import ParticipationStatus from "../types/ParticipationStatus";

export default function useJackpotArchives():ArchivedJackpot[]{
    const web3Context = useWeb3Context()
    const jackpotContext = useJackpotContext()
    const [,readJackpot] = useJackpot()

    const [archivedRounds, setArchivedRounds] = useState<ArchivedJackpot[]>([])
    const [previousRoundId, setPreviousRoundId] = useState<number>()
    
    const previousChipStableBalance = useRef<string>("0")

    useRunOnceOnMount(() => {
        fetchArchivedRounds()
        setPreviousRoundId(jackpotContext.roundId)
        previousChipStableBalance.current = web3Context.chipStableBalance
    })

    useEffect(() => {
        console.log(jackpotContext.roundId)
    }, [jackpotContext.roundId])

    useEffect(() => {
        if(previousChipStableBalance.current !== web3Context.chipStableBalance){
            setArchivedRounds([])
            fetchArchivedRounds()
            previousChipStableBalance.current = web3Context.chipStableBalance
        }
    
    }, [web3Context.chipStableBalance])


    // useCallback - roundId changes -> refetch
    async function fetchArchivedRounds () {

        const rounds = await readJackpot.getRoundDataRange(0, jackpotContext.roundId === undefined ? 0 :  jackpotContext.roundId - 1) as ChipsJackpotCoreInterface.ArchivedRoundStructOutput[]

        const participationStatus:ParticipationStatus[] = ["none", "win", "lose", "withdrawn"]

        const archivedRounds = rounds.slice(0).reverse().map<ArchivedJackpot>((round) => ({
            prizePool: round.prizePool.toNumber(),
            participationStatus: participationStatus[round.playerParticipationStatus],
            participantId: round.playerId,
            endTime: new Date(round.endTime.toNumber() * 1000).toLocaleDateString("en-US"),
            roundId: round.id.toNumber()
        }))

        setArchivedRounds(archivedRounds)
    }

    // useEffect(() => {
    //     if(jackpotContext && !initialized){
    //         (async() => {
    //             if(!jackpotContext.roundId) return
    //             const rounds = await readJackpot.getRoundDataRange(jackpotContext.roundId - 10, jackpotContext.roundId - 1) as ChipsJackpotCoreInterface.ArchivedRoundStructOutput[]
    //             console.log(rounds)
    //             setInitialized(true)
    //         })()
            
    //     }

    // },[jackpotContext, initialized])


    return archivedRounds
}