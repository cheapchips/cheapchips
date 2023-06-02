import logo from "../../assets/logo.png"
import SvgIcon from "../layout/SvgIcon"
import useJackpot from "../../hooks/useJackpot"
import { useState, useContext, useEffect } from "react"
import Web3Context from "../../contexts/Web3Context"
import JackpotContext from "../../contexts/JackpotContext"
import TransactionModal from "./modals/TransactionModal"

const Deposit = () => {
    
    const depositStyles = {
        ctn: `
            grid grid-flow-row
            text-lightText
            dark:text-darkText
            md:text-xxxs
            lg:text-xxs
            xl:text-sm
            font-content
        `,
        depositTitleCtn: `
            flex justify-start items-center
            xl:p-2
            lg:p-2
            md:p-1
            font-semibold
            border-b border:lightBorder dark:border-darkBorder
        `,
        depositTitleText: `
            flex flex-row gap-1 items-center
            fill-lightText
            dark:fill-darkText
            2xl:p-1
            xl:p-1
            md:p-0
        `,
        depositTitleInactive: `
            w-1/3
            2xl:h-7
            xl:h-6
            lg:h-5
            md:h-4
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-md
            animate-pulse
        `,
        chipsSelectorCtn: `
            xl:p-2
            lg:p-1.5
            md:p-1
            border-b border:lightBorder dark:border-darkBorder
        `,
        chipsSelectorContentCtn: `
            grid grid-flow-col
            justify-center items-center
            content-start
            rounded-md
            bg-lightBgActive
            dark:bg-darkBgActive
            border
            border-lightBorder
            dark:border-darkBorder
            select-none
        `,
        chipsSelectorContentInactive: `
            w-full
            2xl:h-14
            xl:h-8
            lg:h-6
            md:h-2
            border-none
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-md
            animate-pulse
        `,
        chipsImgAndIndicatorCtn: `
            grid grid-flow-row
            justify-items-center
            cursor-pointer
        `,
        chipsImg: `
            2xl:w-12 2xl:h-12
            xl:w-7 xl:h-7
            lg:w-6 lg:h-6
            md:w-4 md:h-3.5
            object-contain
            -rotate-6
            transition ease-in-out
            hover:scale-90
        `,
        chipsImgGreyedOut: `
            opacity-[23%]
            contrast-20
        `,
        chipsImgBottomIndicator: `
            pt-1
            2xl:w-2 2xl:h-1
            lg:w-1 lg:h-1
            md:w-1 md:h-[1%]
            rounded-md
            bg-accentColor
        `,
        inputCtn: `
            xl:p-2
            md:p-1
            border-b border:lightBorder dark:border-darkBorder
        `,
        input: `
            w-full h-full
            bg-lightBgActive
            dark:bg-darkBgActive
            border rounded-md
            border-lightBorder
            dark:border-darkBorder
            px-2
            2xl:h-10
            xl:h-8
            lg:h-6
            md:h-3
        `,
        inactiveInput: `
            w-full
            2xl:h-10
            xl:h-8
            lg:h-6
            md:h-5
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-md
            animate-pulse
        `,
        depositBtnCtn: `
            flex justify-center items-center h-full
            border-b border:lightBorder dark:border-darkBorder
            lg:p-2
            md:p-1
        `,
        depositBtn: `
            w-full
            flex justify-center items-center
            text-darkText
            bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-600 to-yellow-300
            font-bold
            border rounded-md
            border-lightBorder
            dark:border-darkBorder
            2xl:h-12
            xl:h-8
            lg:h-6
            md:h-[120%]
            active:opacity-80
        `,
        depositBtnInactive: `
            w-full
            2xl:h-12
            xl:h-8
            lg:h-6
            md:h-4
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-md
            animate-pulse
        `,
    }
    
    const web3 = useContext(Web3Context)
    const jackpotContext = useContext(JackpotContext)
    const [writeJackpot] = useJackpot()
    
    const [depositAmount, setDepositAmount] = useState<number>(jackpotContext.defaultChipsDeposit!)
    const [active, setActive] = useState<boolean>(false)
    const [txVisible, setTxVisible] = useState<boolean>(false)

    useEffect(() => {
        if(!web3.address || !jackpotContext.maxChipsDeposit || !jackpotContext.endTime) return
        setActive(true)
    }, [web3.address, jackpotContext])
    
    const handleDepositTx = (): void => {
        if(depositAmount > jackpotContext.maxChipsDeposit! || depositAmount < jackpotContext.minChipsDeposit! || depositAmount === 0) return
        setTxVisible(true)
        writeJackpot.deposit(depositAmount)
    }

    const handleDepositInput = (value: number): void => {
        if(value > jackpotContext.maxChipsDeposit! || value < jackpotContext.minChipsDeposit!) return
        if(Number.isNaN(value)) return
        setDepositAmount(value)
    }

    const handleDepositPercentage = (percentageValue:number): void => {
        if(percentageValue > 100 || percentageValue < 1) return
        const percVal = (percentageValue / 100) * jackpotContext.maxChipsDeposit!
        console.log(percVal)
        setDepositAmount(percVal)
    }

    const chipsPercentages = [20, 40, 60, 80, 100]
    const DepositChips = chipsPercentages.map((percentage, index) =>
        <div key={index} onClick={() => handleDepositPercentage(percentage)}
        className={(depositAmount >= ((percentage / 100) * jackpotContext.maxChipsDeposit!))
        ? 
        depositStyles.chipsImgAndIndicatorCtn
        :
        depositStyles.chipsImgAndIndicatorCtn + depositStyles.chipsImgGreyedOut
    }>
            <img draggable={false} src={logo} alt="ChipsToken" className={depositStyles.chipsImg} />
            <span className={depositStyles.chipsImgBottomIndicator}></span>
        </div>
    )
    
    return (
        <>
        {txVisible && 
            <div className="absolute top-0 left-0 w-screen h-screen">
                <TransactionModal txTitle="Deposit Chips" onClickClose={() => {setTxVisible(false)}}/>
            </div>
        }
        <div className={depositStyles.ctn}>
            <div className={depositStyles.depositTitleCtn}>
                {active
                    ?
                    <span className={depositStyles.depositTitleText}>
                            <SvgIcon style="w-5 h-4" viewBox="0 0 122.88 90.82" pathD="M121.57,40.15c0.85,1.42,1.31,2.94,1.31,4.51c0,8.34-12.9,15.1-28.8,15.1c-15.9,0-28.8-6.76-28.8-15.1 c0-1.57,0.46-3.09,1.31-4.51c3.66,6.13,14.58,10.59,27.49,10.59C106.99,50.74,117.91,46.29,121.57,40.15L121.57,40.15z M56.29,62.64c0.85,1.43,1.31,2.94,1.31,4.51c0,8.34-12.9,15.1-28.8,15.1C12.9,82.25,0,75.49,0,67.15c0-1.57,0.46-3.09,1.31-4.51 c3.66,6.13,14.59,10.59,27.49,10.59C41.71,73.23,52.63,68.78,56.29,62.64L56.29,62.64z M32.98,40.56l-0.06-3.74 c0.85-0.03,1.54-0.29,2.07-0.77c0.54-0.48,0.83-1.06,0.89-1.74c0.07-0.78-0.19-1.46-0.77-2.06c-0.58-0.59-1.52-0.95-2.79-1.06 c-1.19-0.1-2.11,0.09-2.75,0.57c-0.64,0.48-1,1.15-1.07,2.01c-0.09,1.07,0.3,2.07,1.17,3l-0.7,2.98l-9.94-2.79l0.85-9.84l3.48,0.3 l-0.61,7.02l3.25,0.87c-0.34-0.87-0.48-1.73-0.4-2.6c0.14-1.65,0.87-3,2.16-4.04c1.3-1.04,2.91-1.48,4.83-1.31 c1.6,0.14,2.98,0.72,4.15,1.76c1.6,1.41,2.31,3.24,2.11,5.48c-0.16,1.79-0.76,3.21-1.82,4.26C35.98,39.92,34.63,40.49,32.98,40.56 L32.98,40.56z M28.8,25.56c13.07,0,23.67,4.16,23.67,9.28c0,5.13-10.6,9.28-23.67,9.28S5.13,39.98,5.13,34.85 C5.13,29.72,15.73,25.56,28.8,25.56L28.8,25.56L28.8,25.56z M28.8,22.49c15.9,0,28.8,6.76,28.8,15.1c0,8.34-12.9,15.1-28.8,15.1 C12.9,52.68,0,45.92,0,37.59C0,29.25,12.9,22.49,28.8,22.49L28.8,22.49z M56.39,47.65c0.78,1.37,1.21,2.83,1.21,4.33 c0,8.34-12.9,15.1-28.8,15.1C12.9,67.08,0,60.32,0,51.99c0-1.51,0.42-2.96,1.21-4.33c3.56,6.22,14.56,10.76,27.59,10.76 C41.83,58.41,52.84,53.88,56.39,47.65L56.39,47.65L56.39,47.65z M104.48,8.95l-0.33,3.75l-14.14-1.23 c1.17,1.48,1.97,3.18,2.42,5.09l-3.4-0.3c-0.23-1-0.75-2.12-1.54-3.34c-0.8-1.23-1.77-2.1-2.93-2.63l0.27-3.04L104.48,8.95 L104.48,8.95L104.48,8.95z M94.08,3.08c13.07,0,23.67,4.16,23.67,9.28c0,5.13-10.6,9.28-23.67,9.28c-13.07,0-23.67-4.16-23.67-9.28 C70.41,7.23,81.01,3.08,94.08,3.08L94.08,3.08z M94.08,0c15.9,0,28.8,6.76,28.8,15.1c0,8.34-12.9,15.1-28.8,15.1 c-15.9,0-28.8-6.76-28.8-15.1C65.28,6.76,78.18,0,94.08,0L94.08,0z M121.67,25.16c0.78,1.37,1.21,2.83,1.21,4.33 c0,8.34-12.9,15.1-28.8,15.1c-15.9,0-28.8-6.76-28.8-15.1c0-1.51,0.42-2.96,1.21-4.33c3.55,6.22,14.56,10.76,27.59,10.76 C107.11,35.93,118.12,31.39,121.67,25.16L121.67,25.16L121.67,25.16z M121.39,70.92c0.96,1.51,1.49,3.12,1.49,4.8 c0,8.34-12.9,15.1-28.8,15.1c-15.9,0-28.8-6.76-28.8-15.1c0-1.68,0.52-3.29,1.49-4.8c3.83,5.98,14.61,10.3,27.31,10.3 C106.78,81.22,117.57,76.91,121.39,70.92L121.39,70.92z M121.53,55.39c0.88,1.45,1.35,2.98,1.35,4.58c0,8.34-12.9,15.1-28.8,15.1 c-15.9,0-28.8-6.76-28.8-15.1c0-1.6,0.48-3.14,1.35-4.58c3.7,6.1,14.59,10.51,27.45,10.51S117.82,61.49,121.53,55.39L121.53,55.39 L121.53,55.39z" />
                            <span>Deposit</span>
                        </span>
                    :
                    <span className={depositStyles.depositTitleText + depositStyles.depositTitleInactive}></span>
                }
            </div>

            <div className={depositStyles.chipsSelectorCtn}>
                {active
                    ?
                    <div className={depositStyles.chipsSelectorContentCtn}>
                        {DepositChips}
                    </div>
                    :
                    <div className={depositStyles.chipsSelectorContentCtn + depositStyles.chipsSelectorContentInactive}></div>
                }
            </div>

            <div className={depositStyles.inputCtn}>
                {active
                    ?
                    // <input value={depositAmount} onKeyDown={(e) => {
                        //         if(+e.key === 190 || +e.key === 48) return
                        //         handleDepositInput(+e.key)
                        //     }} type="number" className={depositStyles.input}>
                        // </input>
                        <span>Fix inputttt</span>
                        :
                        <div className={depositStyles.inactiveInput}></div>
                    }
            </div>

            <div className={depositStyles.depositBtnCtn}>
                {active
                    ?
                    <button onClick={() => handleDepositTx()} className={depositStyles.depositBtn}>
                            DEPOSIT
                        </button>
                    :
                    <div className={depositStyles.depositBtnInactive}></div>
                }
            </div>
         
        </div>
        </>
    )
}

export default Deposit