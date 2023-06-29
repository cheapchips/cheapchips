import { ContractFunction, ContractTransaction } from "ethers"
import { PerformType} from "../types/useTransactionTypes"
import useWeb3Context from "./useWeb3Context"

type ProviderRpcErrorData = {
    code: number
    data: string
    message: string
}

type ProviderRpcError = {
    code: number
    message: string
    data: ProviderRpcErrorData
}

function isProviderRpcError(error:unknown): error is ProviderRpcError{
    return  !!error && 
            typeof error === "object" &&
            "code" in error &&
            "message" in error &&
            "data" in error
}

export default function useContractFunction<T extends ContractFunction>(transaction: T):[PerformType<T>]{
    
    const web3Context = useWeb3Context()
    
    async function perform(...args: Parameters<T>){
        const {setTxHash, setTxStatus, setTxErrorMessage} = web3Context
        try {
            setTxStatus("created")
            const tx = await transaction(...args) as ContractTransaction
            setTxHash(tx.hash)
            setTxStatus("submitted")
            const receipt = await tx.wait()
            console.log(receipt)

            setTxStatus("done")
            
        } catch (error:unknown) {
            // if(!(error instanceof Object)) return
            // console.log(error.constructor.name)
            if(!isProviderRpcError(error)) return

            if(error.code === 4001){
                setTxStatus("denied")
                return
            }
            if(error.code === -32603){
                setTxErrorMessage(error.data.message)
                setTxStatus("failed")
                return
            }
            else setTxStatus("failed")
            return
            
            // transaction may fail due to different reasons
            // -> too small allowance (solution: approve more tokens)
            // -> user has no tokens
            // -> anything

        }

    }


    return [perform]
}