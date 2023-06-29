import { PropsWithChildren } from "react";

type JackpotContextProviderInterface = PropsWithChildren<{
    setIsJackpotContextReady: (value:boolean) => void
}>

export default JackpotContextProviderInterface