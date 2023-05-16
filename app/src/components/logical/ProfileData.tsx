import ProfileDataProps from "../../proptypes/ProfileDataProps"
import Blockies from "react-blockies"

const ProfileData = (props:ProfileDataProps) => {

    const profileStyles = {
        ctn: `
            grid grid-flow-row grid-rows-[auto,fit,auto]
            gap-2
            text-lightText
            dark:text-darkText
            text-sm
        `,
            profileTitleCtn: `
            flex justify-start content-center w-full h-fit
            border-b
            border-lightBorder
            dark:border-darkBorder
            font-bold
            p-2
        `,
        profileTitleContent: `
            font-bold
            p-1
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
            border-lightBorder
            dark:border-darkBorder
            aspect-square
            overflow-hidden
        `,
        profileIcon: `
            rounded-full
            p-2
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
        `,
        profileBalancesValue: `
            font-normal
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
            px-1
        `,
        profileSecondaryContentTitle: `
            font-bold
        `,
        profileSecondaryContentValue: `
            text-xxs
        `,
        profileSecondaryContentDetailsBtnCtn: `
            flex justify-center content-center items-center gap-2
        `,
        profileSecondaryContentDetailsBtn: `
            px-6 py-1
            border
            border-lightBorder
            dark:border-darkBorder
            rounded-md
            hover:bg-lightBgActive
            dark:hover:bg-darkBgActive
        `,
    }

    return (
        <div className={profileStyles.ctn}>

            {/* Title */}
            <div className={profileStyles.profileTitleCtn}>
                <span className={profileStyles.profileTitleContent}>{props.title}</span>
            </div>
            
            <div className={profileStyles.profileMainContentCtn}>
                
                {/* Profile icon */}
                <div className={profileStyles.profileIconCtn}>
                    <Blockies seed={props.address} className={profileStyles.profileIcon} size={24}/>
                </div>
                
                {/* Balance list */}
                <div className={profileStyles.profileBalancesCtn}>
                    
                    <div className={profileStyles.profileBalancesContent}>
                        Token balance:
                        <span className={profileStyles.profileBalancesValue}>{props.chipsBalance}</span>
                    </div>
                    <div className={profileStyles.profileBalancesContent}>
                        Link balance:
                        <span className={profileStyles.profileBalancesValue}>{props.linkBalance}</span>
                    </div>
                </div>
            
            </div>

            {/* Address, details button */}
            <div className={profileStyles.profileSecondaryContentCtn}>
                
                <div className={profileStyles.profileSecondaryContent}>
                    <span className={profileStyles.profileSecondaryContentTitle}>Address: </span>
                    <span className={profileStyles.profileSecondaryContentValue}>{props.address}</span>
                </div>

                <div className={profileStyles.profileSecondaryContentDetailsBtnCtn}>
                    <button className={profileStyles.profileSecondaryContentDetailsBtn}>My Details</button>
                    <button className={profileStyles.profileSecondaryContentDetailsBtn}>Copy address</button>
                </div>

            </div>

        </div>
    )

}


export default ProfileData