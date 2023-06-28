import { createContext } from "react";
import Web3ContextInterface from "../types/Web3ContextInterface";

const Web3Context = createContext<Web3ContextInterface | undefined>(undefined)
export default Web3Context
