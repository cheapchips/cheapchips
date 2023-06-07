import './App.css'

// layout components
import LoadingScreen from './components/layout/LoadingScreen'
import MainWrapper from './components/layout/MainWrapper'
import Panel from './components/layout/Panel'
import Navbar from './components/logical/Navbar'
import MainContentCtn from './components/layout/MainContentCtn'
import JackpotMainCtn from './components/layout/JackpotMainCtn'
import JackpotBottomCtn from './components/layout/JackpotBottomCtn'

// logical components
import LobbyHeader from './components/logical/LobbyHeader'
import ProfileHeader from './components/logical/ProfileHeader'
import Deposit from './components/logical/Deposit'
import JackpotRoundInfo from './components/logical/JackpotRoundInfo'
import JackpotArchives from './components/logical/JackpotArchives'
import TutorialModal from './components/logical/modals/TutorialModal'
import Jackpot from './components/logical/Jackpot'

// modals
import BuyTokensModalTESTNET from './components/logical/modals/BuyTokensModalTESTNET'
import InstallMetamaskModal from './components/logical/modals/InstallMetamaskModal'
import SwitchNetworkModal from './components/logical/modals/SwitchNetworkModal'
import ArchivedRoundModal from './components/logical/modals/ArchivedRoundModal'
import MyDetailsModal from './components/logical/modals/MyDetailsModal'

// hooks
import { useState, useEffect, useRef } from 'react'
import useConnectWallet from './hooks/useConnectWallet'
import useLoadingScreen from './hooks/useLoadingScreen'
import useModal from './hooks/useModal' 

// contracts
import {ChipStable, ChipStable__factory, ChipsJackpot, ChipsJackpot__factory, LinkTokenInterface, LinkTokenInterface__factory} from "../../contracts/typechain-types"
import { ethers } from 'ethers'

// context
import Web3Context from './contexts/Web3Context'
import JackpotContext from './contexts/JackpotContext'

// local testing
import formatTicketsToPlayers from './hooks/utils/formatTicketsToPlayers'
import { TxHash, TxStatus } from './types/useTransactionTypes'
import Lobby from './components/logical/lobby/Lobby'
import { Player } from './types/Player'
import useTheme from './hooks/useTheme'
import RoundState from './types/RoundState'

