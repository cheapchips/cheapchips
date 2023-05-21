import WrapperProps from "../../proptypes/WrapperProps"


const JackpotBottomCtn = (props:WrapperProps) => {

    const jackpotInfoStlyes = {
        ctn: `
            w-full h-full
            rounded-md border
            border-lightBorder
            dark:border-darkBorder
            text-lightText
            dark:text-darkText
        `
    }

    return (
        <div className={jackpotInfoStlyes.ctn}>
            {props.children}
        </div>
    )

}

export default JackpotBottomCtn