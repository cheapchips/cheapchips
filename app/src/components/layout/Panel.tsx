import PanelProps from "../../proptypes/PanelProps"

const Panel = (props:PanelProps) => {

    const panelStyles = {
        panel: `
            border border-lightBorder dark:border-darkBorder
            bg-lightBg dark:bg-darkBg
            text-lightText dark:text-darkText
            rounded-md overflow-hidden
            ${props.panelType === "nav" ? `col-span-full` : ""}
            ${props.panelType === "main" ? `
            flex justify-center items-center content-center
            ` : ""}
            ${props.panelType === "side" ? `
                grid grid-flow-row grid-rows-[auto,1fr]
            ` : ""}
            ${props.additionalClasses ? props.additionalClasses : ""}`
    }
    
    return (
        <div className={panelStyles.panel}>
            {props.children}
        </div>
    )
}

export default Panel