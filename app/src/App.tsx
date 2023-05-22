import './App.css'
import { useState, useEffect } from 'react'

// layout components
import LoadingScreen from './components/layout/LoadingScreen'
import MainWrapper from './components/layout/MainWrapper'
import Panel from './components/layout/Panel'
import Navbar from './components/logical/Navbar'
import LobbyCtn from './components/layout/LobbyCtn'
import MainContentCtn from './components/layout/MainContentCtn'
import JackpotMainCtn from './components/layout/JackpotMainCtn'
import JackpotBottomCtn from './components/layout/JackpotBottomCtn'

// logical components
import LobbyHeader from './components/logical/LobbyHeader'
import ProfileHeader from './components/logical/ProfileHeader'
import Deposit from './components/logical/Deposit'
import JackpotInfo from './components/logical/JackpotInfo'
import JackpotArchives from './components/logical/JackpotArchives'
import Modal from './components/logical/Modal'

// hooks
import useConnectWallet from './hooks/useConnectWallet'
import useDeposit from './hooks/useDeposit'
import useTheme from './hooks/useTheme'
import useLoadingScreen from './hooks/useLoadingScreen'
import useModal from './hooks/useModal'

// contracts
import {ChipStable, ChipStable__factory, ChipsJackpot, ChipsJackpot__factory} from "../../contracts/typechain-types"

function App() {

  const [connected, provider, signer, connect] = useConnectWallet()
  const [theme, toggleTheme] = useTheme()
  const loading = useLoadingScreen()
  const depositData = useDeposit()
  const [
    depositAmount,
    defaultDepositAmount,
    minDepositAmount,
    maxDepositAmount,
    handleDepositPercentage,
    handleDepositInput,
    handleDepositTx
  ] = depositData
  const [modalVisible, toggleModalVisible] = useModal()
  const [modalSize, setModalSize] = useState<"Big" | "Medium" | "Small">("Small")
  
  // local states
  const [active, setActive] = useState(true)
  const [address, setAddress] = useState<string>()

  const [chipsBalance, setChipsBalance] = useState<number>()
  const [jackpot, setJackpot] = useState<ChipsJackpot>()

  useEffect(() => {
    if(connected && provider && signer){
      (async() => {
        const chip = ChipStable__factory.connect("0xCb121efF8eAdB7Ab2CaA0660cFD02e5BE4C946b6", provider)
        const address = await signer.getAddress()
        console.log(address)
        setAddress(address)
        setChipsBalance((await chip.balanceOf(address)).toNumber())
        const jackpot = ChipsJackpot__factory.connect("0xf082812C3De7a8d5014f1F748bb75046F6143A53", provider)
        setJackpot(jackpot)

        console.log(await jackpot.getRoundData(0))
      })()
    }
  }, [connected])

  
  if(loading){
    return <LoadingScreen />
  }
  return (
    <>

    {modalVisible ?  <Modal title="Test modal" size={modalSize} onClickClose={toggleModalVisible}>Test</Modal> : <></>}
    
    <MainWrapper>

      <Navbar
        theme={theme}
        themeBtnOnClick={() => toggleTheme()}
        walletConnected={connected}
        connectWalletProps={{
          onClickFunction: connect,
          text: "CONNECT WALLET",
          clickable: true,
          active: true
        }}
      />
      
      <Panel panelType='side'>

        <LobbyHeader
          playerCount={42}
          maxPlayerCount={100}
          timeTillRaffleStartPercentage={44}
          lobbyId='0'
          active={active}
        />

        <LobbyCtn>

        </LobbyCtn>

      </Panel>
      
      <Panel panelType='main'>

        <MainContentCtn>

          <JackpotMainCtn>
            <button onClick={() => setActive(!active)}>
              <span className="text-xxs">Toggle active</span>
              <br />
              <span>{depositAmount}</span>
            </button>
            <br />

            <button onClick={() => {setModalSize("Small"); toggleModalVisible()}}>
              <span className='text-xxs'>Modal small</span>
            </button>
            
            <button onClick={() => {setModalSize("Medium"); toggleModalVisible()}}>
              <span className='text-xxs'>Modal medium</span>
            </button>
            
            <button onClick={() => {setModalSize("Big"); toggleModalVisible()}}>
              <span className='text-xxs'>Modal big</span>
            </button>
            
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
              prizePool={215}
              jackpotRoundId={2}
              playerCount={42}
              maxPlayerCount={100}
              maxDepositAmount={5}
              timeLeftTillJackpot={92}
              maxTimeLeftTillJackpot={120}
            />
          </JackpotBottomCtn>
         
        </MainContentCtn>

      </Panel>

      <Panel panelType='side'>

          {(!address || !chipsBalance)
          ? 
            <ProfileHeader 
              active={false}
              address=''
              chipsBalance={0}
              linkBalance={0}
            />
          :
            <ProfileHeader
              active={active}
              address={address!}
              chipsBalance={chipsBalance!}
              linkBalance={12}
            />
          }

          <JackpotArchives
            active={active}
          />
          
      </Panel>

    </MainWrapper>
    </>
  )
}

export default App