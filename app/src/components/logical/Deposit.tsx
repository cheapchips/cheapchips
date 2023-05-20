import logo from "../../assets/logo.png"
import { useState, useEffect, } from "react"
import DepositProps from "../../proptypes/DepositProps"

const Deposit = (props:DepositProps) => {
    
    // const [insideDepositAmount, setInsideDepositAmount] = useState<string>(props.depositAmount.toString())
    const PERCENTAGE_TICK = 20
    const [depositPercentage, setDepositPercentage] = useState(props.defaultDepositAmount * PERCENTAGE_TICK)

    const depositStyles = {
        ctn: `
            grid grid-flow-row
            text-lightText
            dark:text-darkText
            md:text-xxxs
            lg:text-xxs
            xl:text-sm
            divide-y
            divide-lightBorder
            dark:divide-darkBorder
        `,
        depositTitleCtn: `
            flex justify-start items-center
            xl:p-2
            lg:p-2
            md:p-1
            font-semibold
        `,
        depositTitleText: `
            2xl:p-1
            xl:p-1
            md:p-0
        `,
        chipsSelectorCtn: `
            xl:p-2
            lg:p-1.5
            md:p-1
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
        `,
        chipsImgBottomIndicator: `
            pt-1
            2xl:w-3 2xl:h-1
            lg:w-2 lg:h-1
            md:w-1 md:h-[1%]
            rounded-md
            bg-accentColor
        `,
        inputCtn: `
            w-full h-full
            xl:p-2
            md:p-1
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
        depositBtnCtn: `
            flex justify-center items-center h-full
            lg:p-2
            md:p-1
        `,
        depositBtn: `
            w-full
            flex justify-center items-center
            bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-600 to-yellow-300
            font-bold
            border rounded-md
            border-lightBorder
            dark:border-darkBorder
            2xl:h-12
            xl:h-8
            lg:h-6
            md:h-[120%]
        `,
    }

    function handleDepositInputChange(value:number):void {
        console.log('deposit: ', value)
        if(value > props.maxDepositAmount || value < props.minDepositAmount) return
        if(Number.isNaN(value)) return
        props.handleInputDepositValueChange(value)
    }

    function handleDepositImageChange(percentage:number):void {
        setDepositPercentage(percentage)
    }

    const chipsPercentages = [20, 40, 60, 80, 100]
    const DepositChips = chipsPercentages.map((percentage, index) => 
        <div key={index} onClick={() => {
                handleDepositImageChange(percentage)
            }} className={depositStyles.chipsImgAndIndicatorCtn}>
                <img draggable={false} src={logo} alt="ChipsToken" className={depositStyles.chipsImg} />
                <span className={depositStyles.chipsImgBottomIndicator}></span>
        </div>
    )

    return (
        <div className={depositStyles.ctn}>
            
            <div className={depositStyles.depositTitleCtn}>
                <span className={depositStyles.depositTitleText}>Deposit</span>
            </div>

            <div className={depositStyles.chipsSelectorCtn}>
                <div className={depositStyles.chipsSelectorContentCtn}>
                    {DepositChips}
                </div>
            </div>

            <div className={depositStyles.inputCtn}>
                <input defaultValue={props.defaultDepositAmount} value={props.depositAmount} onChange={(e) => {
                    handleDepositInputChange(+e.target.value)
                }} type="number" className={depositStyles.input}></input>
            </div>

            <div className={depositStyles.depositBtnCtn}>
                <button className={depositStyles.depositBtn}>
                    DEPOSIT
                </button>
                <span>{depositPercentage}</span>
            </div>

        </div>
    )


}


export default Deposit