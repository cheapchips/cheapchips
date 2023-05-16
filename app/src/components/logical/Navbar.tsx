import Panel from "../layout/Panel"
import WalletButton from "./WalletButton"
import NavbarProps from "../../proptypes/NavbarProps"
import NavbarLogo from "../layout/NavbarLogo"
import NavbarDropdownMenu from "./NavbarDropdownMenu"

const Navbar = (props:NavbarProps) => {

    const navbarStyles = {
        panelCtn: `
            flex flex-flow-col justify-between px-3
            text-lightText
            dark:text-darkText
        `,
        leftContentCtn: `
        flex items-center
        `,
        leftContentItemsCtn: `
            grid grid-flow-col gap-4 pr-2
            text-sm font-bold
        `,
        rightContentCtn: `
            grid grid-flow-col grid-cols-2 grid-cols-[2.5fr,1.25fr]
            justify-items-end
        `,
        rightContentItemsCtn: `
            grid grid-flow-col
            w-fit content-center
            text-sm font-bold
        `,
        rightContentButtonCtn: `
            flex place-items-center
        `,
        contentText: `
            p-1 px-2 w-fit text-xs
            text-black
            dark:text-white
        `,
        contentButton: `active:opacity-75`
    }

    // main links (nav left side)
    const navMainLinksData = [
        {
            text: "CHEAPCHIPS",
            url: "#",
        },
        {
            text: "PLAY",
            url: "#",
        },
        {
            text: "BUY TOKENS",
            url: "#",
        }
    ]

    // links, data, customization (nav right side)
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

    const MainLinks = navMainLinksData.map((button, index) => 
        <button key={index} className={navbarStyles.contentText + navbarStyles.contentButton} onClick={() => window.open(button.url, "_self")}>
            {button.text}
        </button>
    )

    return (
        <Panel panelType='nav' additionalClasses={navbarStyles.panelCtn}>
            <div className={navbarStyles.leftContentCtn}>

                <NavbarLogo />

                <div className={navbarStyles.leftContentItemsCtn}>
                   {MainLinks}
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
