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
import JackpotInfo from './components/logical/JackpotInfo'
import JackpotArchives from './components/logical/JackpotArchives'
import TutorialModal from './components/logical/modals/TutorialModal'

// modals
import BuyTokensModalTESTNET from './components/logical/modals/BuyTokensModalTESTNET'
import InstallMetamaskModal from './components/logical/modals/InstallMetamaskModal'
import SwitchNetworkModal from './components/logical/modals/SwitchNetworkModal'

// hooks
import { useState, useEffect, useContext, useRef } from 'react'
import useConnectWallet from './hooks/useConnectWallet'
import useLoadingScreen from './hooks/useLoadingScreen'
import useModal from './hooks/useModal' 

// contracts
import {ChipStable, ChipStable__factory, ChipsJackpot, ChipsJackpot__factory, LinkTokenInterface, LinkTokenInterface__factory} from "../../contracts/typechain-types"
import { BigNumber, ethers } from 'ethers'

// context
import Web3Context from './contexts/Web3Context'
import JackpotContext from './contexts/JackpotContext'

// local testing
import formatTicketsToPlayers from './hooks/utils/formatTicketsToPlayers'
import TransactionModal from './components/logical/modals/TransactionModal'
import { TxHash, TxStatus } from './types/useTransactionTypes'
import Lobby from './components/logical/cc_testing/lobby/Lobby'
import Jackpot from './components/logical/cc_testing/jackpot/Jackpot'
import { Player } from './types/Player'
import useTheme from './hooks/useTheme'
import RoundState from './types/RoundState'
import HoverSpawnModal from './components/logical/modals/HoverSpawnModal'

function App() {

  // hooks
  const [metamask, correctNetwork, connected, provider, signer, connect] = useConnectWallet()
  const loading = useLoadingScreen()
  const [theme, toggleTheme] = useTheme()

  // test modals
  const [buyTokensVisible, toggleBuyTokensVisible] = useModal()
  const [tutorialVisible, toggleTutorialVisible] = useModal()
  const [installMetamaskVisible, toggleInstallMetamaskvisible] = useModal()
  const [switchNetworkVisible, toggleSwitchNetworkVisible] = useModal()
  const [transactionModalVisible, toggleTransactionModalVisible] = useModal()
  
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
  const [roundId, setRoundId] = useState<string>()
  const [players, setPlayers] = useState<Player[]>([])
  const [prizePool, setPrizePool] = useState<number>()
  const [endTime, setEndTime] = useState<number>(10)
  const [roundState, setRoundState] = useState<RoundState>("default")

  //test
  const [jackpotAnimated, setJackpotAnimated] = useState<boolean>(false)
  const [playersDeposit, setPlayersDeposit] = useState<number>(0)

  function addPlayer(newPlayer:Player) {
    setPlayers(prevPlayers => [...prevPlayers, newPlayer])
  }

  function incrementRoundId() {
    setRoundId(roundId! + 1)
  }

  function incrementPrizePool(ticketAmount:number) {
    setPrizePool(prizePool => prizePool! + ticketAmount)
  }
  
  useEffect(() => {
    if(connected && provider && signer && correctNetwork){
      (async() => {
        
        const chip = ChipStable__factory.connect("0xBaC7365170e65F56A94E80739940ef514E4E19Ce", signer)
        const jackpot = ChipsJackpot__factory.connect("0x4FD7595a346081738f6E959f3E037A3695370804", signer)
        const linkToken = LinkTokenInterface__factory.connect("0x326C977E6efc84E512bB9C30f76E30c160eD06FB", signer)
        const address = await signer.getAddress()
        
        // web3 context
        setChipStable(chip)
        setChipStableBalance((await chip.balanceOf(address)).toNumber().toString())
        setLinkTokenBalance(ethers.utils.formatUnits((await linkToken.balanceOf(address)),"ether"))
        setAddress(address)
        setJackpot(jackpot)
        setLinkToken(linkToken)

        // evyt listener for link transfer? approve? etc

        const roundId = (await jackpot.getCurrentRoundId()).toString()
        const roundData = await jackpot.getRoundData(roundId)
        const players = formatTicketsToPlayers(roundData[1])
        // console.log(roundData)

        // jackpot context
        setPlayers(players)
        setRoundId(roundId)
        setPrizePool(roundData[1].length)

      })()
    }
  }, [connected, correctNetwork])
  
  if(loading){
    return <LoadingScreen />
  }
  return (
    <Web3Context.Provider value={{address, provider, signer, chipStable, chipStableBalance, linkToken, linkTokenBalance, jackpot, tx: {status: txStatus, hash: txHash, errorMessage:txErrorMessage}, setTxStatus, setTxHash, setTxErrorMessage, setChipStableBalance, setLinkTokenBalance }}>
      <JackpotContext.Provider value={{roundId, roundState, maxPlayers: 100,  players, prizePool, endTime, minChipsDeposit: 1, maxChipsDeposit: 5, defaultChipsDeposit: 1, winnerId, addPlayer, incrementRoundId, incrementPrizePool, setRoundState}} >

        {connected && !correctNetwork && <SwitchNetworkModal onClickClose={() => {}} closeBtnDisabled={true} />}
        {!metamask && <InstallMetamaskModal onClickClose={toggleInstallMetamaskvisible} closeBtnDisabled={true} />}

        {tutorialVisible && <TutorialModal pages={3} title='Tutorial' onClickClose={toggleTutorialVisible} />}
        {buyTokensVisible && <BuyTokensModalTESTNET title='Buy tokens (TESTNET)' onClickClose={toggleBuyTokensVisible} />}
        {transactionModalVisible && <TransactionModal txTitle='Test tx modalll' onClickClose={toggleTransactionModalVisible} />}

        {/* {hoverSpawn && <HoverSpawnModal parentElemId='test' placement='bottom' /> } */}


        <MainWrapper>

          <Navbar walletOnClick={connect} connected={connected} />

          {/* white testblock */}
          <div id="test" className='absolute text-sm top-4 left-[23%] flex gap-4 underline border' onMouseEnter={() => {}} onMouseLeave={() => {}}> 

            <button onClick={() => {

            const rand_addr = Math.random().toString(36).substring(2,9)
            const rand_ticket = Math.floor(Math.random() * (5 - 1 + 1) + 1)
            const newPlayer = {
              address: rand_addr,
              ticketAmount: rand_ticket,
              id: players.length,
            }
            setPlayers(players=>[...players, newPlayer])
            setPlayersDeposit(playersDeposit + rand_ticket)
          }}>  
            <span className="font-content">Add player</span>
          </button>

          <button onClick={() => {
            setJackpotAnimated(true)
            }}>
            <span className="font-content">Start jackpot</span>
          </button>

            <button onClick={() => toggleTutorialVisible()}>
            <span className='font-content'>Tutorial modal</span>
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
                <Jackpot winnerId={winnerId} animated={jackpotAnimated} />
              </JackpotMainCtn>

              <JackpotBottomCtn>
                <Deposit />
              </JackpotBottomCtn>

              <JackpotBottomCtn>
                <JackpotInfo />
              </JackpotBottomCtn>
            
            </MainContentCtn>
          </Panel>

          <Panel panelType='side'>
              <ProfileHeader onClickBuyBalance={toggleBuyTokensVisible} />
              <JackpotArchives />
          </Panel>

        </MainWrapper>
      </JackpotContext.Provider>
    </Web3Context.Provider>
  )
}

export default App