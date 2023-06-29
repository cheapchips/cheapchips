import JackpotContext from "./JackpotContext"
import JackpotContextProviderInterface from "../types/JackpotContextProviderInterface"
import { useEffect, useRef, useState } from "react"
import formatTicketsToPlayers from "../hooks/utils/formatTicketsToPlayers"
import RoundState from "../types/RoundState"
import { Player } from "../types/Player"
import useWeb3Context from "../hooks/useWeb3Context"
import useRunOnceOnMount from "../hooks/useRunOnceOnMount"

export default function JackpotContextProvider({children, setIsJackpotContextReady}:JackpotContextProviderInterface){
    const web3Context = useWeb3Context()

    const winnerId = useRef(-1)
    const [roundId, setRoundId] = useState<number>()
    const [players, setPlayers] = useState<Player[]>([])
    const [prizePool, setPrizePool] = useState<number>(0)
    const [endTime] = useState<number>(60)
    const [roundState, setRoundState] = useState<RoundState>("default")
    const [archivedJackpotId, setArchivedJackpotId] = useState<number>()

    function addPlayer(newPlayer:Player) {
        setPlayers(prevPlayers => [...prevPlayers, newPlayer])
    }

    function incrementRoundId() {
        setRoundId(prev => prev ? prev + 1 : 0)
    }

    function incrementPrizePool(ticketAmount:number) {
        setPrizePool(prizePool => prizePool + ticketAmount)
    }
    
    function toggleArchivedJackpotModal(roundId:number | undefined){
        setArchivedJackpotId(roundId)
    }

    useRunOnceOnMount(async() => {
        const jackpot = web3Context.jackpot

        const roundId = await jackpot.getCurrentRoundId()
        const roundData = await jackpot.getRoundData(roundId)
        const localPlayerId = await jackpot.getPlayerIdInRound(roundId)
        const players = formatTicketsToPlayers(roundData[1], localPlayerId, web3Context.address === undefined ? "" : web3Context.address)

        setPlayers(players)
        setRoundId(roundId.toNumber())
        setPrizePool(roundData[1].length)

        const roundStates:RoundState[] = ["default", "closed", "ended"]
        setRoundState(roundStates[roundData[5]])
        setIsJackpotContextReady(true)
    })

    useEffect(() => {
        if(roundState === "ended"){
          setPlayers([])
          setPrizePool(0)
          setRoundState("default")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roundId])

    return(
        <JackpotContext.Provider value={{
            roundId, 
            roundState, 
            maxPlayers: 100,  
            players, 
            prizePool, 
            endTime, 
            minChipsDeposit: 1, 
            maxChipsDeposit: 5, 
            defaultChipsDeposit: 1, 
            winnerId,
            archivedJackpotId, 
            addPlayer, 
            incrementRoundId, 
            incrementPrizePool, 
            setRoundState,
            toggleArchivedJackpotModal
        }}>
            {children}
        </JackpotContext.Provider>
    )
}