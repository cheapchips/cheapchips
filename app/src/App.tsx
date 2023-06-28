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
import JackpotRoundInfo from './components/logical/JackpotRoundInfo'
import JackpotArchives from './components/logical/JackpotArchives'
import TutorialModal from './components/logical/modals/TutorialModal'
import Jackpot from './components/logical/Jackpot'

// modals
import BuyTokensModalTESTNET from './components/logical/modals/BuyTokensModalTESTNET'
import InstallMetamaskModal from './components/logical/modals/InstallMetamaskModal'
import SwitchNetworkModal from './components/logical/modals/SwitchNetworkModal'
import ArchivedRoundModal from './components/logical/modals/ArchivedRoundModal'
import MyDetailsModal from './components/logical/modals/MyDetailsModal'

// hooks
import useConnectWallet from './hooks/useConnectWallet'
import useLoadingScreen from './hooks/useLoadingScreen'
import useModal from './hooks/useModal' 





// local testing
import Lobby from './components/logical/lobby/Lobby'
import useTheme from './hooks/useTheme'
import Web3ContextProvider from './contexts/Web3ContextProvider'
import JackpotContextProvider from './contexts/JackpotContextProvider'
import DevPanel from './components/logical/DevPanel'
import JackpotContext from './contexts/JackpotContext'

function App() {

  // hooks
  const [isMetamask, walletState, provider, signer, connect] = useConnectWallet()
  const loading = useLoadingScreen()
  const [,] = useTheme()

  // modals
  const [buyTokensVisible, toggleBuyTokensVisible] = useModal()
  const [tutorialVisible, toggleTutorialVisible] = useModal()
  const [myDetailsVisible, toggleMyDetailsVisible] = useModal()
  const [,toggleInstallMetamaskvisible] = useModal()
  
  
  if(loading){
    return <LoadingScreen />
  }
  return (
    <>
    {/* temp */}
    {walletState !== "READY" && <button onClick={connect}>CONNECT!</button> }
    <Web3ContextProvider walletState={walletState} web3Provider={provider} web3Signer={signer}>
      <JackpotContextProvider>

        {walletState === "WRONG_NETWORK" && <SwitchNetworkModal onClickClose={() => { console.log("CLOSE") }} closeBtnDisabled={true} />}
        {!isMetamask && <InstallMetamaskModal onClickClose={toggleInstallMetamaskvisible} closeBtnDisabled={true} />}

        {tutorialVisible && <TutorialModal pages={5} onClickClose={toggleTutorialVisible} />}
        {buyTokensVisible && <BuyTokensModalTESTNET onClickClose={toggleBuyTokensVisible} />}
        {myDetailsVisible && <MyDetailsModal onClickClose={toggleMyDetailsVisible}/>}

        <JackpotContext.Consumer>
          {context => (
            (context !== undefined && context.archivedJackpotId !== undefined)
            ? <ArchivedRoundModal 
                roundId={context.archivedJackpotId} 
                onClickClose={() => context.toggleArchivedJackpotModal(undefined)} 
                onClickWithdraw={()=>{ console.log("withdraw")}} 
              />
            : <></>  
          )} 
        </JackpotContext.Consumer>
        
        <MainWrapper>

          <Navbar walletOnClick={connect} buyOnClick={toggleBuyTokensVisible} tutorialOnClick={toggleTutorialVisible} connected={walletState !== "NOT_CONNECTED" ? true : false} />
          <DevPanel />
          
          <Panel panelType='side'>
            <LobbyHeader />
            <Lobby />
          </Panel>
          
          <Panel panelType='main'>
            <MainContentCtn>

              <JackpotMainCtn>
                <Jackpot/>
              </JackpotMainCtn>

              <JackpotBottomCtn>
                <Deposit />
              </JackpotBottomCtn>

              <JackpotBottomCtn>
                <JackpotRoundInfo />
              </JackpotBottomCtn>
            
            </MainContentCtn>
          </Panel>

          <Panel panelType='side'>
              <ProfileHeader
                onClickBuyBalance={toggleBuyTokensVisible}
                onClickMyDetails={toggleMyDetailsVisible}
              />
              <JackpotArchives />
          </Panel>

        </MainWrapper>
      </JackpotContextProvider>
    </Web3ContextProvider>
    </>
  )
}

export default App