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
import TutorialModal from './components/logical/modals/tutorial/TutorialModal'

// tokens modal (testnet)
import BuyTokensModalTESTNET from './components/logical/modals/BuyTokensModalTESTNET'

// hooks
import useConnectWallet from './hooks/useConnectWallet'
import useDeposit from './hooks/useDeposit'
import useTheme from './hooks/useTheme'
import useLoadingScreen from './hooks/useLoadingScreen'
import useModal from './hooks/useModal'

// contracts
import {ChipStable, ChipStable__factory, ChipsJackpot, ChipsJackpot__factory} from "../../contracts/typechain-types"
import { ethers } from 'ethers'
import { price_feed_abi } from './chainlink/price_feed_abi'

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
  
  
  // local states
  const [active, setActive] = useState(true)
  const [address, setAddress] = useState<string>()
  
  const [buyTokensVisible, toggleBuyTokensVisible] = useModal()
  const [tutorialVisible, toggleTutorialVisible] = useModal()

  const [chipstable, setChipstable] = useState<ChipStable>()
  const [jackpot, setJackpot] = useState<ChipsJackpot>()
  const [chipsBalance, setChipsBalance] = useState<number>()

  useEffect(() => {
    if(connected && provider && signer){
      (async() => {

        const chip = ChipStable__factory.connect("0xCb121efF8eAdB7Ab2CaA0660cFD02e5BE4C946b6", provider)
        const jackpot = ChipsJackpot__factory.connect("0xf082812C3De7a8d5014f1F748bb75046F6143A53", provider)
        const address = await signer.getAddress()
        setChipsBalance((await chip.balanceOf(address)).toNumber())
        setAddress(address)
        setJackpot(jackpot)
        
        // console.log(await jackpot.getRoundData(0))
        // const matic_to_link = new ethers.Contract("0x71A6b5AD2034344235ddd38916dF0bE6baEB8517", price_feed_abi, signer)
        // const res = await matic_to_link.getLatestPrice()
        
        // const price_raw: number = parseInt(res._hex, 16);
        // console.log('wei?: ', price_raw)
        // ile jeden link kolsztuje w maticu
        // console.log('parsed ', ethers.utils.formatUnits(res, "ether"))
        
      })()
    }
  }, [connected])
  
  if(loading){
    return <LoadingScreen />
  }
  return (
    <>
    
    {tutorialVisible && <TutorialModal pages={3} title='Tutorial' onClickClose={toggleTutorialVisible} />}
    {(buyTokensVisible && address && provider && jackpot) && <BuyTokensModalTESTNET title='Buy tokens (TESTNET)' onClickClose={toggleBuyTokensVisible} provider={provider} address={address} jackpot={jackpot} />}

    <MainWrapper>

      <Navbar
        theme={theme}
        themeBtnOnClick={() => toggleTheme()}
        walletConnected={connected}
        connectWalletProps={{
          onClickFunction: connect,
          clickable: !connected,
          active: !connected
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

            <div className='flex flex-col gap-4 underline'>

              <button onClick={() => setActive(!active)}>
                <span className="font-content">Toggle active</span>
              </button>
              
              <button onClick={() => toggleTutorialVisible()}>
                <span className='font-content'>Tutorial modal</span>
              </button>

              <button onClick={() => toggleBuyTokensVisible()}>
                <span className='font-content'>Buy tokens modal</span>
              </button>

            </div>

            

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