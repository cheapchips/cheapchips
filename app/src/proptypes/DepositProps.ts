export default interface DepositProps {
    active: boolean
    depositAmount: number
    defaultDepositAmount: number
    minDepositAmount: number
    maxDepositAmount: number
    handleDepositPercentageChange: (percValue:number) => void
    handleDepositInputChange: (value:number) => void
    handleDepositTx: () => void
}