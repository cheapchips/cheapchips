import { useState, useEffect, useContext } from "react" 
import SvgIcon from "../layout/SvgIcon"
import JackpotContext from "../../contexts/JackpotContext"
import Web3Context from "../../contexts/Web3Context"
import useJackpot from "../../hooks/useJackpot"

const JackpotRoundInfo = () => {

    const styles = {
        mainCtn: `
            grid grid-flow-row
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
            lg:p-2
            md:p-1
        `,
        titleText: `
            flex items-center gap-1
            fill-lightText
            dark:fill-darkText
            font-semibold
            2xl:p-1
            xl:p-1
            md:p-0
            select-none
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
            select-none
        `,
        infoValue: `
            font-extrabold
            px-1
            select-none
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
        winChanceCtn: `
            flex justify-center items-center
            text-lg
            border-b border-lightBorder dark:border-darkBorder
            pb-2
        `,
        winChanceValue: `
            font-semibold text-accentColor
        `,
    }

    const web3 = useContext(Web3Context)
    const [,readJackpot] = useJackpot()
    const jackpotContext = useContext(JackpotContext)
    const [active, setActive] = useState<boolean>(false)
    const [timer, setTimer] = useState<NodeJS.Timer>()
    const [depositTimer, setDepositTimer] = useState<number>(60)
    const [winChance, setWinChance] = useState<number>(0)

    useEffect(() => {
        (async() => {
            if(jackpotContext.roundState == "closed"){
                console.log("closed 1")
                setDepositTimer(0)
            }else {
                setDepositTimer(60)
                clearInterval(timer)
            }
        })()
    }, [jackpotContext.roundState])

    useEffect(() => {
        updateWinChance()
    }, [jackpotContext.prizePool])

    useEffect(() => {
        if(!web3.address || !jackpotContext.endTime || !jackpotContext.maxPlayers || !jackpotContext.prizePool || !jackpotContext.maxChipsDeposit) return
        setActive(true)
        if(jackpotContext.players!.length >= 3){
            console.log('Enough players joined. starting timer')
            countdownEndTime()
        }
    }, [web3, jackpotContext])

    useEffect(() => () => { clearInterval(timer)}, [])
    async function countdownEndTime() {
            
        if(jackpotContext.roundState === "ended") return
        const endTime = (await readJackpot.getRoundData(jackpotContext.roundId)).endTime.getTime()


        const _timer = setInterval(() => {
            const timeLeft = Math.floor((endTime - Date.now())/ 1000)
            if(timeLeft <= 0) {
                setDepositTimer(0)
                clearInterval(_timer)
                return
            }
            setDepositTimer(timeLeft)
        }, 1000)

        setTimer(_timer)
    }

    async function updateWinChance() {
        if(jackpotContext.prizePool === 0){
            setWinChance(0)
            return
        }
        const roundTickets = (await readJackpot.getRoundData(jackpotContext.roundId)).tickets
        const localPlayerId = await readJackpot.getPlayerIdInRound(jackpotContext.roundId)
        if(localPlayerId === -1) {
            setWinChance(0)
            return
        } 
        const localPlayerTickets = roundTickets.filter((id:number) => id === localPlayerId).length
        setWinChance(localPlayerTickets / roundTickets.length)
    }

    return (
        <div className={styles.mainCtn}>
            
            <div className={styles.titleCtn}>
                {active
                ? 
                    <span className={styles.titleText}>
                        <SvgIcon style="w-5 h-4" viewBox="0 0 122.88 108.91" pathD="M2.79,41.59L61.44,0l58.95,41.59L2.79,41.59L2.79,41.59z M0,102.28h9.08v-6.33h1.32v-3.02l3.85,0V56.7H6.38 v-8.68h110.11v8.68h-7.86v36.23h3.85v3.02l1.32,0v6.33h9.08v6.63H0V102.28L0,102.28z M32.59,95.95h4.44v-3.02l3.85,0V56.7H28.74 v36.23h3.85V95.95L32.59,95.95L32.59,95.95z M59.22,95.95h4.45v-3.02l3.84,0V56.7H55.37v36.23h3.85V95.95L59.22,95.95L59.22,95.95z M85.85,95.95h4.45v-3.02l3.85,0V56.7H82v36.23h3.85V95.95L85.85,95.95L85.85,95.95z M41.69,31.1l19.84-15.22L81.48,31.1H41.69 L41.69,31.1z" />
                        <span>Round info</span>
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
                        <span className={styles.infoValue + styles.infoValuePrizePool}>{jackpotContext.prizePool}/{jackpotContext.maxPlayers! * jackpotContext.maxChipsDeposit!}</span>
                    </span>
                    <span className={styles.infoTitle}>{depositTimer === 0 ? "Game in progress..." : "Game starts in:"}
                        <span className={styles.infoValue + styles.infoValueTimer}>{depositTimer !== 0 ? (depositTimer + "s") : ""}</span>
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
                            <div style={{width: `${(jackpotContext.prizePool! * 100) / (jackpotContext.maxChipsDeposit! * jackpotContext.maxPlayers!)}%`}} className={styles.poolBar + styles.poolBarPrize}></div>
                        </div>
                        <div className={styles.poolBarBorder}>
                            <div style={{width: `${(depositTimer! / jackpotContext.endTime!) * 100}%`}} className={styles.poolBar + styles.poolBarTimer}></div>
                        </div>
                    </>
                :
                    <>
                        <div className={styles.poolBar + styles.inactiveBg}></div>
                        <div className={styles.poolBar + styles.inactiveBg}></div>
                    </>
                }
            </div>

            <div className={styles.winChanceCtn}>
                {
                    active
                    ?
                        <span>Win chance:
                            <span className={styles.winChanceValue}> {Math.round((winChance * 100)).toString()}% </span>
                        </span>
                    :
                        <></>
                }
            </div>
            
        </div>
    )

}



export default JackpotRoundInfo