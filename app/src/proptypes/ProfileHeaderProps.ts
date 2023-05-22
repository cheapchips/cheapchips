import ActiveComponent from "./ActiveComponent"

export default interface ProfileHeaderProps extends ActiveComponent {
    address: string
    chipsBalance: number
    linkBalance: number
}