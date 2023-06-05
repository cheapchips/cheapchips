import { useState, useEffect, useContext } from 'react'
import PlayerList from './PlayerList'
import useResponsiveIconSize from '../../../../hooks/useReponsiveIconSize'
import JackpotContext from '../../../../contexts/JackpotContext'
import Web3Context from '../../../../contexts/Web3Context'
import { Player } from '../../../../types/Player'
import { JackpotProps } from '../../../../proptypes/JackpotProps'
import _ from 'lodash'
import useJackpot from '../../../../hooks/useJackpot'

const Jackpot = (props:JackpotProps) => {

  const [,readJackpot] = useJackpot()
    
  const [rafflePlayers, setRafflePlayers] = useState<Player[]>([])
  const [rafflePlayersCopy, setRafflePlayersCopy] = useState<Player[]>([])
  const [animationIteration, setAnimationIteration] = useState<number>(0)
  const [runEndingAnimation, setRunEndingAnimation] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const [animateJackpot, setAnimateJackpot] = useState<boolean>(false)
  
  // const iconSize = useResponsiveIconSize()
  const [containerWidth, playerSize, blockiesSize] = useResponsiveIconSize()
  const jackpotContext = useContext(JackpotContext)
  const web3 = useContext(Web3Context)
  
  useEffect(() => {
    if (!web3.address || !jackpotContext.endTime || jackpotContext.players!.length === 0) return
    setActive(true)
    setupPlayerArrays()
  }, [web3, jackpotContext])

  useEffect(() => {
    console.log(jackpotContext.roundState)
    if(jackpotContext.roundState === "closed") setAnimateJackpot(true)
  }, [jackpotContext.roundState])

  useEffect(() => {
    if (props.winnerId.current === -1) return
    setRunEndingAnimation(true)
    handleWinner()
  }, [animationIteration])

  async function setupPlayerArrays() {

    const tickets = (await readJackpot.getRoundData(jackpotContext.roundId)).tickets
    const localPlayerId = await readJackpot.getPlayerIdInRound(jackpotContext.roundId)
    // const localPlayerId = await 
    
    const players = tickets.map((id:number) => ({
      address: tickets[id] === localPlayerId ? web3.address : "00000llffffff" + id.toString(),
      tickets: 1,
      id
    }))

    if(players.length < 10){
      for (let i = 0; i < 10; i++) {
        players.push({
          address: Math.random().toString(),
          tickets: 1,
          id: 2,
        })
      }
    }

    // console.log(tickets)
    setRafflePlayers(players)

    const propsPlayersHardCopy = _.cloneDeep(players)
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
    ctn: `
      flex items-center w-5/6 h-3/4
      border border-lightBorder dark:border-darkBorder
      rounded-md
      overflow-hidden
      backdrop-blur-3xl
      bg-transparent
      jackpot_center_bar_light
      dark:jackpot_center_bar_dark
    `,
    ctnInactive: `
      flex justify-center items-center w-5/6 h-3/4
      bg-lightBgActive dark:bg-darkBgActive
      rounded-md
      animate-pulse
    `,
    glassCtn: `
      absolute
      w-full h-full
      opacity-50
      backdrop-blur-3xl
    `,
    players: `
      flex h-fit
      ${props.animated || animateJackpot ? 'jackpot_anim' : ''}
      ${runEndingAnimation ? 'jackpot_anim_ending' : ''}
    `,
    text: `
      font-content
      xl:text-lg
      lg:text-xxs
      md:text-xxxs
      sm:text-xxxs
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
    <div className={(active) ? styles.ctn : styles.ctnInactive} id='jackpot_container'>
        {active
        ?
          <>
            <RafflePlayerList players={rafflePlayers} playerIconSize={blockiesSize} />
            <RafflePlayerList players={rafflePlayersCopy} playerIconSize={blockiesSize} />
            <div className={styles.glassCtn}></div>
          </>
        :
          <>
          {web3.address
          ?
            <span className={styles.text}>Waiting for players...</span>
          :
            <></>
          }
          </>
        }
    </div>
  )
}

export default Jackpot
