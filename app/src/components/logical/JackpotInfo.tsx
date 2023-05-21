import JackpotInfoProps from "../../proptypes/JackpotInfoProps"

const JackpotInfo = (props:JackpotInfoProps) => {

    const jackpotInfoStyles = {
        mainCtn: `
            grid grid-flow-row
            auto-rows-max
            w-full h-full
            xl:text-sm
            lg:text-xxs
            md:text-xxxs
        `,
        titleCtn: `
            flex w-full h-fit
            border-b
            border-lightBorder
            dark:border-darkBorder
            xl:p-2
            md:p-1
        `,
        titleText: `
            font-semibold
            lg:p-1
            md:p-0
        `,
        titleTextInactive: `
            w-1/5
            lg:h-7
            md:h-3
            rounded-md
        `,
        infoCtn: `
            w-full grid grid-cols-3 h-fit
            md:grid-cols-[0.4r,0.4fr,0.2fr]
            border-b
            border-lightBorder
            dark:border-darkBorder
            lg:p-2
            md:p-1
            md:text-xxxxs
            lg:text-xs
            xl:text-sm
        `,
        infoContent: `
            p-1
        `,
        infoTitle: `
            font-semibold
            px-1
        `,
        infoValue: `
            font-extrabold
            px-1
        `,
        infoValuePrizePool: `
            text-accentColor
        `,
        infoValueTimer: `
            text-accentColor2
        `,
        infoInactive: `
            w-2/3
            lg:h-6
            md:h-4
            rounded-md
        `,
        poolBarCtn: `
            flex flex-col
            w-full h-full
            lg:p-2
            md:p-1
            gap-2
        `,
        poolBarBorder: `
            rounded-md
            border
            border-lightBorder
            dark:border-darkBorder
        `,
        poolBar: `
            rounded-md
            lg:h-4
            md:h-2
        `,
        poolBarPrize: ` 
            bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-500 to-yellow-300
        `,
        poolBarTimer: `
            bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 to-sky-400
        `,
        inactiveBg: `
            bg-lightBgActive
            dark:bg-darkBgActive
        `,
    }

    return (
        <div className={jackpotInfoStyles.mainCtn}>
            
            <div className={jackpotInfoStyles.titleCtn}>
                {props.active ? 
                    <span className={jackpotInfoStyles.titleText}>Round</span>
                :
                    <span className={jackpotInfoStyles.titleTextInactive + jackpotInfoStyles.inactiveBg}></span>    
                }
            </div>

            <div className={jackpotInfoStyles.infoCtn}>
                {props.active
                ?
                    <>
                    <span className={jackpotInfoStyles.infoTitle}>Prize pool:
                        <span className={jackpotInfoStyles.infoValue + jackpotInfoStyles.infoValuePrizePool}>{props.prizePool} / {props.maxPlayerCount * props.maxDepositAmount}</span>
                    </span>
                    <span className={jackpotInfoStyles.infoTitle}>Game starts in:
                        <span className={jackpotInfoStyles.infoValue + jackpotInfoStyles.infoValueTimer}>{props.timeLeftTillJackpot} s</span>
                    </span>
                    <span className={jackpotInfoStyles.infoTitle}>Round id:
                        <span className={jackpotInfoStyles.infoValue}>{props.jackpotRoundId}</span>
                    </span>
                    </>
                :
                    <>
                        <span className={jackpotInfoStyles.infoInactive + jackpotInfoStyles.inactiveBg}></span>
                        <span className={jackpotInfoStyles.infoInactive + jackpotInfoStyles.inactiveBg}></span>
                        <span className={jackpotInfoStyles.infoInactive + jackpotInfoStyles.inactiveBg}></span>
                    </>
                }
            </div>

            <div className={jackpotInfoStyles.poolBarCtn}>
                {props.active
                ?
                    <>
                    <div className={jackpotInfoStyles.poolBarBorder}>
                        <div style={{width: `${(props.prizePool * 100) / (props.maxDepositAmount * props.maxPlayerCount)}%`}} className={jackpotInfoStyles.poolBar + jackpotInfoStyles.poolBarPrize}></div>
                    </div>
                    <div className={jackpotInfoStyles.poolBarBorder}>
                        <div style={{width: `${(props.timeLeftTillJackpot * 100) / props.maxTimeLeftTillJackpot}%`}}  className={jackpotInfoStyles.poolBar + jackpotInfoStyles.poolBarTimer}></div>
                    </div>
                    </>
                :
                    <>
                        <div className={jackpotInfoStyles.poolBar + jackpotInfoStyles.inactiveBg}></div>
                        <div className={jackpotInfoStyles.poolBar + jackpotInfoStyles.inactiveBg}></div>
                    </>
                }
            </div>

        </div>
    )

}



export default JackpotInfo