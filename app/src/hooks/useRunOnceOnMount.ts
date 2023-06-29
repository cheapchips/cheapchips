import { useEffect, useRef } from "react";

export default function useRunOnceOnMount(fn: () => void){
    const triggered = useRef(false);
    
    useEffect(() => {
        if(!triggered.current){
            fn()
            triggered.current = true
        }

    }, [fn])
}