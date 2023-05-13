import Panel from "./Panel"
import WalletButton from "../logical/WalletButton"
import NavbarProps from "../../proptypes/NavbarProps"
import NavbarLogo from "./NavbarLogo"
import NavbarDropdownMenu from "./NavbarDropdownMenu"

const Navbar = (props:NavbarProps) => {

    const navbarStyles = {
        panelCtn: `
            flex flex-flow-col justify-between
            px-3
            text-white
        `,
        leftContentCtn: `
            w-fit w-max-1/3
            flex
        `,
        leftContentItemsCtn: `
            grid grid-flow-col gap-4 px-2
            text-sm font-bold
            content-center
        `,
        rightContentCtn: `
            grid grid-flow-col grid-cols-2 grid-cols-[4fr,1.5fr]
        `,
        rightContentItemsCtn: `
            grid grid-flow-col
            content-center
            text-sm font-bold
        `,
        rightContentButtonCtn: `
            flex place-items-center
        `,
        contentText: `
            p-1 w-fit
        `,
    }

    return (
        <Panel panelType='nav' additionalClasses={navbarStyles.panelCtn}>
            <div className={navbarStyles.leftContentCtn}>

                <NavbarLogo />

                <div className={navbarStyles.leftContentItemsCtn}>
                    <p>CHEAPCHIPS</p>
                    <p>PLAY</p>
                    <p>BUY TOKENS</p>
                </div>
            </div>

            <div className={navbarStyles.rightContentCtn}>

                <div className={navbarStyles.rightContentItemsCtn}>
                    <div className={navbarStyles.contentText}>TEst</div>
                    <div className={navbarStyles.contentText}>
                        <NavbarDropdownMenu buttonText="SUPPORT" dropdownOptions={["DOCS", "GITHUB", "TUMER KOX"]}/>
                    </div>
                </div>

                <div className={navbarStyles.rightContentButtonCtn}>
                        <WalletButton
                            clickable={props.connectWalletProps.clickable}
                            active={props.connectWalletProps.active}
                            text={props.connectWalletProps.text}
                            onClickFunction={() => props.connectWalletProps.onClickFunction}
                        />
                </div>

            </div>

        </Panel>
    )
}

export default Navbar
