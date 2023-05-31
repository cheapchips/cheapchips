import { createContext } from "react"
import JackpotContext from "../types/JackpotContextInterface"
import { Player } from "../types/Player"

const JackpotContext = createContext<JackpotContext>({
    roundId: undefined,
    numberOfPlayers: undefined,
    maxNumberOfPlayers: undefined,
    players: undefined,
    prizePool: undefined,
    minChipsDeposit: 1,
    defaultChipsDeposit: 1,
    maxChipsDeposit: 5,
    endDepositTime: undefined,
    endTime: undefined,
    addPlayer: (newPlayer:Player) => {},
})

export default JackpotContext