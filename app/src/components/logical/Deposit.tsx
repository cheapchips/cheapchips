import logo from "../../assets/logo.png"
import DepositProps from "../../proptypes/DepositProps"

const Deposit = (props:DepositProps) => {
    
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
        depositTitleInactive: `
            w-1/3
            2xl:h-7
            xl:h-6
            lg:h-5
            md:h-4
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-md
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
        chipsImgGreyedOut: `
            opacity-[20%]
            contrast-0
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
        inactiveInput: `
            w-full
            2xl:h-10
            xl:h-8
            lg:h-6
            md:h-5
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-md
        `,
        depositBtnCtn: `
            flex justify-center items-center h-full
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
        `,
    }

    const chipsPercentages = [20, 40, 60, 80, 100]
    const DepositChips = chipsPercentages.map((percentage, index) =>
        <div key={index} onClick={() => props.handleDepositPercentageChange(percentage)}
            className={(props.depositAmount >= ((percentage / 100) * props.maxDepositAmount))
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
        <div className={depositStyles.ctn}>
            
            <div className={depositStyles.depositTitleCtn}>
                {props.active ? <span className={depositStyles.depositTitleText}>Deposit</span> : <span className={depositStyles.depositTitleText + depositStyles.depositTitleInactive}></span>}
            </div>

            <div className={depositStyles.chipsSelectorCtn}>
                {props.active
                    ?
                    <div className={depositStyles.chipsSelectorContentCtn}>
                        {DepositChips}
                    </div>
                    :
                    <div className={depositStyles.chipsSelectorContentCtn + depositStyles.chipsSelectorContentInactive}></div>
                }
            </div>

            <div className={depositStyles.inputCtn}>
                {props.active
                    ?
                        <input value={props.depositAmount} onChange={(e) => {
                                props.handleDepositInputChange(+e.target.value)
                            }} type="number" className={depositStyles.input}>
                        </input>
                    :
                        <div className={depositStyles.inactiveInput}></div>
                }
            </div>

            <div className={depositStyles.depositBtnCtn}>
                {props.active
                    ?
                        <button onClick={() => props.handleDepositTx()} className={depositStyles.depositBtn}>
                            DEPOSIT
                        </button>
                    :
                        <div className={depositStyles.depositBtnInactive}></div>
                }
            </div>

        </div>
    )


}


export default Deposit