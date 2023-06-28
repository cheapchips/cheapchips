import { TxStatus, TxHash } from "./useTransactionTypes"

type TxInfo = {
    status: TxStatus
    hash: TxHash
    errorMessage?: string
}

export default TxInfo