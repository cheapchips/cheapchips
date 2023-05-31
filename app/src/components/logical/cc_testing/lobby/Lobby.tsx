import LobbyElement from './LobbyElement'
import { useAutoAnimate } from '@formkit/auto-animate/react'

type Player = {
  readonly address: string
  readonly ticketAmount: number
  readonly id: number
}

type LobbyProps = {
  readonly players: Player[]
  readonly playerCount: number
  readonly ticketImgSrc: string
  readonly maxTicketsPerPlayer: number
}

const Lobby = (props: LobbyProps) => {

    const styles = {
        ctn: `
            flex flex-col justify-start
            overflow-y-auto
        `,
    }
  
    const uniquePlayers = Array.from(new Set(props.players))
    const uniqueLobbyElements = uniquePlayers.map((player, index) => (
        <LobbyElement player={player} maxTicketsPerPlayer={props.maxTicketsPerPlayer} key={index} />
    ))
    const [lobbyElementsRef] = useAutoAnimate()

    return (
        <div className={styles.ctn} ref={lobbyElementsRef}>
            {uniqueLobbyElements}
        </div>
    )
}

export default Lobby
