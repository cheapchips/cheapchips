import { createContext } from "react";
import Web3ContextInterface from "../types/web3ContextInterface";

const Web3Context = createContext<Web3ContextInterface>({
    address: undefined,
    provider: undefined,
    signer: undefined,
    chipStable: undefined,
    chipStableBalance: undefined,
    linkToken: undefined,
    linkTokenBalance: undefined,
    jackpot: undefined,
})
export default Web3Context
