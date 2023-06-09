import Blockies from "react-blockies"
import SvgIcon from "../layout/SvgIcon"
import chipsLogo from "../../assets/logo.png"
import chainlinkLogo from "../../assets/chainlink_logo.png"
import { useContext } from "react"
import Web3Context from "../../contexts/Web3Context"
import { useState, useEffect } from "react"
import useJackpot from "../../hooks/useJackpot"
import useChipStable from "../../hooks/useChipStable"

const ProfileHeader = (props:{onClickBuyBalance:() => void, onClickMyDetails:() => void}) => {

    const web3 = useContext(Web3Context)
    const [active, setActive] = useState<boolean>(false)
    const [feeBalance, setFeeBalance] = useState<number>()
    const [chipStableBalance, setChipStableBalance] = useState<number>()
    const [,readJackpot] = useJackpot()
    const [,readChipStable] = useChipStable()
    
    useEffect(() => {
        if(!web3.address || !web3.jackpot || !web3.chipStable || !web3.linkToken) return
        if(!active){
            setActive(true)
        }
        // console.log("new chips or fees!")
        getFeesBalance()
        getChipsStableBalance()
    }, [web3.chipStableBalance, web3.linkTokenBalance])

    async function getFeesBalance() {
        const feesBalance = await readJackpot.checkFeesBalance()
        // console.log(Number(feesBalance))
        setFeeBalance(Number(feesBalance))
    }

    async function getChipsStableBalance(){
        const chipStableBalance = await readChipStable.getBalance()
        // console.log(chipStableBalance.toNumber())
        setChipStableBalance(chipStableBalance.toNumber())
    }

    const profileStyles = {
        ctn: `
            grid grid-flow-row grid-rows-[auto,fit,auto]
            text-lightText dark:text-darkText
            xl:text-sm lg:text-xxs md:text-xxxs
            border-b border-lightBorder dark:border-darkBorder
            font-content
        `,
        profileTitleCtn: `
            flex justify-start content-center h-fit
            border-b border-lightBorder dark:border-darkBorder
            font-semibold
            xl:p-2 lg:p-2 md:p-1
        `,
        profileTitleContent: `
            flex flex-row gap-1 justify-center items-center
            fill-lightText dark:fill-darkText
            2xl:p-1 xl:p-1 md:p-0
            select-none
        `,
        profileTitleContentInactive: `
            w-1/4 lg:h-7 md:h-5
            rounded-md
            animate-pulse
        `,
        profileMainContentCtn: `
            grid grid-flow-col grid-cols-3 h-fit
            gap-1 p-2
            xl:text-sm lg:text-xxs md:text-xxxs
        `,
        profileIconCtn: `
            flex justify-center items-center content-center
            bg-lightBgActive dark:bg-darkBgActive
            border border-lightBorder dark:border-darkBorder
            aspect-square rounded-full overflow-hidden
        `,
        profileIconCtnInactive: `
            animate-pulse border-none
        `,
        profileIcon: `
            rounded-full
            transition hover:scale-75 hover:cursor-pointer hover:animate-pulse
            p-2
        `,
        profileBalancesCtn: `
            grid grid-flow-row grid-rows-2 col-span-2
            p-1
        `,
        profileBalancesContent: `
            grid grid-flow-col grid-cols-2
            font-semibold
            border-b border-lightBorder dark:border-darkBorder
            2xl:text-sm xl:text-xs lg:text-xxs md:text-xxxxs
            p-1
        `,
        profileBalanceRowContent: `
            flex gap-1
            justify-end items-center
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
            grid grid-flow-row grid-rows-2 items-center
            border-t border-lightBorder dark:border-darkBorder
            gap-1 lg:p-2 md:p-1
        `,
        profileSecondaryContent: `
            px-1 break-normal truncate
        `,
        profileSecondaryContentInactive: `
            w-full h-5 rounded-md animate-pulse
        `,
        profileSecondaryContentTitle: `
            select-none
        `,
        profileSecondaryContentValue: `
            font-thin lg:text-xxs md:text-xxxs
        `,
        profileSecondaryContentDetailsBtnCtn: `
            grid grid-flow-col
            gap-2
        `,
        profileSecondaryContentDetailsBtnCtnInactive: `
            w-4/5 place-self-center
            lg:h-6 md:h-2 
            rounded-md
            animate-pulse
        `,
        profileSecondaryContentDetailsBtn: `
            lg:px-3 py-1 md:px-2 mx-1
            bg-lightBgActive dark:bg-darkBgActive
            2xl:text-xs xl:text-xxxs lg:text-xxxs md:text-xxxxs
            xl:overflow-hidden xl:whitespace-nowrap
            hover:text-black dark:hover:text-accentColor
            transition ease-in-out hover:scale-110
            font-semibold rounded-md
        `,
        profileMyDetailsBtn: `
            border border-lightBorder dark:border-darkBorder
        `,
        profileBuyBalanceBtn: `
            border
            ${!chipStableBalance || !feeBalance || chipStableBalance === 0 || feeBalance === 0 ? "border-accentColor dark:border-accentColor" : "border-lightBorder dark:border-darkBorder"}
        `,
        inactiveBg: `
            bg-lightBgActive
            dark:bg-darkBgActive
        `,
        chipsLogo: `
            xl:w-4 xl:h-4 md:w-2 md:h-2 -rotate-6 select-none
        `,
        chainlinkLogo: `
            xl:w-4 xl:h-4 md:w-2 md:h-2 select-none
        `,
        inactiveBalanceText: `
            w-5/6 h-5/6 rounded-md bg-lightBgActive dark:bg-darkBgActive
            animate-pulse
        `,
    }

    return (
        <div className={profileStyles.ctn}>

            {/* Title */}
            <div className={profileStyles.profileTitleCtn}>
                {active
                ?
                    <span className={profileStyles.profileTitleContent}>
                        <SvgIcon style="w-4 h-4" viewBox="0 0 122.88 121.42" pathD="M0,121.42l0-19.63c10.5-4.67,42.65-13.56,44.16-26.41c0.34-2.9-6.5-13.96-8.07-19.26 c-3.36-5.35-4.56-13.85-0.89-19.5c1.46-2.25,0.84-10.44,0.84-13.53c0-30.77,53.92-30.78,53.92,0c0,3.89-0.9,11.04,1.22,14.1 c3.54,5.12,1.71,14.19-1.27,18.93c-1.91,5.57-9.18,16.11-8.56,19.26c2.31,11.74,32.13,19.63,41.52,23.8l0,22.23L0,121.42L0,121.42z" />
                        <span>My profile</span>
                    </span>
                :
                    <span className={profileStyles.profileTitleContentInactive + profileStyles.inactiveBg}></span>
                }
            </div>
            
            <div className={profileStyles.profileMainContentCtn}>
                
                {/* Profile icon */}
                {active
                ?
                <div className={profileStyles.profileIconCtn}>
                    {active ? <Blockies seed={web3.address!} className={profileStyles.profileIcon} size={24}/> : <></>}
                </div>
                :
                <div className={profileStyles.profileIconCtn + profileStyles.profileIconCtnInactive}></div>
                }
                
                {/* Balance list */}
                <div className={profileStyles.profileBalancesCtn}>
                    
                    {active
                        ?
                            <>
                                <div className={profileStyles.profileBalancesContent}>
                                    <div className={profileStyles.profileBalanceRowContent}>
                                        <span className="select-none">Token balance:</span>
                                    </div>
                                    <div className={profileStyles.profileBalanceRowContent}>
                                        <span className={profileStyles.profileBalancesValue + profileStyles.chipsBalanceValue}>{chipStableBalance ? chipStableBalance?.toString().substring(0,5) : "0"}</span>
                                        <img className={profileStyles.chipsLogo} src={chipsLogo} draggable={false} alt="CheapChips mini logo" ></img>
                                    </div>
                                </div>
                                <div className={profileStyles.profileBalancesContent}>
                                    <div className={profileStyles.profileBalanceRowContent}>
                                        <span className="select-none">Link balance:</span>
                                    </div>
                                    <div className={profileStyles.profileBalanceRowContent}>
                                        <span className={profileStyles.profileBalancesValue + profileStyles.linkBalanceValue}>{feeBalance ? feeBalance?.toString().substring(0, 4) : "0"}</span>
                                        <img className={profileStyles.chainlinkLogo} src={chainlinkLogo} draggable={false} alt="Chainlink mini logo" />
                                    </div>
                                </div>
                            </>
                        :
                            <>
                                <div className={profileStyles.profileBalancesContent}>
                                    <span className={profileStyles.inactiveBalanceText}></span>
                                    <span className={profileStyles.inactiveBalanceText}></span>
                                </div>
                                <div className={profileStyles.profileBalancesContent}>
                                    <span className={profileStyles.inactiveBalanceText}></span>
                                    <span className={profileStyles.inactiveBalanceText}></span>
                                </div>
                            </>
                    }
                </div>
            
            </div>

            {/* Address, details button */}
            <div className={profileStyles.profileSecondaryContentCtn}>
                
                {active
                    ?
                    <>
                        <div className={profileStyles.profileSecondaryContent}>
                            <span className={profileStyles.profileSecondaryContentTitle}>Address: </span>
                            <span className={profileStyles.profileSecondaryContentValue}>{web3.address!}</span>
                        </div>
                        <div className={profileStyles.profileSecondaryContentDetailsBtnCtn}>
                            <button onClick={() => props.onClickMyDetails()} className={profileStyles.profileSecondaryContentDetailsBtn + profileStyles.profileMyDetailsBtn}>My details</button>
                            <button onClick={() => props.onClickBuyBalance()} className={profileStyles.profileSecondaryContentDetailsBtn + profileStyles.profileBuyBalanceBtn}>Buy Balance</button>
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