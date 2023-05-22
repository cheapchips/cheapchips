import ActiveComponent from "./ActiveComponent"

export default interface LobbyHeaderProps extends ActiveComponent {
    playerCount: number
    maxPlayerCount: number
    timeTillRaffleStartPercentage: number
    lobbyId: string
}