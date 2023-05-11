import PanelProps from "../../proptypes/PanelProps"

const Panel = (props:PanelProps) => {

    const panelStyles = {
        panel: `box-border border-2
        bg-zinc-700
        ${props.panelType === "nav" ? "col-span-full row-span-1" : ""}
        ${props.panelType === "side" ? "side" : ""}
        ${props.panelType === "main" ? "main" : ""}`
    }
    
    return (
        <div className={panelStyles.panel}>
            {props.children}
        </div>
    )
}

export default Panel