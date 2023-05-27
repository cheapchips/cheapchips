import { createContext } from "react";
import Web3ContextInterface from "../types/web3ContextInterface";

const Web3Context = createContext<Web3ContextInterface | null>(null)
export default Web3Context
