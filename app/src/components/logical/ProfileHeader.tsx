import ProfileHeaderProps from "../../proptypes/ProfileHeaderProps"
import Blockies from "react-blockies"
import SvgIcon from "../layout/SvgIcon"
import chipsLogo from "../../assets/logo.png"
import chainlinkLogo from "../../assets/chainlink_logo.png"

const ProfileHeader = (props:ProfileHeaderProps) => {

    const profileStyles = {
        ctn: `
            grid grid-flow-row grid-rows-[auto,fit,auto]
            gap-2
            text-lightText
            dark:text-darkText
            md:text-xxxs
            lg:text-xxs
            xl:text-sm
            border-b
            border-lightBorder
            dark:border-darkBorder
        `,
            profileTitleCtn: `
            flex justify-start content-center w-full h-fit
            border-b
            border-lightBorder
            dark:border-darkBorder
            font-semibold
            p-2
        `,
        profileTitleContent: `
            flex flex-row gap-1 justify-center items-center
            p-1
            fill-lightText
            dark:fill-darkText
        `,
        profileTitleContentInactive: `
            w-1/4
            lg:h-7
            md:h-5
            rounded-md
        `,
        profileMainContentCtn: `
            grid grid-flow-col grid-cols-[1fr,1fr,1fr]
            w-full h-fit
            px-2
            gap-1
            xl:text-sm
            lg:text-xxs
            md:text-xxxs
        `,
        profileIconCtn: `
            flex justify-center items-center content-center
            rounded-full
            border
            bg-lightBgActive
            dark:bg-darkBgActive
            border-lightBorder
            dark:border-darkBorder
            aspect-square
            overflow-hidden
        `,
        profileIcon: `
            rounded-full
            p-2
        `,
        profileIconInactive: `
            w-12 h-12
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-full
        `,
        profileBalancesCtn: `
            grid grid-flow-row grid-rows-[1fr,1fr] col-span-2 items-center
            p-1
        `,
        profileBalancesContent: `
            flex justify-start items-center gap-1 h-fit
            flex-flow-col flex-wrap
            font-semibold
            p-1
            border-b
            border-lightBorder
            dark:border-darkBorder
            2xl:text-sm
            xl:text-xs
            lg:text-xxs
            md:text-xxxxs
        `,
        profileBalancesValue: `
            font-extrabold
        `,
        chipsBalanceValue: `
            text-accentColor
        `,
        linkBalanceValue: `
            text-accentColor2
        `,
        profileSecondaryContentCtn: `
            grid grid-flow-row grid-rows-[1fr,1fr]
            items-center
            border-t
            border-lightBorder
            dark:border-darkBorder
            lg:p-2
            md:p-1
        `,
        profileSecondaryContent: `
            px-1 break-normal truncate
        `,
        profileSecondaryContentInactive: `
            w-full h-4 rounded-md
        `,
        profileSecondaryContentTitle: `
        `,
        profileSecondaryContentValue: `
            font-thin
            lg:text-xxs
            md:text-xxxs
        `,
        profileSecondaryContentDetailsBtnCtn: `
            flex justify-center content-center items-center gap-2
        `,
        profileSecondaryContentDetailsBtnCtnInactive: `
            w-3/4 
            rounded-md
            lg:h-7
            md:h-2
        `,
        profileSecondaryContentDetailsBtn: `
            lg:px-6 py-1
            md:px-2
            border
            border-lightBorder
            dark:border-darkBorder
            rounded-md
            bg-lightBgActive
            dark:bg-darkBgActive
            hover:text-black
            dark:hover:text-accentColor
            xl:text-sm
            lg:text-xxxs
            md:text-xxxxs
        `,
        inactiveBg: `
            bg-lightBgActive
            dark:bg-darkBgActive
        `,
    }

    return (
        <div className={profileStyles.ctn}>

            {/* Title */}
            <div className={profileStyles.profileTitleCtn}>
                {props.active
                ?
                <span className={profileStyles.profileTitleContent}>
                    <SvgIcon style="w-4 h-4" viewBox="0 0 122.88 121.42" pathD="M0,121.42l0-19.63c10.5-4.67,42.65-13.56,44.16-26.41c0.34-2.9-6.5-13.96-8.07-19.26 c-3.36-5.35-4.56-13.85-0.89-19.5c1.46-2.25,0.84-10.44,0.84-13.53c0-30.77,53.92-30.78,53.92,0c0,3.89-0.9,11.04,1.22,14.1 c3.54,5.12,1.71,14.19-1.27,18.93c-1.91,5.57-9.18,16.11-8.56,19.26c2.31,11.74,32.13,19.63,41.52,23.8l0,22.23L0,121.42L0,121.42z" />
                    <span>Profile</span>
                </span>
                :
                <span className={profileStyles.profileTitleContentInactive + profileStyles.inactiveBg}></span>
                }
            </div>
            
            <div className={profileStyles.profileMainContentCtn}>
                
                {/* Profile icon */}
                <div className={profileStyles.profileIconCtn}>
                    {props.active ? <Blockies seed={props.address} className={profileStyles.profileIcon} size={24}/> : <div className="w-12 h-12 dark:bg-darkBgActive rounded-full"></div>}
                </div>
                
                {/* Balance list */}
                <div className={profileStyles.profileBalancesCtn}>
                    
                    {props.active
                        ?
                            <>
                                <div className={profileStyles.profileBalancesContent}>
                                    <span>Token balance:</span>
                                    <span className={profileStyles.profileBalancesValue + profileStyles.chipsBalanceValue}>{props.chipsBalance}</span>
                                    <img className="xl:w-4 xl:h-4 md:w-2 md:h-2 -rotate-6" src={chipsLogo} alt="CheapChips mini logo" ></img>
                                </div>
                                <div className={profileStyles.profileBalancesContent}>
                                    <span>Link balance:</span>
                                    <span className={profileStyles.profileBalancesValue + profileStyles.linkBalanceValue}>{props.linkBalance}</span>
                                    <img className="xl:w-4 xl:h-4 md:w-2 md:h-2" src={chainlinkLogo} alt="Chainlink mini logo" />
                                </div>
                            </>
                        :
                            <>
                                <div className={profileStyles.profileBalancesContent}>
                                    <span className="w-1/3 h-5 rounded-md bg-lightBgActive dark:bg-darkBgActive"></span>
                                    <span className="w-1/4 h-5 rounded-md bg-lightBgActive dark:bg-darkBgActive"></span>
                                </div>
                                <div className={profileStyles.profileBalancesContent}>
                                    <span className="w-1/3 h-5 rounded-md bg-lightBgActive dark:bg-darkBgActive"></span>
                                    <span className="w-1/4 h-5 rounded-md bg-lightBgActive dark:bg-darkBgActive"></span>
                                </div>
                            </>
                    }
                </div>
            
            </div>

            {/* Address, details button */}
            <div className={profileStyles.profileSecondaryContentCtn}>
                
                {props.active
                    ?
                    <>
                        <div className={profileStyles.profileSecondaryContent}>
                            <span className={profileStyles.profileSecondaryContentTitle}>Address: </span>
                            <span className={profileStyles.profileSecondaryContentValue}>{props.address}</span>
                        </div>
                        <div className={profileStyles.profileSecondaryContentDetailsBtnCtn}>
                            <button className={profileStyles.profileSecondaryContentDetailsBtn}>My Details</button>
                            <button className={profileStyles.profileSecondaryContentDetailsBtn}>Buy Balance</button>
                        </div>
                    </>
                    :
                    <>
                        <div className={profileStyles.profileSecondaryContentInactive + profileStyles.inactiveBg}></div>
                        <div className={profileStyles.profileSecondaryContentDetailsBtnCtnInactive + profileStyles.inactiveBg}></div>
                    </>
                }


            </div>

        </div>
    )

}


export default ProfileHeader