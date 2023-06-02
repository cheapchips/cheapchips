import LobbyElement from './LobbyElement'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState, useEffect, useContext } from "react"
import JackpotContext from '../../../../contexts/JackpotContext'

const Lobby = () => {

    const [lobbyElementsRef] = useAutoAnimate()
    const jackpotContext = useContext(JackpotContext)

    const styles = {
        ctn: `
            flex flex-col justify-start
            overflow-y-auto
        `,
    }
  
    const uniqueLobbyElements = jackpotContext.players!.map((player, index) => (
        <LobbyElement player={player} maxTicketsPerPlayer={5} key={index} />
    ))

    return (
        <div className={styles.ctn} ref={lobbyElementsRef}>
            {uniqueLobbyElements}
        </div>
    )
}

export default Lobby
