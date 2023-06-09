import WrapperProps from "../../proptypes/WrapperProps"

const MainContentCtn = (props:WrapperProps) => {

    const mainCtnStyles = {
        ctn: `
            grid justify-center content-center
            grid grid-flow-col grid-cols-[1fr,2fr] grid-rows-[3.75fr,2.25fr]
            w-full h-full p-6 gap-2
        `,
    }

    return (
        <div className={mainCtnStyles.ctn} id="main_container" >
            {props.children}
        </div>
    )
}

export default MainContentCtn