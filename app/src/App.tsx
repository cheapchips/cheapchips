import './App.css'

// components
import MainWrapper from './components/layout/MainWrapper'
import Panel from './components/layout/Panel'
import Navbar from './components/logical/Navbar'
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
          theme='dark'
          title='Test lobby'
          playerCount={12}
          maxPlayerCount={100}
          timeTillRaffleStartPercentage={44}
          lobbyId='0'
        />

      </Panel>
      
      <Panel panelType='main'>
        <div className='w-full h-full flex justify-center items-center dark:text-white flex-col'>
          {theme}
          <button onClick={() => toggleTheme()}>Toggle theme</button>
        </div>
      </Panel>

      <Panel panelType='side'>
      </Panel>

    </MainWrapper>
  )
}

export default App