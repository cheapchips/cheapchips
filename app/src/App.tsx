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
import BuyTokensModal from './components/logical/modals/BuyTokensModal'

// hooks
import useConnectWallet from './hooks/useConnectWallet'
import useDeposit from './hooks/useDeposit'
import useTheme from './hooks/useTheme'
import useLoadingScreen from './hooks/useLoadingScreen'
import useModal from './hooks/useModal'

// contracts
import {ChipStable, ChipStable__factory, ChipsJackpot, ChipsJackpot__factory} from "../../contracts/typechain-types"
import { ContractFactory, ethers } from 'ethers'
import link_abi from "./chainlink/link_abi.json"

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
        // const matic_to_link = ContractFactory.getContract()
        // const m2l_bytecode = "608060405234801561001057600080fd5b507312162c3e810393dec01362abf156d7ecf61595286000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061027b806100746000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80638e15f47314610030575b600080fd5b61003861004e565b6040516100459190610106565b60405180910390f35b60008060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa1580156100bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100e091906101ca565b5050509150508091505090565b6000819050919050565b610100816100ed565b82525050565b600060208201905061011b60008301846100f7565b92915050565b600080fd5b600069ffffffffffffffffffff82169050919050565b61014581610126565b811461015057600080fd5b50565b6000815190506101628161013c565b92915050565b610171816100ed565b811461017c57600080fd5b50565b60008151905061018e81610168565b92915050565b6000819050919050565b6101a781610194565b81146101b257600080fd5b50565b6000815190506101c48161019e565b92915050565b600080600080600060a086880312156101e6576101e5610121565b5b60006101f488828901610153565b95505060206102058882890161017f565b9450506040610216888289016101b5565b9350506060610227888289016101b5565b925050608061023888828901610153565b915050929550929590935056fea2646970667358221220d0bb135b390fadfc7d0be3da2696f024e54575d88d245c7ae6e257bb493772bd64736f6c63430008120033"
        // const matic_to_link__factory = new ethers.ContractFactory(link_abi, m2l_bytecode, signer)
        // const matic_to_link = new ethers.Contract("0xB438B56eA350bB13aA15306fCa88D27D394743e1", link_abi, signer)

        const address = await signer.getAddress()
        setChipsBalance((await chip.balanceOf(address)).toNumber())
        setAddress(address)
        setJackpot(jackpot)
        // console.log(await jackpot.getRoundData(0))
      })()
    }
  }, [connected])
  
  if(loading){
    return <LoadingScreen />
  }
  return (
    <>
    
    {tutorialVisible && <TutorialModal pages={3} title='Tutorial' onClickClose={toggleTutorialVisible} />}
    {buyTokensVisible && <BuyTokensModal title='Buy tokens' size='Big' onClickClose={toggleBuyTokensVisible} />}

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