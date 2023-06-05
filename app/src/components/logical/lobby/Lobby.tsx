import LobbyElement from './LobbyElement'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState, useEffect, useContext } from "react"
import JackpotContext from '../../../contexts/JackpotContext'

const styles = {
    ctn: `
        flex flex-col justify-start
        overflow-y-auto
        overflow-x-hidden
    `,
    lobbyListCtn: `
        flex flex-col-reverse justify-end
    `,
    inactiveLobbyElementCtn: `
        flex flex-col gap-2
        p-2
    `,
    inactiveLobbyElement: `
        w-full h-[5.25rem]
        rounded-md
        bg-lightBgActive dark:bg-darkBgActive
        animate-pulse
    `,
}


const ActiveLobby = () => {
    const jackpotContext = useContext(JackpotContext)
    if(!jackpotContext.players) return <></>
    const uniqueLobbyElements = jackpotContext.players.map((player, index) => (
        <LobbyElement player={player} maxTicketsPerPlayer={5} key={index} />
    ))
    return <>{uniqueLobbyElements}</>
}

const InactiveLobby = () => {
    const inactiveOpacities = [100, 85, 70, 55, 40, 25, 10]
    const inactiveLobbyElements = inactiveOpacities.map((opacity, index) => (
        <div className={styles.inactiveLobbyElement} style={{opacity: `${opacity}%`}} key={index}></div>
    ))
    return (
        <div className={styles.inactiveLobbyElementCtn}>
            {inactiveLobbyElements}
        </div>
    )
}

const Lobby = () => {

    const [lobbyElementsRef] = useAutoAnimate()
    const jackpotContext = useContext(JackpotContext)
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        console.log("UPDATE PLAYERS")
        if(jackpotContext.players!.length <= 0){
            setActive(false)
            return
        }
        if(active) return
        setActive(true)
      
    }, [jackpotContext.players])
    
    return (
        <div className={styles.ctn} >
            {active
            ?
                <div ref={lobbyElementsRef} className={styles.lobbyListCtn}>
                <ActiveLobby />
                </div>
            :
                <InactiveLobby />
            }
        </div>
    )
}

export default Lobby
