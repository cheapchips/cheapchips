import JackpotInfoProps from "../../proptypes/JackpotInfoProps"
import SvgIcon from "../layout/SvgIcon"

const JackpotInfo = (props:JackpotInfoProps) => {

    const jackpotInfoStyles = {
        mainCtn: `
            grid grid-flow-row
            auto-rows-max
            w-full h-full
            xl:text-sm
            lg:text-xxs
            md:text-xxxs
            font-content
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
            flex items-center gap-1
            fill-lightText
            dark:fill-darkText
            font-semibold
            lg:p-1
            md:p-0
        `,
        titleTextInactive: `
            w-1/5
            lg:h-7
            md:h-3
            rounded-md
            animate-pulse
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
            animate-pulse
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
            bg-lightBgActive
            dark:bg-darkBgActive
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
                    <span className={jackpotInfoStyles.titleText}>
                        <SvgIcon style="w-5 h-4" viewBox="0 0 122.88 101.67" pathD="M67.14,55.68h21.15c1.13,0,2.05,0.92,2.05,2.05v41.9c0,1.12-0.92,2.05-2.05,2.05l-21.15,0 c-1.12,0-2.05-0.92-2.05-2.05v-41.9C65.09,56.6,66.01,55.68,67.14,55.68L67.14,55.68z M2.05,0H23.2c1.13,0,2.05,0.93,2.05,2.05 v97.58c0,1.12-0.93,2.05-2.05,2.05H2.05c-1.12,0-2.05-0.92-2.05-2.05V2.05C0,0.92,0.92,0,2.05,0L2.05,0z M99.68,76.33h21.15 c1.13,0,2.05,0.93,2.05,2.05v21.25c0,1.12-0.92,2.05-2.05,2.05H99.68c-1.12,0-2.05-0.92-2.05-2.05V78.38 C97.64,77.25,98.56,76.33,99.68,76.33L99.68,76.33L99.68,76.33z M34.59,31.5h21.15c1.13,0,2.05,0.93,2.05,2.05v66.07 c0,1.12-0.93,2.05-2.05,2.05H34.59c-1.12,0-2.05-0.92-2.05-2.05V33.55C32.54,32.42,33.47,31.5,34.59,31.5L34.59,31.5z" />
                        <span>Round</span>
                    </span>
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