export default interface DepositProps {
    depositData: [number, number, number, number, (percValue:number) => void, (value:number) => void, () => void]
    active: boolean
}