export default interface PanelProps {
    children: any
    panelType: "nav" | "side" | "main"
    additionalClasses?: string
}