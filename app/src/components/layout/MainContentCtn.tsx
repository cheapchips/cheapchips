import WrapperProps from "../../proptypes/WrapperProps"

const MainContentCtn = (props:WrapperProps) => {

    const raffleCtnStyles = {
        ctn: `
            grid justify-center content-center
            grid grid-flow-col grid-cols-[1fr,2fr] grid-rows-[4fr,2fr]
            w-4/5 h-full p-6 gap-2
        `,
    }

    return (
        <div className={raffleCtnStyles.ctn}>
            {props.children}
        </div>
    )
}

export default MainContentCtn