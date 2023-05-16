import WrapperProps from "../../proptypes/WrapperProps"


const RaffleInfoCtn = (props:WrapperProps) => {

    const raffleInfoStlyes = {
        ctn: `
        w-full h-full
        flex justify-center items-center
        rounded-md border
        border-lightBorder
        dark:border-darkBorder
        text-lightText
        dark:text-darkText
        p-2
        `
    }

    return (
        <div className={raffleInfoStlyes.ctn}>
            {props.children}
        </div>
    )

}

export default RaffleInfoCtn