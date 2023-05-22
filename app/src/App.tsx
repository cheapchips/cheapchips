import './App.css'
import { useState } from 'react'

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
import JackpotHistory from './components/logical/JackpotHistory'

// hooks
import useConnectWallet from './hooks/useConnectWallet'
import useDeposit from './hooks/useDeposit'
import useTheme from './hooks/useTheme'
import useLoadingScreen from './hooks/useLoadingScreen'

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
  const [active, setActive] = useState(true)

  if(loading){
    return <LoadingScreen />
  }
  else return (
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
          title='Lobby'
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

          <ProfileHeader
            active={active}
            title="Profile"
            address='0x748912caD3137E208483281929779A45f3C9Eb55'
            chipsBalance={105}
            linkBalance={12}
          />

          <JackpotHistory
            active={active}  
          />
          
      </Panel>

    </MainWrapper>
  )
}

export default App