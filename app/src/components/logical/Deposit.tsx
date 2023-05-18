import logo from "../../assets/logo.png"
import DepositProps from "../../proptypes/DepositProps"

const Deposit = () => {
    
    const depositStyles = {
        ctn: `
        grid grid-flow-row grid-rows-[0.3fr,auto,0.5fr,1fr]
        h-full
        gap-2
        text-lightText
        dark:text-darkText
        text-sm
        divide-y
        divide-lightBorder
        dark:divide-darkBorder
        `,
        depositTitleCtn: `
            flex justify-start items-center
            px-2
        `,
        chipsGridCtn: `
            grid grid-flow-col
            gap-4
            content-start
            mt-2 mx-2
            justify-center items-center
            rounded-md
            bg-lightBgActive
            dark:bg-darkBgActive
            border
            border-lightBorder
            dark:border-darkBorder
        `,
        chipCtn: `
            flex flex-col
        `,
        chipsImg: `
            mt-2
            w-10 h-10
            -rotate-6
        `,
        chipsImgBottomIndicator: `
            self-center
            w-2 h-1
            rounded-md
            bg-accentColor
            px-1 mt-2
        `,
        inputCtn: `
            pt-2 px-2
        `,
        input: `
            w-full h-full
            bg-lightBgActive
            dark:bg-darkBgActive
            border rounded-md
            border-lightBorder
            dark:border-darkBorder
            px-2
        `,
        depositBtnCtn: `
            flex justify-center items-center
            p-2
        `,
        depositBtn: `
            w-full h-full
            flex justify-center items-center
            bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-600 to-yellow-300
            text-xl
            font-bold
            border rounded-md
            border-lightBorder
            dark:border-darkBorder
        `,
    }

    return (
        <div className={depositStyles.ctn}>
            
            {/* <div className={depositStyles.depositTitleCtn}>
                <span>d</span>
            </div>

            <div className={depositStyles.chipsGridCtn}>
                <div className={depositStyles.chipCtn}>
                    <img src={logo} alt="ChipsToken" className={depositStyles.chipsImg} />
                    <span className={depositStyles.chipsImgBottomIndicator}></span>
                </div>
                <img src={logo} alt="ChipsToken" className={depositStyles.chipsImg} />
                <img src={logo} alt="ChipsToken" className={depositStyles.chipsImg} />
                <img src={logo} alt="ChipsToken" className={depositStyles.chipsImg + "opacity-10"} />
                <img src={logo} alt="ChipsToken" className={depositStyles.chipsImg + "opacity-10"} />
            </div>

            <div className={depositStyles.inputCtn}>
                <input
                    type="number"
                    className={depositStyles.input}
                    placeholder="Custom amount"
                />
            </div>

            <div className={depositStyles.depositBtnCtn}>
                <div className={depositStyles.depositBtn}>
                    DEPOSIT 3 TOKENS
                </div>
            </div> */}

        </div>
    )


}


export default Deposit