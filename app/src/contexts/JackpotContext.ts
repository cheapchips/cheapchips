import { createContext } from "react"
import JackpotContextInterface from "../types/JackpotContextInterface"
import { Player } from "../types/Player"

const JackpotContext = createContext<JackpotContextInterface>({
    roundId: undefined,
    roundState: undefined,
    players: undefined,
    maxPlayers: undefined,
    prizePool: undefined,
    minChipsDeposit: 1,
    defaultChipsDeposit: 1,
    maxChipsDeposit: 5,
    endTime: undefined,
    winnerId: undefined,
    setRoundState: () => {},
    addPlayer: (newPlayer:Player) => {},
    incrementRoundId: () => {},
    incrementPrizePool: (ticketAmount:number) => {},
    toggleArchivedJackpotModal: (roundId:number) => {}
})

export default JackpotContext