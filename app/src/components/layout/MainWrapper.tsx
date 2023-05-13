import MainWrapperProps from "../../proptypes/MainWrapperProps"

const MainWrapper = (props:MainWrapperProps) => {

    const mainWrapperStyles = {
        wrapper: `
        w-screen w-min-screen w-max-screen
        h-screen h-min-screen h-max-screen
        grid grid-flow-col grid-cols-[1.5fr,6fr,1.5fr] grid-rows-[3em,8fr] gap-3 p-3
        bg-zinc-50
        dark:bg-zinc-900
        `
    }

    return (
        <div className={mainWrapperStyles.wrapper}>
            {props.children}
        </div>
    )
}

export default MainWrapper