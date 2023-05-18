import ActiveComponent from "./ActiveComponent"

export default interface LobbyHeaderProps extends ActiveComponent {
    title: string
    playerCount: number
    maxPlayerCount: number
    timeTillRaffleStartPercentage: number
    lobbyId: string
}