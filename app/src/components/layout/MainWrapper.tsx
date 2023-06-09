import MainWrapperProps from "../../proptypes/WrapperProps"
import useRound from "../../hooks/useRound"

const MainWrapper = (props:MainWrapperProps) => {

    const mainWrapperStyles = {
        wrapper: `
            w-screen w-min-screen w-max-screen
            h-screen h-min-screen h-max-screen
            grid grid-flow-col grid-cols-[1.5fr,6fr,1.5fr] grid-rows-[3em,8fr] gap-2 p-2
        
            bg-gradient-to-r from-lightMainWrapperFrom via-lightMainWrapperVia to-lightMainWrapperTo
            dark:bg-gradient-to-r dark:from-darkMainWrapperFrom dark:via-darkMainWrapperVia dark:to-darkMainWrapperTo
            background_anim
        `,
            // bg-gradient-to-tr from-lightMainWrapperFrom via-lightMainWrapperVia to-lightMainWrapperTo
            // dark:bg-gradient-to-tr dark:from-darkMainWrapperFrom dark:via-darkMainWrapperVia dark:to-darkMainWrapperTo
    }

    useRound()
    
    return (
        <div className={mainWrapperStyles.wrapper}>
            {props.children}
        </div>
    )
}

export default MainWrapper