import { Player } from "../../types/Player";

export default function formatTicketsToPlayers(tickets:number[]): Player[] {
    
    const players:Player[] = []
    const playerTickets: {[key: number]: number} = {}
    for (const id of tickets) {
      playerTickets[id] = playerTickets[id] ? playerTickets[id] + 1 : 1;
    }

    Object.values(playerTickets).map((ticket, index) => {
      players.push({
        address: Math.random().toString(36).substring(2,9),
        ticketAmount: ticket,
        id: index
      })
    })

    return players
}