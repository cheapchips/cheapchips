import { createContext } from "react";
import Web3ContextInterface from "../types/Web3ContextInterface";

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
    setTxStatus: () => {},
    setTxHash: () => {},
    setTxErrorMessage: () => {},
    setChipStableBalance: () => {},
    setLinkTokenBalance: () => {},
})
export default Web3Context
