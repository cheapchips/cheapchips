import useConnectWallet from "../../hooks/useConnectWallet";
import useModal from "../../hooks/useModal";
import Deposit from "../logical/Deposit";
import Jackpot from "../logical/Jackpot";
import JackpotArchives from "../logical/JackpotArchives";
import JackpotRoundInfo from "../logical/JackpotRoundInfo";
import LobbyHeader from "../logical/LobbyHeader";
import Navbar from "../logical/Navbar";
import ProfileHeader from "../logical/ProfileHeader";
import Lobby from "../logical/lobby/Lobby";
import TutorialModal from "../logical/modals/TutorialModal";
import JackpotBottomCtn from "./JackpotBottomCtn";
import JackpotMainCtn from "./JackpotMainCtn";
import MainContentCtn from "./MainContentCtn";
import MainWrapper from "./MainWrapper";
import Panel from "./Panel";

export default function Skeleton({connect}:{connect: () => Promise<void>}){

    const [tutorialVisible, toggleTutorialVisible] = useModal()
    
    return(
        <>
        {tutorialVisible && <TutorialModal pages={5} onClickClose={toggleTutorialVisible} />}
        <MainWrapper>
          <Navbar walletOnClick={connect} buyOnClick={() => {return}} tutorialOnClick={toggleTutorialVisible} connected={false} />
          <Panel panelType='side'>
            {/* <LobbyHeader /> */}
            {/* <Lobby /> */}
          </Panel>
          
          <Panel panelType='main'>
            <MainContentCtn>

              <JackpotMainCtn>
                {/* <Jackpot/> */}
              </JackpotMainCtn>

              <JackpotBottomCtn>
                {/* <Deposit /> */}
              </JackpotBottomCtn>

              <JackpotBottomCtn>
                {/* <JackpotRoundInfo /> */}
              </JackpotBottomCtn>
            
            </MainContentCtn>
          </Panel>

          <Panel panelType='side'>
              {/* <ProfileHeader
                onClickBuyBalance={() => {return}}
                onClickMyDetails={() => {return}}
              /> */}
              {/* <JackpotArchives /> */}
          </Panel>
        </MainWrapper>
        </>
    )
}