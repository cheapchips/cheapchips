import { Player } from "./Player";

export default interface JackpotContextInterface{
    roundId: string | undefined
    numberOfPlayers: number | undefined
    maxNumberOfPlayers: number | undefined
    players:Player[] | undefined
    prizePool: number | undefined
    minChipsDeposit: number | undefined
    maxChipsDeposit: number | undefined
    defaultChipsDeposit: number | undefined
    endDepositTime: number | undefined // in seconds
    endTime: number | undefined
    addPlayer: (newPlayer:Player) => void
}