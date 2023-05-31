import { Contract, ContractFunction, ContractTransaction, Overrides, Signer, ethers } from "ethers"
import { useEffect, useState, useContext } from "react"
import { TxStatus, PerformType, TxHash } from "../types/useTransactionTypes"
import Web3Context from "../contexts/Web3Context"

// const [perform, TxStatus, txHash] = useTrasaction(jackpot.deposit)
// perform(10)

export default function useContractFunction<T extends ContractFunction>(transaction: T):[PerformType<T>]{
    
    const web3 = useContext(Web3Context)

    useEffect(() => {
        console.log(web3.tx)
    }, [web3])

    async function perform(...args: Parameters<T>){
        const {setTxHash, setTxStatus} = web3
        try {
            setTxStatus("created")
            const tx = await transaction(...args) as ContractTransaction
            setTxHash(tx.hash)
            setTxStatus("submitted")
            const receipt = await tx.wait()
            console.log(receipt)
            setTxStatus("done")
            // console.log(tx)
            
        } catch (error: any) {
            console.log(error)
            if(error.code === 4001) setTxStatus("denied")
            if(error.code === -32603) setTxStatus("failed")
            else setTxStatus("failed")
            
            // transaction may fail due to different reasons
            // -> too small allowance (solution: approve more tokens)
            // -> user has no tokens
            // -> anything

        }

    }


    return [perform]
}