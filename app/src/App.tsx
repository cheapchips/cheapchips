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
  const [address, setAddress] = useState<string>()
  
  // jackpot states
  const winnerId = useRef(-1)
  const [roundId, setRoundId] = useState<string>()
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>()
  const [maxNumberOfPlayers, setMaxNumberOfPlayers] = useState<number>(100)
  const [players, setPlayers] = useState<Player[]>([])
  const [prizePool, setPrizePool] = useState<number>()
  const [endDepositTime, setEndDepositTime] = useState<number>()
  const [endTime, setEndTime] = useState<number>()

  //test
  const [jackpotAnimated, setJackpotAnimated] = useState<boolean>(false)
  const [playersDeposit, setPlayersDeposit] = useState<number>(0)

  // const [hoverSpawn, setHoverSpawn] = useState<boolean>(false)

  function addPlayer(newPlayer:Player) {
    setPlayers(prevPlayers => [...prevPlayers, newPlayer])
  }
  
  useEffect(() => {
    if(connected && provider && signer && correctNetwork){
      (async() => {
        
        const chip = ChipStable__factory.connect("0xCb121efF8eAdB7Ab2CaA0660cFD02e5BE4C946b6", signer)
        const jackpot = ChipsJackpot__factory.connect("0xf082812C3De7a8d5014f1F748bb75046F6143A53", signer)
        const linkToken = LinkTokenInterface__factory.connect("0x326C977E6efc84E512bB9C30f76E30c160eD06FB", signer)
        const address = await signer.getAddress()
        
        // web3 context
        setChipStable(chip)
        setChipStableBalance((await chip.balanceOf(address)).toNumber().toString())
        setLinkTokenBalance(ethers.utils.formatUnits((await linkToken.balanceOf(address)),"ether"))
        setAddress(address)
        setJackpot(jackpot)
        setLinkToken(linkToken)

        const roundId = (await jackpot.getCurrentRoundId()).toString()
        const roundData = await jackpot.getRoundData(roundId)
        const players = formatTicketsToPlayers(roundData[1])
        // console.log(roundData)

        // jackpot context
        setPlayers(players)
        setNumberOfPlayers(players.length)
        setRoundId(roundId)
        setPrizePool(roundData[1].length)
        setEndDepositTime(120)

        jackpot.on("RoundEnded", (roundId:BigNumber, randomNumber:BigNumber) => {
          const id = randomNumber.mod(roundData[1].length).toNumber()
          winnerId.current = id
          console.log(id)
        })
      })()
    }
  }, [correctNetwork])
  
  if(loading){
    return <LoadingScreen />
  }
  return (
    <Web3Context.Provider value={{address, provider, signer, chipStable, chipStableBalance, linkToken, linkTokenBalance, jackpot, tx: {status: txStatus, hash: txHash}, setTxStatus, setTxHash }}>
      <JackpotContext.Provider value={{roundId, numberOfPlayers,maxNumberOfPlayers, players, prizePool, endDepositTime, endTime, minChipsDeposit: 1, maxChipsDeposit: 5, defaultChipsDeposit: 1, addPlayer}} >

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

          <button onClick={async() => {
            await jackpot?.closeRound()
          }}>End jackpot</button>

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