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
    },
    setTxStatus: (status:TxStatus) => {},
    setTxHash: (hash:TxHash) => {},
})
export default Web3Context
