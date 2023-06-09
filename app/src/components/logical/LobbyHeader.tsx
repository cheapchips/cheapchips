import SvgIcon from "../layout/SvgIcon"
import JackpotContext from "../../contexts/JackpotContext"
import Web3Context from "../../contexts/Web3Context"
import { useContext, useEffect, useState } from "react"

const LobbyHeader = () => {
    
    const styles = {
        ctn: `
        flex flex-col
        md:text-xxxs
        lg:text-xxs
        xl:text-sm
        font-content
        `,
        titleCtn: `
        w-full grid grid-cols-2
            border-b border-lightBorder dark:border-darkBorder
            xl:p-2
            lg:p-2
            md:p-1
            `,
            playerInfoCtn: `
            grid grid-rows-2 gap-2
            p-2
            border-b
            border-lightBorder
            dark:border-darkBorder
            `,
            playerInfoBarCtn: `
            w-full h-full
            `,
            playerInfoBarBorder: `
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-md
            border
            border-lightBorder dark:border-darkBorder
            h-full
            `,
            playerInfoBarBorderInactive: `
            border-lightBgActive dark:border-darkBgActive animate-pulse
            h-full
            `,
            playerInfoBar:`
            h-full
            rounded-md
            bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-500 to-yellow-300
            shadow-sm
            `,
            playerInfoBarInactive: `
            rounded-md
            h-full
            bg-lightBgActive dark:bg-darkBgActive
            `,
            lineCtn: `
            flex
            p-1
            `,
            textTitle:`
            flex justify-start items-center gap-1
            fill-lightText
            dark:fill-darkText
            font-semibold
            lightText
            dark:text-darkText select-none
            2xl:p-1
            xl:p-1
            md:p-0
            `,
            textTitleInactive: `
            w-1/2 h-7
            animate-pulse
            rounded-md
            p-1
            `,
            textTitleIdInactive: `
            justify-self-end
            `,
            textLobbyId:`
            flex justify-end
            font-normal select-none
            p-1
            `,
            text: `
            font-normal select-none
            text-lightText
            dark:text-darkText
            `,
            textInactive: `
            rounded-md
            w-1/3 h-6
            animate-pulse
            `,
            inactiveBg: `
            bg-lightBgActive
            dark:bg-darkBgActive
            `,
        }
        
        const jackpotContext = useContext(JackpotContext)
        const web3 = useContext(Web3Context)
        const [active, setActive] = useState<boolean>(false)
        
        useEffect(() => {
            if(!web3.address || !jackpotContext.endTime || !jackpotContext.players) return
            setActive(true)
        }, [jackpotContext, web3])

    return (

        <div className={styles.ctn}>
            
            <div className={styles.titleCtn}>
                {active
                    ?
                        <span className={styles.textTitle}>
                            <SvgIcon style="w-6" viewBox="0 0 122.88 82.72" pathD="M85.96,9.48c4.5-0.31,9.34,0.41,12.33,2.16c3.41,1.99,5.42,5.48,5.42,11.01v4.84c0,2.17-0.08,2.23,0.71,3.37 c0.6,0.87,0.74,0.97,0.93,2.03c0.27,1.39,0.28,2.8,0.3,4.25c0.03,2.26-0.83,2.91-1.98,4.74l-4.89,7.79 c-1.52,2.43-2.9,3.91-2.3,6.99c1.34,6.83,20.91,10.68,26.38,13.11v12.94h-15.91c0-2.44,0.9-14.57-0.45-15.57 c-16.41-12.11-38.14-5.37-21.54-31.24c1.31-2.1,1.4-2.99,2.27-5.43C88.84,25.99,88.64,16.5,85.96,9.48L85.96,9.48L85.96,9.48z M36.92,9.48c-4.5-0.31-9.34,0.41-12.33,2.16c-3.41,1.99-5.42,5.48-5.42,11.01v4.84c0,2.17,0.08,2.23-0.71,3.37 c-0.6,0.87-0.73,0.97-0.93,2.03c-0.27,1.39-0.28,2.8-0.3,4.25c-0.03,2.26,0.83,2.91,1.98,4.74l4.89,7.79 c1.52,2.43,2.9,3.91,2.3,6.99C25.03,63.5,5.47,67.35,0,69.78v12.94h15.9c0-2.44-0.9-14.57,0.45-15.57 c16.41-12.11,38.14-5.37,21.54-31.24c-1.31-2.1-1.4-2.99-2.27-5.43C34.04,25.99,34.24,16.5,36.92,9.48L36.92,9.48L36.92,9.48z M20.05,82.72l0-12.89c6.17-2.74,30.31-8.8,31.82-16.51c0.68-3.47-0.89-5.15-2.6-7.89l-5.52-8.79c-1.29-2.07-2.27-2.8-2.23-5.35 c0.02-1.43,0.04-2.85,0.25-4.23c0.26-1.76,0.48-1.82,1.4-3.24c0.62-0.95,0.55-1.24,0.55-3.43v-5.46c0-6.31,2.32-10.25,6.24-12.49 c5.73-3.27,17.36-3.27,23.06,0.07c3.84,2.25,6.12,6.18,6.12,12.42v5.46c0,2.46-0.09,2.52,0.8,3.81c0.68,0.98,0.83,1.1,1.06,2.29 c0.3,1.56,0.32,3.17,0.34,4.8c0.04,2.55-0.93,3.29-2.23,5.35l-5.51,8.79c-1.71,2.74-3.28,4.42-2.59,7.89 c1.52,7.71,23.6,12.05,29.76,14.8v14.61L20.05,82.72L20.05,82.72L20.05,82.72z" />
                            <span>Round lobby</span>
                        </span>
                    :
                        <span className={styles.textTitleInactive + styles.inactiveBg}></span>
                }
                {active
                    ?
                        <span className={styles.textLobbyId}>
                            id: {jackpotContext.roundId?.toString()}
                        </span>
                    :
                        <span className={styles.textTitleInactive + styles.inactiveBg + styles.textTitleIdInactive}></span>
                }
            </div>

            <div className={styles.playerInfoCtn}>
                {active
                    ?
                        <span className={styles.lineCtn + styles.text}>Players: {jackpotContext.players!.length} / {jackpotContext.maxPlayers!}</span>
                    :
                        <span className={styles.lineCtn + styles.textInactive + styles.inactiveBg}></span>
                }
                <div className={styles.playerInfoBarCtn}>
                    {active
                    ?
                        <div className={styles.playerInfoBarBorder}>
                            <div style={{width: `${((jackpotContext.players!.length / jackpotContext.maxPlayers!) * 100)}%`}} className={styles.playerInfoBar}></div>
                        </div>
                    :
                        <div className={styles.playerInfoBarBorderInactive}>
                            <div className={styles.playerInfoBarInactive}></div>
                        </div>
                    }
                </div>
            </div>
        
        </div>
    )
}

export default LobbyHeader