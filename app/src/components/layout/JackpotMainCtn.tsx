import WrapperProps from "../../proptypes/WrapperProps"

const JackpotMainCtn = (props:WrapperProps) => {

    const jackpotCtnStyles = {
        ctn: `
            w-full h-full
            flex justify-center items-center col-span-full
            rounded-md border border-lightBorder dark:border-darkBorder
            text-lightText dark:text-darkText
            p-2
        `,
    }

    return (
        <div className={jackpotCtnStyles.ctn} id="jackpot_container">
            {props.children}
        </div>
    )


}

export default JackpotMainCtn