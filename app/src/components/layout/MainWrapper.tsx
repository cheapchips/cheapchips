import MainWrapperProps from "../../proptypes/MainWrapperProps"

const MainWrapper = (props:MainWrapperProps) => {

    const mainWrapperStyles = {
        wrapper: `
        w-screen w-min-screen w-max-screen
        h-screen h-min-screen h-max-screen
        grid grid-flow-col grid-cols-[1.5fr,6fr,1.5fr] grid-rows-[2.75em,8fr] gap-2 p-2
        bg-gradient-to-tr from-slate-900 via-blue-900 to-slate-900
        `
    }
    
    return (
        <div className={mainWrapperStyles.wrapper}>
            {props.children}
        </div>
    )
}

export default MainWrapper