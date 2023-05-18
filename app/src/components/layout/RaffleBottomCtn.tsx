import WrapperProps from "../../proptypes/WrapperProps"


const RaffleBottomCtn = (props:WrapperProps) => {

    const raffleInfoStlyes = {
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
        <div className={raffleInfoStlyes.ctn}>
            {props.children}
        </div>
    )

}

export default RaffleBottomCtn