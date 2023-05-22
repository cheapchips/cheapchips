import Panel from "../layout/Panel"
import WalletButton from "./WalletButton"
import NavbarProps from "../../proptypes/NavbarProps"
import NavbarLogo from "../layout/NavbarLogo"
import DropdownMenu from "./DropdownMenu"
import SvgIcon from "../layout/SvgIcon"

const Navbar = (props:NavbarProps) => {

    const navbarStyles = {
        panelCtn: `
            flex flex-flow-col justify-between px-3
            text-lightText
            dark:text-darkText
            md:text-xxxs
            lg:text-xxs
            xl:text-sm
        `,
        leftContentCtn: `
            grid grid-flow-col
            content-center
        `,
        leftContentItemsCtn: `
            grid grid-flow-col
            font-bold
            gap-4
            lg:gap-2
            md:gap-0
        `,
        rightContentCtn: `
            grid grid-flow-col grid-cols-2 grid-cols-[auto,1.25fr]
            justify-items-end
        `,
        rightContentItemsCtn: `
            grid grid-flow-col
            w-fit content-center
            font-bold
        `,
        rightContentButtonCtn: `
            flex place-items-center
        `,
        contentText: `
            p-1 px-2 w-fit
            text-lightText
            dark:text-darkText
            select-none
        `,
        contentButton: `
            active:opacity-75
        `,
        contentBtnText: `
            hover:text-accentColor
        `,
        themeBtnCtn: `
            flex justify-center items-center
            px-2
            cursor-pointer
        `,
        themeBtn: `
            xl:w-5 xl:h-5
            lg:w-4 lg:h-4
            md:w-4 md:h-4
            fill-lightText
            stroke-lightText
            dark:fill-darkText
            dark:stroke-darkText
            hover:stroke-accentColor
            hover:fill-accentColor
            dark:hover:stroke-accentColor
            dark:hover:fill-accentColor
            stroke
        `,
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

    // theme switcher button
    function navThemeSwitch() {
        const lightIconData = {
            viewBox: "0 0 122.88 122.89",
            pathD: "M49.06,1.27c2.17-0.45,4.34-0.77,6.48-0.98c2.2-0.21,4.38-0.31,6.53-0.29c1.21,0.01,2.18,1,2.17,2.21 c-0.01,0.93-0.6,1.72-1.42,2.03c-9.15,3.6-16.47,10.31-20.96,18.62c-4.42,8.17-6.1,17.88-4.09,27.68l0.01,0.07 c2.29,11.06,8.83,20.15,17.58,25.91c8.74,5.76,19.67,8.18,30.73,5.92l0.07-0.01c7.96-1.65,14.89-5.49,20.3-10.78 c5.6-5.47,9.56-12.48,11.33-20.16c0.27-1.18,1.45-1.91,2.62-1.64c0.89,0.21,1.53,0.93,1.67,1.78c2.64,16.2-1.35,32.07-10.06,44.71 c-8.67,12.58-22.03,21.97-38.18,25.29c-16.62,3.42-33.05-0.22-46.18-8.86C14.52,104.1,4.69,90.45,1.27,73.83 C-2.07,57.6,1.32,41.55,9.53,28.58C17.78,15.57,30.88,5.64,46.91,1.75c0.31-0.08,0.67-0.16,1.06-0.25l0.01,0l0,0L49.06,1.27 L49.06,1.27z M51.86,5.2c-0.64,0.11-1.28,0.23-1.91,0.36l-1.01,0.22l0,0c-0.29,0.07-0.63,0.14-1,0.23 c-14.88,3.61-27.05,12.83-34.7,24.92C5.61,42.98,2.46,57.88,5.56,72.94c3.18,15.43,12.31,28.11,24.51,36.15 c12.19,8.03,27.45,11.41,42.88,8.23c15-3.09,27.41-11.81,35.46-23.49c6.27-9.09,9.9-19.98,10.09-31.41 c-2.27,4.58-5.3,8.76-8.96,12.34c-6,5.86-13.69,10.13-22.51,11.95l-0.01,0c-12.26,2.52-24.38-0.16-34.07-6.54 c-9.68-6.38-16.93-16.45-19.45-28.7l0-0.01C31.25,40.58,33.1,29.82,38,20.77C41.32,14.63,46.05,9.27,51.86,5.2L51.86,5.2z",
        }
        const darkIconData = {
            viewBox: "0 0 240 240",
            pathD: "M58.57,25.81c-2.13-3.67-0.87-8.38,2.8-10.51c3.67-2.13,8.38-0.88,10.51,2.8l9.88,17.1c2.13,3.67,0.87,8.38-2.8,10.51 c-3.67,2.13-8.38,0.88-10.51-2.8L58.57,25.81L58.57,25.81z M120,51.17c19.01,0,36.21,7.7,48.67,20.16 C181.12,83.79,188.83,101,188.83,120c0,19.01-7.7,36.21-20.16,48.67c-12.46,12.46-29.66,20.16-48.67,20.16 c-19.01,0-36.21-7.7-48.67-20.16C58.88,156.21,51.17,139.01,51.17,120c0-19.01,7.7-36.21,20.16-48.67 C83.79,58.88,101,51.17,120,51.17L120,51.17z M158.27,81.73c-9.79-9.79-23.32-15.85-38.27-15.85c-14.95,0-28.48,6.06-38.27,15.85 c-9.79,9.79-15.85,23.32-15.85,38.27c0,14.95,6.06,28.48,15.85,38.27c9.79,9.79,23.32,15.85,38.27,15.85 c14.95,0,28.48-6.06,38.27-15.85c9.79-9.79,15.85-23.32,15.85-38.27C174.12,105.05,168.06,91.52,158.27,81.73L158.27,81.73z M113.88,7.71c0-4.26,3.45-7.71,7.71-7.71c4.26,0,7.71,3.45,7.71,7.71v19.75c0,4.26-3.45,7.71-7.71,7.71 c-4.26,0-7.71-3.45-7.71-7.71V7.71L113.88,7.71z M170.87,19.72c2.11-3.67,6.8-4.94,10.48-2.83c3.67,2.11,4.94,6.8,2.83,10.48 l-9.88,17.1c-2.11,3.67-6.8,4.94-10.48,2.83c-3.67-2.11-4.94-6.8-2.83-10.48L170.87,19.72L170.87,19.72z M214.19,58.57 c3.67-2.13,8.38-0.87,10.51,2.8c2.13,3.67,0.88,8.38-2.8,10.51l-17.1,9.88c-3.67,2.13-8.38,0.87-10.51-2.8 c-2.13-3.67-0.88-8.38,2.8-10.51L214.19,58.57L214.19,58.57z M232.29,113.88c4.26,0,7.71,3.45,7.71,7.71 c0,4.26-3.45,7.71-7.71,7.71h-19.75c-4.26,0-7.71-3.45-7.71-7.71c0-4.26,3.45-7.71,7.71-7.71H232.29L232.29,113.88z M220.28,170.87 c3.67,2.11,4.94,6.8,2.83,10.48c-2.11,3.67-6.8,4.94-10.48,2.83l-17.1-9.88c-3.67-2.11-4.94-6.8-2.83-10.48 c2.11-3.67,6.8-4.94,10.48-2.83L220.28,170.87L220.28,170.87z M181.43,214.19c2.13,3.67,0.87,8.38-2.8,10.51 c-3.67,2.13-8.38,0.88-10.51-2.8l-9.88-17.1c-2.13-3.67-0.87-8.38,2.8-10.51c3.67-2.13,8.38-0.88,10.51,2.8L181.43,214.19 L181.43,214.19z M126.12,232.29c0,4.26-3.45,7.71-7.71,7.71c-4.26,0-7.71-3.45-7.71-7.71v-19.75c0-4.26,3.45-7.71,7.71-7.71 c4.26,0,7.71,3.45,7.71,7.71V232.29L126.12,232.29z M69.13,220.28c-2.11,3.67-6.8,4.94-10.48,2.83c-3.67-2.11-4.94-6.8-2.83-10.48 l9.88-17.1c2.11-3.67,6.8-4.94,10.48-2.83c3.67,2.11,4.94,6.8,2.83,10.48L69.13,220.28L69.13,220.28z M25.81,181.43 c-3.67,2.13-8.38,0.87-10.51-2.8c-2.13-3.67-0.88-8.38,2.8-10.51l17.1-9.88c3.67-2.13,8.38-0.87,10.51,2.8 c2.13,3.67,0.88,8.38-2.8,10.51L25.81,181.43L25.81,181.43z M7.71,126.12c-4.26,0-7.71-3.45-7.71-7.71c0-4.26,3.45-7.71,7.71-7.71 h19.75c4.26,0,7.71,3.45,7.71,7.71c0,4.26-3.45,7.71-7.71,7.71H7.71L7.71,126.12z M19.72,69.13c-3.67-2.11-4.94-6.8-2.83-10.48 c2.11-3.67,6.8-4.94,10.48-2.83l17.1,9.88c3.67,2.11,4.94,6.8,2.83,10.48c-2.11,3.67-6.8,4.94-10.48,2.83L19.72,69.13L19.72,69.13z"
        }
        return props.theme === "dark" ? darkIconData : lightIconData
    }

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
            <span className={navbarStyles.contentBtnText}>{button.text}</span>
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

                    <div className={navbarStyles.themeBtnCtn} onClick={() => props.themeBtnOnClick()}>
                        <SvgIcon
                            style={navbarStyles.themeBtn}
                            viewBox={navThemeSwitch().viewBox}
                            pathD={navThemeSwitch().pathD}
                        />
                    </div>

                    <div className={navbarStyles.contentText}>
                        <DropdownMenu buttonText="SUPPORT" dropdownOpts={navDropdownData.support}/>
                    </div>
                    <div className={navbarStyles.contentText}>
                        <DropdownMenu buttonText="COMMUNITY" dropdownOpts={navDropdownData.community}/>
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
