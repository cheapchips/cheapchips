import ActiveComponent from "./ActiveComponent";

export default interface JackpotInfoProps extends ActiveComponent {
    prizePool: number
    jackpotRoundId: number
    playerCount: number
    maxPlayerCount: number
    maxDepositAmount: number
    timeLeftTillJackpot: number
    maxTimeLeftTillJackpot: number
}