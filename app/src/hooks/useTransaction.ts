import { Contract, ContractFunction, ContractTransaction, Overrides, Signer, ethers } from "ethers"
import { Logger } from "ethers/lib/utils"
import { useEffect, useState } from "react"



type TxStatus = "nonexist" | "created" | "denied" | "submitted" | "done" | "failed"

type PerformType = <T extends ContractFunction>(transaction: T, ...args: Parameters<T>) => Promise<void>


export default function useTrasaction():[TxStatus, PerformType]{
    
    const [status, setStatus] = useState<TxStatus>("nonexist")
    const [transactionHash, setTransactionHash] = useState<string>()

    useEffect(() => {
        //debug
        console.log(status)
    }, [status])


    async function perform<T extends ContractFunction>(transaction: T, ...args: Parameters<T>){
        try {
            setStatus("created")
            const tx = await transaction(...args) as ContractTransaction
            setStatus("submitted")
            const receipt = await tx.wait()
            console.log(receipt)
            setStatus("done")
            // console.log(tx)
            
        } catch (error: any) {
            if(error.code === 4001) setStatus("denied")
            if(error.code === -32603) setStatus("failed")
            else setStatus("failed")
            
            // transaction may fail due to different reasons
            // -> too small allowance (solution: approve more tokens)
            // -> user has no tokens
            // -> anything

        }

    }


    return [status, perform]
}