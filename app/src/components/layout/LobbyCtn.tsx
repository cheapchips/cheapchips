import WrapperProps from "../../proptypes/WrapperProps"

const LobbyCtn = (props:WrapperProps) => {

    const lobbyCtnStyles = {
        ctn: `
            w-full h-full
            flex justify-center items-center content-center
            text-lightText
            dark:text-darkText
            p-2
        `,
    }

    return (
        <div className={lobbyCtnStyles.ctn}>
            {props.children}
        </div>
    )


}

export default LobbyCtn