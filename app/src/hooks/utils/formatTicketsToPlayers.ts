import { Player } from "../../types/Player";

export default function formatTicketsToPlayers(tickets:number[], localPlayerId:number, localAddress:string): Player[] {
    
    const players:Player[] = []
    const playerTickets: {[key: number]: number} = {}
    for (const id of tickets) {
      playerTickets[id] = playerTickets[id] ? playerTickets[id] + 1 : 1;
    }

    Object.values(playerTickets).map((ticket, index) => {
      players.push({
        address: Object.keys(playerTickets)[index] === localPlayerId.toString() ? localAddress : "00000llffffff" + index.toString(),
        ticketAmount: ticket,
        id: index
      })
    })

    return players
}