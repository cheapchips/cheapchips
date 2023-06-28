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
import RoundListener from './components/logical/RoundListener'
import Skeleton from './components/layout/Skeleton'

function App() {

  // hooks
  // const [isMetamask, walletState, provider, signer, connect] = useConnectWallet()
  const loading = useLoadingScreen()
  const [,] = useTheme()

  // modals
  const [buyTokensVisible, toggleBuyTokensVisible] = useModal()
  const [myDetailsVisible, toggleMyDetailsVisible] = useModal()
  const [tutorialVisible, toggleTutorialVisible] = useModal()

  
  
  if(loading){
    return <LoadingScreen />
  }
  return (
    <>    
    <Web3ContextProvider>
      <JackpotContextProvider>


        {myDetailsVisible && <MyDetailsModal onClickClose={toggleMyDetailsVisible}/>}
        {buyTokensVisible && <BuyTokensModalTESTNET onClickClose={toggleBuyTokensVisible} />}
        {tutorialVisible && <TutorialModal pages={5} onClickClose={toggleTutorialVisible} />}


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

        <RoundListener />
        
        <MainWrapper>

          <Navbar walletOnClick={async() => {return}} buyOnClick={toggleBuyTokensVisible} tutorialOnClick={toggleTutorialVisible} connected={true} />
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