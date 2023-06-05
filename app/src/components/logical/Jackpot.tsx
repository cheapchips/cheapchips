import {useState, useEffect, useContext} from "react"
import Blockies from "react-blockies"
import useResponsiveSizes from "../../hooks/useReponsiveIconSize"
import JackpotContext from "../../contexts/JackpotContext"
import { Player } from "../../types/Player"

const Jackpot = () => {
    
    const styles = {
        ctn: `
            flex flex-row justify-center items-center w-full h-full
            overflow-hidden
            backdrop-blur-3xl
            gap-2
        `,
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
        glassCtn: `
            absolute
            w-full h-full
            opacity-50
            backdrop-blur-3xl
        `,
    }

    const jackpotContext = useContext(JackpotContext)  
    const [containerWidth, blockCtnSize, blockiesSize] = useResponsiveSizes()
    const [displayPlayers, setDisplayPlayers] = useState<(Player | null)[]>(new Array(7).fill(null, 0, 7))
    const [animateJackpot, setAnimateJackpot] = useState<boolean>(false)
    const [animationTimer, setAnimationTimer] = useState<NodeJS.Timer>()

    useEffect(() => {
        console.log(jackpotContext.roundState)
        if(jackpotContext.roundState === "closed") setAnimateJackpot(true)
      }, [jackpotContext.roundState])

    useEffect(() => () => {clearInterval(animationTimer)}, [])

    useEffect(() => {
        if(!animateJackpot) return

        const animationTimer = setInterval(() => {
            const playersShuffled = shuffleArray(jackpotContext.players!)
            setDisplayPlayers(playersShuffled.slice(0, 7))
        }, 1000)

        setAnimationTimer(animationTimer)
    }, [animateJackpot])

    function shuffleArray(array: Player[]): Array<Player> {
        // optimized fisher-yates
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }

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
        <>
        <div className={styles.ctn}>
            <>
            <JackpotBlocks />
            <div className={styles.glassCtn}></div>
            </>
        </div>
        </>




    )
}

export default Jackpot