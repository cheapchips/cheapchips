import { Player } from "./Player";
import RoundState from "./RoundState";

export default interface JackpotContextInterface{
    roundId: number | undefined
    roundState: RoundState | undefined
    players:Player[] | undefined
    maxPlayers: number | undefined
    prizePool: number | undefined
    minChipsDeposit: number | undefined
    maxChipsDeposit: number | undefined
    defaultChipsDeposit: number | undefined
    endTime: number | undefined
    winnerId: React.MutableRefObject<number> | undefined
    addPlayer: (newPlayer:Player) => void
    incrementRoundId: () => void
    incrementPrizePool: (ticketAmount:number) => void
    setRoundState: (state: RoundState) => void
    toggleArchivedJackpotModal: (roundId:number) => void
}