function App() {

  // hooks
  const [metamask, correctNetwork, connected, provider, signer, connect] = useConnectWallet()
  const loading = useLoadingScreen()
  const [,] = useTheme()

  // modals
  const [buyTokensVisible, toggleBuyTokensVisible] = useModal()
  const [tutorialVisible, toggleTutorialVisible] = useModal()
  const [myDetailsVisible, toggleMyDetailsVisible] = useModal()
  const [,toggleInstallMetamaskvisible] = useModal()
  const [archivedJackpotVisible, toggleArchivedJackpotVisible] = useModal()
  
  // web3 states
  const [chipStable, setChipStable] = useState<ChipStable>()
  const [jackpot, setJackpot] = useState<ChipsJackpot>()
  const [linkToken, setLinkToken] = useState<LinkTokenInterface>()
  const [chipStableBalance, setChipStableBalance] = useState<string>()
  const [linkTokenBalance, setLinkTokenBalance] = useState<string>()
  const [txStatus, setTxStatus] = useState<TxStatus>("nonexist")
  const [txHash, setTxHash] = useState<TxHash>("")
  const [txErrorMessage, setTxErrorMessage] = useState<string>()
  const [address, setAddress] = useState<string>()
  
  // jackpot states
  const winnerId = useRef(-1)
  const [roundId, setRoundId] = useState<number>()
  const [players, setPlayers] = useState<Player[]>([])
  const [prizePool, setPrizePool] = useState<number>()
  const [endTime, setEndTime] = useState<number>(10)
  const [roundState, setRoundState] = useState<RoundState>("default")

  //test
  const [playersDeposit, setPlayersDeposit] = useState<number>(0)
  const [archivedJackpotId, setArchivedJackpotId] = useState<number>()

  useEffect(() => {
    console.log(players)
  }, [players])

  function addPlayer(newPlayer:Player) {
    setPlayers(prevPlayers => [...prevPlayers, newPlayer])
  }

  function incrementRoundId() {
    setRoundId(prev => prev ? prev + 1 : 0)
  }

  function incrementPrizePool(ticketAmount:number) {
    setPrizePool(prizePool => prizePool! + ticketAmount)
  }

  function toggleArchivedJackpotModal(roundId:number) {
    setArchivedJackpotId(roundId)
    toggleArchivedJackpotVisible()
  }
  
  useEffect(() => {
    if(connected && provider && signer && correctNetwork){
      (async() => {
        
        const chip = ChipStable__factory.connect("0xC3013DF5d62c3D29Ed302BA2D76dC47e06BD254a", signer)
        const jackpot = ChipsJackpot__factory.connect("0xB9e0E83E8664dB7FCd9a1a120B047d40e2656c54", signer)
        const linkToken = LinkTokenInterface__factory.connect("0x326C977E6efc84E512bB9C30f76E30c160eD06FB", signer)
        const address = await signer.getAddress()
        
        // web3 context
        setChipStable(chip)
        setChipStableBalance((await chip.balanceOf(address)).toNumber().toString())
        setLinkTokenBalance(ethers.utils.formatUnits((await linkToken.balanceOf(address)),"ether"))
        setAddress(address)
        setJackpot(jackpot)
        setLinkToken(linkToken)

        const roundId = await jackpot.getCurrentRoundId()
        const roundData = await jackpot.getRoundData(roundId)
        const localPlayerId = await jackpot.getPlayerIdInRound(roundId)
        const players = formatTicketsToPlayers(roundData[1], localPlayerId, address)

        // jackpot context
        setPlayers(players)
        setRoundId(roundId.toNumber())
        setPrizePool(roundData[1].length)

      })()
    }
  }, [connected, correctNetwork])

  useEffect(() => {
    if(roundState === "ended"){
      console.log('reset ROUND')
      setPlayers([])
      setPrizePool(0)
      setRoundState("default")
    }
  }, [roundId])
  
  if(loading){
    return <LoadingScreen />
  }
  return (
    <Web3Context.Provider value={{address, provider, signer, chipStable, chipStableBalance, linkToken, linkTokenBalance, jackpot, tx: {status: txStatus, hash: txHash, errorMessage:txErrorMessage}, setTxStatus, setTxHash, setTxErrorMessage, setChipStableBalance, setLinkTokenBalance }}>
      <JackpotContext.Provider value={{roundId, roundState, maxPlayers: 100,  players, prizePool, endTime, minChipsDeposit: 1, maxChipsDeposit: 5, defaultChipsDeposit: 1, winnerId, addPlayer, incrementRoundId, incrementPrizePool, setRoundState, toggleArchivedJackpotModal}} >

        {connected && !correctNetwork && <SwitchNetworkModal onClickClose={() => {}} closeBtnDisabled={true} />}
        {!metamask && <InstallMetamaskModal onClickClose={toggleInstallMetamaskvisible} closeBtnDisabled={true} />}

        {tutorialVisible && <TutorialModal pages={3} onClickClose={toggleTutorialVisible} />}
        {buyTokensVisible && <BuyTokensModalTESTNET onClickClose={toggleBuyTokensVisible} />}
        {myDetailsVisible && <MyDetailsModal onClickClose={toggleMyDetailsVisible}/>}
        {(archivedJackpotVisible && archivedJackpotId) && <ArchivedRoundModal roundId={archivedJackpotId} onClickClose={toggleArchivedJackpotVisible} onClickWithdraw={()=>{}}/>}

        <MainWrapper>

          <Navbar walletOnClick={connect} buyOnClick={toggleBuyTokensVisible} connected={connected} />

          {/* white testblock */}
          <div id="test" className='absolute text-sm top-4 left-[23%] flex gap-4 underline border' > 

            <button onClick={() => {

            const rand_addr = Math.random().toString(36).substring(2,9)
            const rand_ticket = Math.floor(Math.random() * (5 - 1 + 1) + 1)
            const newPlayer = {
              address: rand_addr,
              ticketAmount: rand_ticket,
              id: players.length,
            }
            if(players.length >= 3) return
            setPlayers(players=>[...players, newPlayer])
            setPlayersDeposit(playersDeposit + rand_ticket)
          }}>  
            <span className="font-content">Add player</span>
          </button>

          <button onClick={() => {
            // setJackpotAnimated(true)
              setRoundState("closed")
            }}>
            <span className="font-content">Start jackpot</span>
          </button>

          <button onClick={() => {
            winnerId.current = 0
            setRoundState("ended")
          }}>End jackpot</button>

          <button onClick={() => {
            incrementRoundId()
          }}>Add archive</button>

            <button onClick={() => toggleTutorialVisible()}>
            <span className='font-content'>Tutorial modal</span>
          </button>

            <button onClick={() => setRoundId(roundId => roundId! + 1)}>
            <span className='font-content'>Increment roundId</span>
          </button>

          <button onClick={() => {
            if(!connected) return
            toggleBuyTokensVisible()
          }}>
            <span className='font-content'>Buy tokens modal</span>
          </button>

          </div>
          
          <Panel panelType='side'>
            <LobbyHeader />
            <Lobby />
          </Panel>
          
          <Panel panelType='main'>
            <MainContentCtn>

              <JackpotMainCtn>
                <Jackpot/>
              </JackpotMainCtn>

              <JackpotBottomCtn>
                <Deposit />
              </JackpotBottomCtn>

              <JackpotBottomCtn>
                <JackpotRoundInfo />
              </JackpotBottomCtn>
            
            </MainContentCtn>
          </Panel>

          <Panel panelType='side'>
              <ProfileHeader
                onClickBuyBalance={toggleBuyTokensVisible}
                onClickMyDetails={toggleMyDetailsVisible}
              />
              <JackpotArchives />
          </Panel>

        </MainWrapper>
      </JackpotContext.Provider>
    </Web3Context.Provider>
  )
}

export default App