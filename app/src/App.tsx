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
import ProfileData from './components/logical/ProfileData'

// hooks
import useConnectWallet from './hooks/useConnectWallet'
import useTheme from './hooks/useTheme'
import useLoadingScreen from './hooks/useLoadingScreen'

function App() {

  const [connected, provider, signer, connect] = useConnectWallet()
  const [theme, toggleTheme] = useTheme()
  const loading = useLoadingScreen()
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
          <p>Lobby Container</p>
        </LobbyCtn>

      </Panel>
      
      <Panel panelType='main'>

        <MainContentCtn>

          <RaffleMainCtn>
            {/* <p>Raffle Container</p> */}
            <button onClick={() => setActive(!active)}>Toggle panel activeness</button>
          </RaffleMainCtn>

          <RaffleBottomCtn>
            <p>Deposit Container</p>
          </RaffleBottomCtn>

          <RaffleBottomCtn>
            <p>Raffle Info Container</p>
          </RaffleBottomCtn>
         
        </MainContentCtn>

      </Panel>

      <Panel panelType='side'>

          <ProfileData title="Profile" address='0x748912caD3137E208483281929779A45f3C9Eb55' chipsBalance={105} linkBalance={12} />
          
          <div className='flex justify-center items-center'>Raffle History Container</div>
          
      </Panel>

    </MainWrapper>
  )
}

export default App