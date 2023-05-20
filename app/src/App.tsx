import './App.css'
import { useState } from 'react'

// layout components
import LoadingScreen from './components/layout/LoadingScreen'
import MainWrapper from './components/layout/MainWrapper'
import Panel from './components/layout/Panel'
import Navbar from './components/logical/Navbar'
import LobbyCtn from './components/layout/LobbyCtn'
import MainContentCtn from './components/layout/MainContentCtn'
import RaffleMainCtn from './components/layout/RaffleMainCtn'
import RaffleBottomCtn from './components/layout/RaffleBottomCtn'

// logical components
import LobbyHeader from './components/logical/LobbyHeader'
import ProfileHeader from './components/logical/ProfileHeader'
import Deposit from './components/logical/Deposit'

// hooks
import useConnectWallet from './hooks/useConnectWallet'
import useTheme from './hooks/useTheme'
import useLoadingScreen from './hooks/useLoadingScreen'

function App() {

  const [connected, provider, signer, connect] = useConnectWallet()
  const [theme, toggleTheme] = useTheme()
  const loading = useLoadingScreen()
  const [active, setActive] = useState(true)
  const [deposit, setDeposit] = useState<number>(0)

  if(loading){
    return <LoadingScreen />
  }
  else return (
    <MainWrapper>

      <Navbar
        theme={theme}
        themeBtnOnClick={() => toggleTheme()}
        walletConnected={connected}
        connectWalletProps={
          {
            onClickFunction: connect,
            text: "CONNECT WALLET",
            clickable: true,
            active: true
          }
        }
      />
      
      <Panel panelType='side'>

        <LobbyHeader
          title='Lobby'
          playerCount={14}
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

          <RaffleMainCtn>
            <button onClick={() => setActive(!active)}>
              <span className="text-xxs">Toggle active</span>
              <br />
              <span>{deposit}</span>
            </button>
          </RaffleMainCtn>

          <RaffleBottomCtn>
          
            <Deposit
              active={true}
              depositAmount={deposit}
              defaultDepositAmount={1}
              minDepositAmount={0}
              maxDepositAmount={5}
              handleImageDepositChange={""}
              handleInputDepositValueChange={setDeposit}
            />        
          
          </RaffleBottomCtn>

          <RaffleBottomCtn>
          </RaffleBottomCtn>
         
        </MainContentCtn>

      </Panel>

      <Panel panelType='side'>

          <ProfileHeader title="Profile" address='0x748912caD3137E208483281929779A45f3C9Eb55' chipsBalance={105} linkBalance={12} />
          
      </Panel>

    </MainWrapper>
  )
}

export default App