import PanelProps from "../../proptypes/PanelProps"

const Panel = (props:PanelProps) => {

    const panelStyles = {
        panel: `
            rounded-md border
            bg-blue-100 border-blue-200
            dark:bg-slate-900 dark:border-slate-700
            ${props.panelType === "nav" ? "col-span-full" : ""}
            ${props.panelType === "side" ? "side" : ""}
            ${props.panelType === "main" ? "main" : ""}
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