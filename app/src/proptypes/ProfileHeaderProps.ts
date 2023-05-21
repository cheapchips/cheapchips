import ActiveComponent from "./ActiveComponent"

export default interface ProfileHeaderProps extends ActiveComponent {
    title: string
    address: string
    chipsBalance: number
    linkBalance: number
}