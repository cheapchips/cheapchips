import WrapperProps from "../../proptypes/WrapperProps"

const RaffleMainCtn = (props:WrapperProps) => {

    const raffleCtnStyles = {
        ctn: `
            w-full h-full
            flex justify-center items-center
            col-span-full
            rounded-md border
            border-lightBorder
            dark:border-darkBorder
            text-lightText
            dark:text-darkText
            p-2
        `,
    }

    return (
        <div className={raffleCtnStyles.ctn}>
            {props.children}
        </div>
    )


}

export default RaffleMainCtn