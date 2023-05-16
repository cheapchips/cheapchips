import PanelProps from "../../proptypes/PanelProps"

const Panel = (props:PanelProps) => {

    const panelStyles = {
        panel: `
            rounded-md border
            bg-lightBg border-lightBorder
            dark:bg-darkBg dark:border-darkBorder
            text-lightText
            dark:text-darkText
            ${props.panelType === "nav" ? `col-span-full` : ""}
            ${props.panelType === "main" ? `
            flex justify-center items-center content-center
            ` : ""}
            ${props.panelType === "lobby" ? `
            grid grid-flow-row grid-rows-[auto,1fr]
            ` : ""}
            ${props.panelType === "profile" ? `
            grid grid-flow-row grid-rows-[auto,1fr]
            divide-y
            divide-lightBorder dark:divide-darkBorder
            ` : ""}
            ${props.additionalClasses ? props.additionalClasses : ""}
        `
    }
    
    return (
        <div className={panelStyles.panel}>
            {props.children}
        </div>
    )
}

export default Panel