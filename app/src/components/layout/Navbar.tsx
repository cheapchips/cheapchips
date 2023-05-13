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
            grid grid-flow-col
            w-fit w-max-1/3
        `,
        leftContentItemsCtn: `
            grid grid-flow-col
            gap-10
            content-center
        `,
        rightContentCtn: `
        `,
        rightContentItemsCtn: `
        `,
        contentItem: `
            p-1
        `,
        logoContainer: `
            w-14 w-max-14 h-fit
        `,
        logo: `
            p-3
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
                    <div className={navbarStyles.contentItem}>CHEAPCHIPS</div>
                    <div className={navbarStyles.contentItem}>PLAY</div>
                    <div className={navbarStyles.contentItem}>DEX</div>
                    <div className={navbarStyles.contentItem}>
                        <WalletButton
                            clickable={props.connectWalletProps.clickable}
                            active={props.connectWalletProps.active}
                            text={props.connectWalletProps.text}
                            onClickFunction={() => props.connectWalletProps.onClickFunction}
                        />
                    </div>
                </div>
            </div>
        </Panel>
    )
}

export default Navbar
