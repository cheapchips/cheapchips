import { useState, useEffect, useContext } from 'react'
import PlayerList from './PlayerList'
import useResponsiveIconSize from '../../../../hooks/useReponsiveIconSize'
import JackpotContext from '../../../../contexts/JackpotContext'
import Web3Context from '../../../../contexts/Web3Context'
import _ from 'lodash'

type Player = {
  readonly address: string
  readonly ticketAmount: number
  readonly id: number
}

type JackpotProps = {
  // readonly players: Player[]
  readonly winnerId: React.MutableRefObject<number>
  readonly animated: boolean
}

const Jackpot = (props:JackpotProps) => {
    
  const [rafflePlayers, setRafflePlayers] = useState<Player[]>([])
  const [rafflePlayersCopy, setRafflePlayersCopy] = useState<Player[]>([])
  const [animationIteration, setAnimationIteration] = useState<number>(0)
  const [runEndingAnimation, setRunEndingAnimation] = useState<boolean>(false)
  
  const iconSize = useResponsiveIconSize()
  const jackpotContext = useContext(JackpotContext)
  const web3 = useContext(Web3Context)
  
  useEffect(() => {
    console.log('xd', web3.address, jackpotContext.players, jackpotContext.endDepositTime)
    if (!web3.address || !jackpotContext.players || !jackpotContext.endDepositTime) return
    setupPlayerArrays()
  }, [web3, jackpotContext])

  useEffect(() => {
    if (props.winnerId.current === -1) return
    setRunEndingAnimation(true)
    handleWinner()
  }, [animationIteration])

  function setupPlayerArrays(): void {
    const propsPlayersHardCopy = _.cloneDeep(jackpotContext.players!)
    shuffleArray(propsPlayersHardCopy)
    setRafflePlayers(propsPlayersHardCopy)
    setRafflePlayersCopy(propsPlayersHardCopy)
  }

  function shuffleArray(array: Player[]): void {
    // optimized fisher-yates
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  function handleWinner(): void {
    const winnerPlayer = jackpotContext.players!.find((player) => player.id === props.winnerId.current)
    const tempCopy = _.cloneDeep(rafflePlayersCopy)
    tempCopy[4] = winnerPlayer!
    setRafflePlayersCopy(tempCopy)
  }

  const styles = {
    container: `
        flex gap-2 items-center w-5/6 h-3/4
        border border-lightBorder dark:border-darkBorder
        rounded-md
        overflow-hidden
        backdrop-blur-3xl
        bg-transparent
        jackpot_center_bar_light
        dark:jackpot_center_bar_dark
    `,
    glassCtn: `
      absolute
      w-full h-full
      opacity-50
      backdrop-blur-3xl
    `,
    players: `
        flex h-fit gap-2
        ${props.animated ? 'jackpot_anim' : ''}
        ${runEndingAnimation ? 'jackpot_anim_ending' : ''}
    `,
  }

  const RafflePlayerList = (props: { players: Player[], playerIconSize: number}) => {
    return (
      <div onAnimationIteration={() => setAnimationIteration(animationIteration + 1)} className={styles.players} >
        <PlayerList {...props} />
      </div>
    )
  }

  return (
    <div className={styles.container} id='jackpot_container'>
        <RafflePlayerList players={rafflePlayers} playerIconSize={iconSize} />
        <RafflePlayerList players={rafflePlayersCopy} playerIconSize={iconSize} />
      <div className={styles.glassCtn}></div>
    </div>
  )
}

export default Jackpot
