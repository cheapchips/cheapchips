import './App.css'

// layout components
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

function App() {

  const [connected, provider, signer, connect] = useConnectWallet()
  const [theme, toggleTheme] = useTheme()

  return (
    <MainWrapper>

      <Navbar
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
      
      <Panel panelType='lobby'>

        <LobbyHeader
          title='Lobby'
          playerCount={45}
          maxPlayerCount={100}
          timeTillRaffleStartPercentage={44}
          lobbyId='0'
        />

        <LobbyCtn>
          <p>Lobby Container</p>
        </LobbyCtn>

      </Panel>
      
      <Panel panelType='main'>

        <MainContentCtn>

          <RaffleMainCtn>
            {theme}
            <button onClick={() => toggleTheme()}>Toggle theme</button>
          </RaffleMainCtn>

          <RaffleBottomCtn>
            <p>Deposit Container</p>
          </RaffleBottomCtn>

          <RaffleBottomCtn>
            <p>Raffle Info Container</p>
          </RaffleBottomCtn>
         
         
        </MainContentCtn>

      </Panel>

      <Panel panelType='profile'>

          <ProfileData title="Profile" address='0xTeaver' chipsBalance={105} linkBalance={12} />
          
          <div className='flex justify-center items-center'>Raffle History Container</div>
          
      </Panel>

    </MainWrapper>
  )
}

export default App