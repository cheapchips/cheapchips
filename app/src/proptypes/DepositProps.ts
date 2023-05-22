import ActiveComponent from "./ActiveComponent"

export default interface DepositProps extends ActiveComponent {
    depositData: [number, number, number, number, (percValue:number) => void, (value:number) => void, () => void]
}