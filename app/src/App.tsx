import './App.css'

// layout components
import MainWrapper from './components/layout/MainWrapper'
import Panel from './components/layout/Panel'
import Navbar from './components/logical/Navbar'
import MainContentCtn from './components/layout/MainContentCtn'
import RaffleCtn from './components/layout/RaffleCtn'
import RaffleDepositCtn from './components/layout/RaffleDepositCtn'
import RaffleInfoCtn from './components/layout/RaffleInfoCtn'

// logical components
import LobbyHeader from './components/logical/LobbyHeader'

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
      
      <Panel panelType='side'>

        <LobbyHeader
          title='Lobby'
          playerCount={45}
          maxPlayerCount={100}
          timeTillRaffleStartPercentage={44}
          lobbyId='0'
        />

      </Panel>
      
      <Panel panelType='main'>

        <MainContentCtn>

          <RaffleCtn>
         
            {theme}
            <button onClick={() => toggleTheme()}>Toggle theme</button>
             
          </RaffleCtn>

          <RaffleDepositCtn>

            <p>Deposit Container</p>

          </RaffleDepositCtn>

          <RaffleInfoCtn>

            <p>Raffle Info Container</p>
            
          </RaffleInfoCtn>
         
         
        </MainContentCtn>
        

      </Panel>

      <Panel panelType='side'>
      </Panel>

    </MainWrapper>
  )
}

export default App