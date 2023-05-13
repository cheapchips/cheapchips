import PanelProps from "../../proptypes/PanelProps"

const Panel = (props:PanelProps) => {

    const panelStyles = {
        panel: `
            rounded-md
            bg-zinc-200 border-zinc-100
            dark:bg-zinc-800 dark:border-zinc-700
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