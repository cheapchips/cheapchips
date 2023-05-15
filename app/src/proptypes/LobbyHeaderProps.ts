export default interface LobbyHeaderProps {
    theme: "dark" | "light"
    title: string
    playerCount: number
    maxPlayerCount: number
    timeTillRaffleStartPercentage: number
    lobbyId: string
}