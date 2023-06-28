import JackpotContext from "../contexts/JackpotContext";
import { useContext } from "react";
import JackpotContextInterface from "../types/JackpotContextInterface";

export default function useJackpotContext(){
    return useContext(JackpotContext) as JackpotContextInterface 
}