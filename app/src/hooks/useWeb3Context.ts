import { useContext } from "react";
import Web3Context from "../contexts/Web3Context";
import Web3ContextReadyInterface from "../types/Web3ContextReadyInterface";

export default function useWeb3Context(){
    return useContext(Web3Context) as Web3ContextReadyInterface 
}