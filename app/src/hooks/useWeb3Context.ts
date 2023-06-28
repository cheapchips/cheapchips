import { useContext } from "react";
import Web3Context from "../contexts/Web3Context";
import Web3ContextInterface from "../types/Web3ContextInterface";

export default function useWeb3Context(){
    return useContext(Web3Context) as Web3ContextInterface 
}