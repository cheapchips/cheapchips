import logo from "../../assets/logo.png"
import DepositProps from "../../proptypes/DepositProps"

const Deposit = () => {
    
    const depositStyles = {
        ctn: `
            grid grid-flow-row grid-rows-[1fr,1fr,1fr,1fr]
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
        `,
        chipsSelectorCtn: `
            p-2
        `,
        chipsSelectorContentCtn: `
            grid grid-flow-col
            justify-center items-center
            content-start
            rounded-md
            bg-lightBgActive
            dark:bg-darkBgActive
        `,
        chipsImg: `
            xl:w-6 xl:h-6
            object-contain
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
            font-bold
            border rounded-md
            border-lightBorder
            dark:border-darkBorder
        `,
    }

    return (
        <div className={depositStyles.ctn}>
            
            <div className={depositStyles.depositTitleCtn}>
                <span>Deposit</span>
            </div>

            <div className={depositStyles.chipsSelectorCtn}>
                <div className={depositStyles.chipsSelectorContentCtn}>
                    <img src={logo} alt="ChipsToken" className={depositStyles.chipsImg} />
                    {/* <span className={depositStyles.chipsImgBottomIndicator}></span> */}
                    <img src={logo} alt="ChipsToken" className={depositStyles.chipsImg} />
                    {/* <span className={depositStyles.chipsImgBottomIndicator}></span> */}
                    <img src={logo} alt="ChipsToken" className={depositStyles.chipsImg} />
                    {/* <span className={depositStyles.chipsImgBottomIndicator}></span> */}
                    <img src={logo} alt="ChipsToken" className={depositStyles.chipsImg} />
                    {/* <span className={depositStyles.chipsImgBottomIndicator}></span> */}
                    <img src={logo} alt="ChipsToken" className={depositStyles.chipsImg} />
                    {/* <span className={depositStyles.chipsImgBottomIndicator}></span> */}
                </div>
            </div>

            <div className={depositStyles.inputCtn}>
                Input
            </div>

            <div className={depositStyles.depositBtnCtn}>
                Deposit button
            </div>



        </div>
    )


}


export default Deposit