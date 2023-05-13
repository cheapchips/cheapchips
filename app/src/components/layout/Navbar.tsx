import Panel from "./Panel"
import WalletButton from "../logical/WalletButton"
import NavbarProps from "../../proptypes/NavbarProps"
import logo from "../../assets/logo.png"

const Navbar = (props:NavbarProps) => {

    const navbarStyles = {
        panelCtn: `
            flex flex-flow-col
            px-3
            text-white
        `, // grid-flow-col somehow fucks up the height of navbar?
        leftContentCtn: `
            w-fit w-max-1/3
            flex
        `,
        leftContentItemsCtn: `
            grid grid-flow-col
            gap-4
            content-center
        `,
        rightContentCtn: `
            flex
        `,
        rightContentItemsCtn: `
        `,
        contentItem: `
            p-1
        `,
        logoContainer: `
            flex justify-center place-items-center content-center
            w-14 w-max-14 h-full
        `,
        logo: `
            h-8 p-1
        `,
    }

    return (
        <Panel panelType='nav' additionalClasses={navbarStyles.panelCtn}>
            <div className={navbarStyles.leftContentCtn}>
                <div className={navbarStyles.logoContainer}>
                    <img
                    className={navbarStyles.logo}
                    src={logo}
                    alt="cheapchips_logo"
                    />
                </div>
                <div className={navbarStyles.leftContentItemsCtn}>
                    
                    <p>CHEAPCHIPS</p>
                    <p>PLAY</p>
                    <p>DEX</p>
                    
                    {/* <div className={navbarStyles.contentItem}>CHEAPCHIPS</div>
                    <div className={navbarStyles.contentItem}>PLAY</div>
                    <div className={navbarStyles.contentItem}>DEX</div>
                    <div className={navbarStyles.contentItem}>
                        <WalletButton
                            clickable={props.connectWalletProps.clickable}
                            active={props.connectWalletProps.active}
                            text={props.connectWalletProps.text}
                            onClickFunction={() => props.connectWalletProps.onClickFunction}
                        />
                    </div> */}
                </div>
            </div>
        </Panel>
    )
}

export default Navbar
