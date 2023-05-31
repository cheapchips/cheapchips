import './App.css'
import { useState, useEffect, useContext, useRef } from 'react'

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
import useConnectWallet from './hooks/useConnectWallet'
import useDeposit from './hooks/useDeposit'
import useTheme from './hooks/useTheme'
import useLoadingScreen from './hooks/useLoadingScreen'
import useModal from './hooks/useModal' 

// contracts
import {ChipStable, ChipStable__factory, ChipsJackpot, ChipsJackpot__factory, LinkTokenInterface, LinkTokenInterface__factory} from "../../contracts/typechain-types"
import { ethers } from 'ethers'
import Web3Context from './contexts/Web3Context'

import TransactionModal from './components/logical/modals/TransactionModal'
import { TxHash, TxStatus } from './types/useTransactionTypes'
import Lobby from './components/logical/cc_testing/lobby/Lobby'
import cheapchipsLogo from "./assets/logo.png"
import Jackpot from './components/logical/cc_testing/jackpot/Jackpot'

type Player = {
  readonly address: string
  readonly ticketAmount: number
  readonly id: number
}

function App() {

  const web3 = useContext(Web3Context)

  const [metamask, correctNetwork, connected, provider, signer, connect] = useConnectWallet()
  const [theme, toggleTheme] = useTheme()
  const loading = useLoadingScreen()
  const depositData = useDeposit()
  const [depositAmount, defaultDepositAmount, minDepositAmount, maxDepositAmount, handleDepositPercentage, handleDepositInput, handleDepositTx] = depositData
  
  // local states
  const [active, setActive] = useState(true)
  const [address, setAddress] = useState<string>()

  // test modals
  const [buyTokensVisible, toggleBuyTokensVisible] = useModal()
  const [tutorialVisible, toggleTutorialVisible] = useModal()
  const [installMetamaskVisible, toggleInstallMetamaskvisible] = useModal()
  const [switchNetworkVisible, toggleSwitchNetworkVisible] = useModal()
  
  const [transactionModalVisible, toggleTransactionModalVisible] = useModal()
  const [chipStable, setChipStable] = useState<ChipStable>()
  const [jackpot, setJackpot] = useState<ChipsJackpot>()
  const [linkToken, setLinkToken] = useState<LinkTokenInterface>()
  const [chipStableBalance, setChipStableBalance] = useState<string>()
  const [linkTokenBalance, setLinkTokenBalance] = useState<string>()
  
  const [txStatus, setTxStatus] = useState<TxStatus>("nonexist")
  const [txHash, setTxHash] = useState<TxHash>("")

  useEffect(() => {
    if(connected && provider && signer && correctNetwork){
      (async() => {
        
        const chip = ChipStable__factory.connect("0xCb121efF8eAdB7Ab2CaA0660cFD02e5BE4C946b6", signer)
        const jackpot = ChipsJackpot__factory.connect("0xf082812C3De7a8d5014f1F748bb75046F6143A53", signer)
        const linkToken = LinkTokenInterface__factory.connect("0x326C977E6efc84E512bB9C30f76E30c160eD06FB", signer)
        const address = await signer.getAddress()
        
        setChipStableBalance((await chip.balanceOf(address)).toNumber().toString())
        setLinkTokenBalance(ethers.utils.formatUnits((await linkToken.balanceOf(address)),"ether"))
        setAddress(address)
        setJackpot(jackpot)
        setLinkToken(linkToken)
        
      })()
    }
  }, [connected])
  
  const testTxTransaction = () => {
    setTxStatus("created")
    setTimeout(() => {
      setTxStatus("submitted")
    }, 4000);
    setTimeout(() => {
      setTxStatus("denied")
    }, 8000);
    setTimeout(() => {
      setTxStatus("failed")
    }, 12000)
    setTimeout(() => {
      setTxStatus("done")
    }, 16000);
  }

  useEffect(() => {
    console.log(web3)
  }, [web3])
  
  //test
  const winnerId = useRef<number>(-1)
  const [jackpotAnimated, setJackpotAnimated] = useState<boolean>(false)
  const [playerCount, setPlayerCount] = useState<number>(0)
  const [playersDeposit, setPlayersDeposit] = useState<number>(0)
  const [players, setPlayers] = useState<Player[]>([])

  if(loading){
    return <LoadingScreen />
  }
  return (
    <Web3Context.Provider value={{address, provider, signer, chipStable, chipStableBalance, linkToken, linkTokenBalance, jackpot, tx: {status: txStatus, hash: txHash}, setTxStatus, setTxHash }}>
      
      {!correctNetwork && <SwitchNetworkModal onClickClose={toggleSwitchNetworkVisible} />}
      {!metamask && <InstallMetamaskModal onClickClose={toggleInstallMetamaskvisible} />}

      {tutorialVisible && <TutorialModal pages={3} title='Tutorial' onClickClose={toggleTutorialVisible} />}
      {buyTokensVisible && <BuyTokensModalTESTNET title='Buy tokens (TESTNET)' onClickClose={toggleBuyTokensVisible} />}
      {transactionModalVisible && <TransactionModal txTitle='Test tx modalll' onClickClose={toggleTransactionModalVisible} />}

      <MainWrapper>

        <Navbar
          theme={theme}
          themeBtnOnClick={() => toggleTheme()}
          walletConnected={connected}
          connectWalletProps={{
            onClickFunction: connect,
            clickable: !connected,
            active: !connected
          }}
        />

        <div className='absolute text-sm top-4 left-[23%] flex gap-4 underline border'> 

                <button onClick={() => {
                      const rand_addr = Math.random().toString(36).substring(2,9)
                      const rand_ticket = Math.floor(Math.random() * (5 - 1 + 1) + 1)
                      const newPlayer = {
                        address: rand_addr,
                        ticketAmount: rand_ticket,
                        id: playerCount,
                      }
                      setPlayers(players=>[...players, newPlayer])
                      setPlayerCount(playerCount + 1)
                      setPlayersDeposit(playersDeposit + rand_ticket)
                    }}
                      >  
                  <span className="font-content">Add player</span>
                </button>

                <button onClick={() => {
                  setJackpotAnimated(true)
                  setTimeout(() => {
                    winnerId.current = Math.floor(Math.random() * playerCount)
                    console.log('winner ', winnerId.current)
                  }, 4000)
                  }}>
                  <span className="font-content">Start jackpot</span>
                </button>

                <button onClick={() => setActive(!active)}>
                  <span className="font-content">Toggle active</span>
                </button>
                
                <button onClick={() => {testTxTransaction(); toggleTransactionModalVisible()}}>
                  <span className='font-content'>Tx modal</span>
                </button>

                <button onClick={() => toggleTutorialVisible()}>
                  <span className='font-content'>Tutorial modal</span>
                </button>

                <button onClick={() => toggleBuyTokensVisible()}>
                  <span className='font-content'>Buy tokens modal</span>
                </button>

              </div>
        
        <Panel panelType='side'>

          <LobbyHeader
            playerCount={players.length}
            maxPlayerCount={100}
            timeTillRaffleStartPercentage={44}
            lobbyId='0'
            active={players.length > 0}
          />

          {players.length > 0 && <Lobby playerCount={players.length} players={players} ticketImgSrc={cheapchipsLogo} maxTicketsPerPlayer={5} />}

        </Panel>
        
        <Panel panelType='main'>

          <MainContentCtn>

            <JackpotMainCtn>
              {players.length > 0 && <Jackpot players={players} winnerId={winnerId} animated={jackpotAnimated} />}
            </JackpotMainCtn>

            <JackpotBottomCtn>
              <Deposit
                active={active}
                depositData={depositData}
              />
            </JackpotBottomCtn>

            <JackpotBottomCtn>
              <JackpotInfo
                active={active}
                prizePool={playersDeposit}
                jackpotRoundId={0}
                playerCount={players.length}
                maxPlayerCount={100}
                maxDepositAmount={5}
                timeLeftTillJackpot={92}
                maxTimeLeftTillJackpot={120}
              />
            </JackpotBottomCtn>
          
          </MainContentCtn>

        </Panel>

        <Panel panelType='side'>

            <ProfileHeader
              onClickMyDetails={() => console.log(123)} // make a modal for this later
              onClickBuyBalance={toggleBuyTokensVisible}
            />

            <JackpotArchives
              active={active}
            />
            
        </Panel>

      </MainWrapper>
    </Web3Context.Provider>
  )
}

export default App