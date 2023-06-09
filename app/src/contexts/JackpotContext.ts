import { createContext } from "react"
import JackpotContextInterface from "../types/JackpotContextInterface"

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
    addPlayer: () => {},
    incrementRoundId: () => {},
    incrementPrizePool: () => {},
    toggleArchivedJackpotModal: () => {}
})

export default JackpotContext