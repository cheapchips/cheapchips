import WrapperProps from "../../proptypes/WrapperProps"


const RaffleDepositCtn = (props:WrapperProps) => {

    const raffleDepositStyles = {
        ctn: `
        w-full h-full
        flex justify-center items-center
        rounded-md border
        border-lightBorder
        dark:border-darkBorder
        text-lightText
        dark:text-darkText
        p-2
        `,
    }

    return (
        <div className={raffleDepositStyles.ctn}>
            {props.children}
        </div>
    )

}

export default RaffleDepositCtn