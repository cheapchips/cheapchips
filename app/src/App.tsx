import './App.css'
import MainWrapper from './components/layout/MainWrapper'
import Panel from './components/layout/Panel'
import Navbar from './components/logical/Navbar'
import useConnectWallet from './hooks/useConnectWallet'

function App() {

  const [connected, provider, signer, connect] = useConnectWallet()

  return (
    <MainWrapper theme='dark'>

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
      </Panel>
      
      <Panel panelType='main'>
      </Panel>

      <Panel panelType='side'>
      </Panel>

    </MainWrapper>
  )
}

export default App