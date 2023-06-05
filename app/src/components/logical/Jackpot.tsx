import {useState, useEffect, useContext} from "react"
import Blockies from "react-blockies"
import useResponsiveSizes from "../../hooks/useReponsiveIconSize"
import JackpotContext from "../../contexts/JackpotContext"
import { Player } from "../../types/Player"



const Jackpot = () => {
    
    const styles = {
        playerBlock: `
            flex justify-center items-center
            border border-lightBorder dark:border-darkBorder
            overflow-hidden rounded-md
        `,
        playerBlockInactive: `
            border-none
            bg-lightBgActive dark:bg-darkBgActive
            animate-pulse
        `,
    }

    const jackpotContext = useContext(JackpotContext)  
    const [containerWidth, blockCtnSize, blockiesSize] = useResponsiveSizes()
    const [displayPlayers, setDisplayPlayers] = useState<(Player | null)[]>(new Array(7).fill(null, 0, 7))

    useEffect(() => {
        if(jackpotContext.players?.length === 0) return
        const order = [3, 4, 2, 5, 1, 6, 0]
        const players = jackpotContext.players
        const display = new Array<Player | null>(7).fill(null, 0 ,7)

        players?.slice().reverse().forEach((player, index) => {            
            display[order[index]] = player
        })

        setDisplayPlayers(display)


    }, [jackpotContext.players])

    const JackpotBlocks = () => {
        const blocksAmount = [1, 1.2, 1.4, 1.6, 1.4, 1.2, 1]
        const blocks = displayPlayers?.map((player, index) => {
            return <TestBlock blockCtnRatio={blocksAmount[index]} seed={player?.address ? player.address : "0"} key={index} active={player?.address ? true : false} />
        })
        return <>{blocks}</>
    }

    const TestBlock = (props:{blockCtnRatio:number, seed:string, active:boolean}) => {
        return (
            <div className={props.active ? styles.playerBlock : styles.playerBlock + styles.playerBlockInactive} style={{width: `${blockCtnSize * props.blockCtnRatio}px`, height: `${blockCtnSize * props.blockCtnRatio}px`}}>
                <Blockies seed={props.seed} size={Math.round(blockiesSize * props.blockCtnRatio)} scale={8} className={props.active ? "" : "hidden"}/>
            </div>
        )
    }




    return (
        <div className="flex flex-row justify-center items-center overflow-hidden gap-2">
            <JackpotBlocks />
        </div>




    )
}

export default Jackpot