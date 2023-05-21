import WrapperProps from "../../proptypes/WrapperProps"

const MainContentCtn = (props:WrapperProps) => {

    const mainCtnStyles = {
        ctn: `
            grid justify-center content-center
            grid grid-flow-col grid-cols-[1fr,2fr] grid-rows-[3.75fr,2.25fr]
            w-4/5 h-full p-6 gap-2
        `,
    }

    return (
        <div className={mainCtnStyles.ctn}>
            {props.children}
        </div>
    )
}

export default MainContentCtn