import ProfileHeaderProps from "../../proptypes/ProfileHeaderProps"
import Blockies from "react-blockies"

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
            p-1
        `,
        profileTitleContentInactive: `
            w-1/4
            h-7
            rounded-md
        `,
        profileMainContentCtn: `
            grid grid-flow-col grid-cols-[1fr,1fr,1fr]
            w-full h-fit
            px-2
            gap-1
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
        `,
        profileBalancesValue: `
            font-extrabold
            text-accentColor
        `,
        profileSecondaryContentCtn: `
            grid grid-flow-row grid-rows-[1fr,1fr]
            items-center
            border-t
            border-lightBorder
            dark:border-darkBorder
            p-2
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
            text-xxs
        `,
        profileSecondaryContentDetailsBtnCtn: `
            flex justify-center content-center items-center gap-2
        `,
        profileSecondaryContentDetailsBtnCtnInactive: `
            w-3/4 h-7 rounded-md
        `,
        profileSecondaryContentDetailsBtn: `
            px-6 py-1
            border
            border-lightBorder
            dark:border-darkBorder
            rounded-md
            hover:bg-lightBgActive
            dark:hover:bg-darkBgActive
            hover:text-black
            dark:hover:text-accentColor
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
                {props.active ? <span className={profileStyles.profileTitleContent}>{props.title}</span> : <span className={profileStyles.profileTitleContentInactive + profileStyles.inactiveBg}></span>}
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
                                    <span className={profileStyles.profileBalancesValue}>{props.chipsBalance}</span>
                                </div>
                                <div className={profileStyles.profileBalancesContent}>
                                    <span>Link balance:</span>
                                    <span className={profileStyles.profileBalancesValue}>{props.linkBalance}</span>
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
                            <button className={profileStyles.profileSecondaryContentDetailsBtn}>Buy Tokens</button>
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