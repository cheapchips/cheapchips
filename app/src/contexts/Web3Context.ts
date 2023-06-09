import { createContext } from "react";
import Web3ContextInterface from "../types/Web3ContextInterface";
import { TxHash, TxStatus } from "../types/useTransactionTypes";

const Web3Context = createContext<Web3ContextInterface>({
    address: undefined,
    provider: undefined,
    signer: undefined,
    chipStable: undefined,
    chipStableBalance: undefined,
    linkToken: undefined,
    linkTokenBalance: undefined,
    jackpot: undefined,
    tx: {
        status: "nonexist",
        hash: undefined,
        errorMessage: undefined
    },
    setTxStatus: (status:TxStatus) => {},
    setTxHash: (hash:TxHash) => {},
    setTxErrorMessage: (err:string) => {},
    setChipStableBalance: (newBalance:string) => {},
    setLinkTokenBalance: (newBalance:string) => {},
})
export default Web3Context
