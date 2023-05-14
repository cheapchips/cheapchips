import Panel from "../layout/Panel"
import WalletButton from "./WalletButton"
import NavbarProps from "../../proptypes/NavbarProps"
import NavbarLogo from "../layout/NavbarLogo"
import NavbarDropdownMenu from "./NavbarDropdownMenu"

const Navbar = (props:NavbarProps) => {

    const navbarStyles = {
        panelCtn: `
            flex flex-flow-col justify-between
            px-3
            text-black
            dark:text-white
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
            grid grid-flow-col grid-cols-2 grid-cols-[2.5fr,1.25fr] justify-items-end
        `,
        rightContentItemsCtn: `
            grid grid-flow-col
            content-center
            text-sm font-bold
            w-fit
        `,
        rightContentButtonCtn: `
            flex place-items-center w-fit
        `,
        contentText: `
            p-1 px-2 w-fit text-xs
        `,
    }

    const navDropdownData = {
        support: [
            {
                title: "Live Support",
                url: "discord.com",
            },
            {
                title: "FAQ",
                url: "cheapchips.xyz/faq",
            },
        ],
        community: [
            {
                title: "Governance",
                url: "cheapchips.xyz/governance",
            },
            {
                title: "Discord Server",
                url: "discord.com/invite/sldjhkflidfjsdf",
            },
            {
                title: "Twitter",
                url: "twitter.com",
            }
        ]
    }

    return (
        <Panel panelType='nav' additionalClasses={navbarStyles.panelCtn}>
            <div className={navbarStyles.leftContentCtn}>

                <NavbarLogo />

                <div className={navbarStyles.leftContentItemsCtn}>
                    <div className={navbarStyles.contentText}>CHEAPCHIPS</div>
                    <div className={navbarStyles.contentText}>PLAY</div>
                    <div className={navbarStyles.contentText}>BUY TOKENS</div>
                </div>

            </div>

            <div className={navbarStyles.rightContentCtn}>

                <div className={navbarStyles.rightContentItemsCtn}>
                    <div className={navbarStyles.contentText}>
                        <NavbarDropdownMenu buttonText="SUPPORT" dropdownOpts={navDropdownData.support}/>
                    </div>
                    <div className={navbarStyles.contentText}>
                        <NavbarDropdownMenu buttonText="COMMUNITY" dropdownOpts={navDropdownData.community}/>
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
