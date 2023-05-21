
import { useEffect, useState } from "react"

export default function useDeposit(): [number, number, number, number,(value:number) => void,(percValue:number) => void, () => void] {

    const DEFAULT_DEPOSIT = 1
    const MINIMUM_DEPOSIT = 0 // how to fix input and set this to 1 ?
    const MAX_DEPOSIT = 5
    const [depositAmount, setDepositAmount] = useState<number>(DEFAULT_DEPOSIT)

    const handleDepositTx = (): void => {
        if(depositAmount > MINIMUM_DEPOSIT || depositAmount < MAX_DEPOSIT || depositAmount === 0) return
        // display modal with deposit tx
        console.log("Deposit tx", depositAmount)
    }

    const handleDepositInput = (value: number): void => {
        // html input is buggy, work on this later (dot, 'e', arrows ,etc)
        if(value > MAX_DEPOSIT || value < MINIMUM_DEPOSIT) return
        if(Number.isNaN(value)) return
        setDepositAmount(value)
    }

    const handleDepositPercentage = (percentageValue:number): void => {
        if(percentageValue > 100 || percentageValue < 1) return
        const percVal = (percentageValue / 100) * MAX_DEPOSIT
        setDepositAmount(percVal)
    }

    return [depositAmount, DEFAULT_DEPOSIT, MINIMUM_DEPOSIT, MAX_DEPOSIT, handleDepositPercentage, handleDepositInput, handleDepositTx]

}

