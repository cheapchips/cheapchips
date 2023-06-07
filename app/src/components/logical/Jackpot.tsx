import {useState, useEffect, useContext, useRef } from "react"
import Blockies from "react-blockies"
import useResponsiveSizes from "../../hooks/useReponsiveIconSize"
import JackpotContext from "../../contexts/JackpotContext"
import { Player } from "../../types/Player"
import _ from "lodash"

interface JackpotBlocksInterface{
    displayPlayers:(Player | null)[]
    setDisplayPlayers(players:(Player | null)[]): void
}

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
        overflow-hidden rounded-lg
    `,
    playerBlockInactive: `
        border-none
        bg-lightBgActive dark:bg-darkBgActive
        animate-pulse rounded-lg
    `,
    glassCtn: `
        absolute
        w-full h-full
        opacity-50
        backdrop-blur-3xl
    `,

    winnerBlockBgCtn: `
        absolute flex justify-center items-center w-full h-full
    `,
        
    winnerBlockCtn: `
        w-1/3 h-2/3
        flex justify-center items-center flex-col gap-4
        border border-lightBorder dark:border-darkBorder
        bg-lightBg dark:bg-darkBg
        drop-shadow-2xl rounded-lg
        transition-all duration-1000
    `,
    winnerBlockText: `
        drop-shadow-none
        font-content
    `,
}

const JackpotBlocks = ({displayPlayers, setDisplayPlayers}:JackpotBlocksInterface) => {

    const jackpotContext = useContext(JackpotContext)


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

    
    const blocksAmount = [1, 1.2, 1.4, 1.6, 1.4, 1.2, 1]
    const blocks = displayPlayers?.map((player, index) => {
        return <TestBlock blockCtnRatio={blocksAmount[index]} seed={player?.address ? player.address : "0"} key={index} active={player?.address ? true : false} />
    })
    return <>{blocks}</>
}

const TestBlock = (props:{blockCtnRatio:number, seed:string, active:boolean}) => {
    const [containerWidth, blockCtnSize, blockiesSize] = useResponsiveSizes()
    return (
        <div className={props.active ? styles.playerBlock : styles.playerBlock + styles.playerBlockInactive} style={{width: `${blockCtnSize * props.blockCtnRatio}px`, height: `${blockCtnSize * props.blockCtnRatio}px`}}>
            <Blockies seed={props.seed} size={Math.round(blockiesSize * props.blockCtnRatio)} scale={8} className={props.active ? "rounded-lg" : "hidden"}/>
        </div>
    )
}

const WinnerBlock = (props:{winner:Player | undefined}) => {

    const [fade, setFade] = useState<boolean>(false)

    useEffect(() => {
        if(!props.winner) return
        setFade(true)
    }, [props.winner])

    const [,,blockiesSize] = useResponsiveSizes()

    return (
        props.winner !== undefined
        ?
        <div className={styles.winnerBlockBgCtn}>
            <div className={styles.winnerBlockCtn + (fade ? "opacity-100" : "opacity-0")}>
                <Blockies seed={props.winner.address} size={Math.round(blockiesSize * 1.5)} scale={8} className="rounded-lg" />
                <span className={styles.winnerBlockText}>Winner!</span>
            </div>
        </div>
        :
        <></>
    )
}

const Jackpot = () => {

    const jackpotContext = useContext(JackpotContext)  
    const [animateJackpot, setAnimateJackpot] = useState<boolean>(false)
    const [animationTimer, setAnimationTimer] = useState<NodeJS.Timer>()
    const [displayPlayers, setDisplayPlayers] = useState<(Player | null)[]>(new Array(7).fill(null, 0, 7))
    const [winner, setWinner] = useState<Player | undefined>()

    useEffect(() => {
        console.log(jackpotContext.roundState)
        if(jackpotContext.roundState === "closed") setAnimateJackpot(true)
        if(jackpotContext.roundState === "ended") {
            console.log(jackpotContext.winnerId!.current)
            clearInterval(animationTimer)
            handleWinner()
        }
      }, [jackpotContext.roundState])

    useEffect(() => () => {clearInterval(animationTimer)}, [])

    function handleWinner(){
        const winner = jackpotContext.players!.find(player => player.id === jackpotContext.winnerId?.current)
        const winnerArray = new Array(7).fill(null, 0, 7)
        console.log(winner)
        winnerArray[3] = winner!
        
        // handle round END
        setDisplayPlayers(winnerArray)
        setWinner(winner)
        setTimeout(() => {
            setWinner(undefined)
            setDisplayPlayers(new Array(7).fill(null, 0, 7))
            setAnimateJackpot(false)
            jackpotContext.incrementRoundId()
        }, 5000)
    }

     useEffect(() => {
        if(!animateJackpot) return
        if(animationTimer) clearInterval(animationTimer)
        
        const timer = setInterval(() => {
            const playersCopy = _.cloneDeep(jackpotContext.players!) as (Player | null)[]
            shuffleArray(playersCopy as Player[])
            if(playersCopy.length < 7) {
                playersCopy.length = 7
                playersCopy.fill(null, jackpotContext.players?.length, 7)
            }

            const order = [3, 4, 2, 5, 1, 6, 0]
            const temp:(Player | null)[] = []
            order.forEach((value, index) => {
                temp[value] = playersCopy[index]  
            })
            setDisplayPlayers(temp)
        }, 500)

        setAnimationTimer(timer)
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

    return (
        <div className={styles.ctn}>
            <JackpotBlocks displayPlayers={displayPlayers} setDisplayPlayers={setDisplayPlayers}/>
            <WinnerBlock winner={winner}/>
            <div className={styles.glassCtn}></div>
        </div>

    )
}

export default Jackpot