import { useState, useEffect, useContext } from "react" 
import SvgIcon from "../layout/SvgIcon"
import JackpotContext from "../../contexts/JackpotContext"
import Web3Context from "../../contexts/Web3Context"

const JackpotInfo = () => {

    const styles = {
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
            border border-lightBorder dark:border-darkBorder
            bg-lightBgActivedark:bg-darkBgActive
            rounded-md
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
            animate-pulse
        `,
    }

    const web3 = useContext(Web3Context)
    const jackpotContext = useContext(JackpotContext)
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        if(!web3.address || !jackpotContext.endDepositTime || !jackpotContext.prizePool || !jackpotContext.maxNumberOfPlayers) return
        setActive(true)
    }, [web3, jackpotContext])

    return (
        <div className={styles.mainCtn}>
            
            <div className={styles.titleCtn}>
                {active
                ? 
                    <span className={styles.titleText}>
                        <SvgIcon style="w-5 h-4" viewBox="0 0 122.88 101.67" pathD="M67.14,55.68h21.15c1.13,0,2.05,0.92,2.05,2.05v41.9c0,1.12-0.92,2.05-2.05,2.05l-21.15,0 c-1.12,0-2.05-0.92-2.05-2.05v-41.9C65.09,56.6,66.01,55.68,67.14,55.68L67.14,55.68z M2.05,0H23.2c1.13,0,2.05,0.93,2.05,2.05 v97.58c0,1.12-0.93,2.05-2.05,2.05H2.05c-1.12,0-2.05-0.92-2.05-2.05V2.05C0,0.92,0.92,0,2.05,0L2.05,0z M99.68,76.33h21.15 c1.13,0,2.05,0.93,2.05,2.05v21.25c0,1.12-0.92,2.05-2.05,2.05H99.68c-1.12,0-2.05-0.92-2.05-2.05V78.38 C97.64,77.25,98.56,76.33,99.68,76.33L99.68,76.33L99.68,76.33z M34.59,31.5h21.15c1.13,0,2.05,0.93,2.05,2.05v66.07 c0,1.12-0.93,2.05-2.05,2.05H34.59c-1.12,0-2.05-0.92-2.05-2.05V33.55C32.54,32.42,33.47,31.5,34.59,31.5L34.59,31.5z" />
                        <span>Round</span>
                    </span>
                :
                    <span className={styles.titleTextInactive + styles.inactiveBg}></span>    
                }
            </div>

            <div className={styles.infoCtn}>
                {active
                ?
                    <>
                    <span className={styles.infoTitle}>Prize pool:
                        <span className={styles.infoValue + styles.infoValuePrizePool}>{jackpotContext.prizePool}/{jackpotContext.maxNumberOfPlayers! * jackpotContext.maxChipsDeposit!}</span>
                    </span>
                    <span className={styles.infoTitle}>Game starts in:
                        <span className={styles.infoValue + styles.infoValueTimer}>{jackpotContext.endDepositTime}s</span>
                    </span>
                    <span className={styles.infoTitle}>Round id:
                        <span className={styles.infoValue}>{jackpotContext.roundId}</span>
                    </span>
                    </>
                :
                    <>
                        <span className={styles.infoInactive + styles.inactiveBg}></span>
                        <span className={styles.infoInactive + styles.inactiveBg}></span>
                        <span className={styles.infoInactive + styles.inactiveBg}></span>
                    </>
                }
            </div>

            <div className={styles.poolBarCtn}>
                {active
                ?
                    <>
                        <div className={styles.poolBarBorder}>
                            <div style={{width: `${(jackpotContext.prizePool! * 100) / (jackpotContext.maxChipsDeposit! * jackpotContext.maxNumberOfPlayers!)}%`}} className={styles.poolBar + styles.poolBarPrize}></div>
                        </div>
                        <div className={styles.poolBarBorder}>
                            {/* fix this later */}
                            <div style={{width: `${(jackpotContext.endDepositTime! * 100) / 400}%`}}  className={styles.poolBar + styles.poolBarTimer}></div>
                        </div>
                    </>
                :
                    <>
                        <div className={styles.poolBar + styles.inactiveBg}></div>
                        <div className={styles.poolBar + styles.inactiveBg}></div>
                    </>
                }
            </div>

        </div>
    )

}



export default JackpotInfo