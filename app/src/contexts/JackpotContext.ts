import { createContext } from "react"
import JackpotContextInterface from "../types/JackpotContextInterface"

const JackpotContext = createContext<JackpotContextInterface | undefined>(undefined)

export default JackpotContext