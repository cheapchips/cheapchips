export default interface PanelProps {
    children: any
    panelType: "nav" | "main" | "side"
    additionalClasses?: string
}