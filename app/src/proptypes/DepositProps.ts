export default interface DepositProps {
    active: boolean
    depositAmount: number
    defaultDepositAmount: number
    minDepositAmount: number
    maxDepositAmount: number
    handleImageDepositChange: any
    handleInputDepositValueChange: React.Dispatch<React.SetStateAction<number>>
}