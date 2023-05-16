import PanelProps from "../../proptypes/PanelProps"

const Panel = (props:PanelProps) => {

    const panelStyles = {
        panel: `
            rounded-md border
            bg-lightBg border-lightBorder
            dark:bg-darkBg dark:border-darkBorder
            ${props.panelType === "nav" ? "col-span-full" : ""}
            ${props.panelType === "main" ? "flex justify-center items-center" : ""}
            ${props.panelType === "side" ? "" : ""}
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