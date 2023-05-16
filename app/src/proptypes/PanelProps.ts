export default interface PanelProps {
    children: any
    panelType: "nav" | "main" | "lobby" | "profile"
    additionalClasses?: string
}