import { useState, useEffect } from "react"

export default function useLoadingScreen(): boolean {

    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        
        const onPageLoad = () => {
            setLoading(false)
        }
        
        if (document.readyState === 'complete') {
            // timeout to test
            setTimeout(() => {
                onPageLoad()
            }, 500);
        } else {
            window.addEventListener('load', onPageLoad, false)
            return () => window.removeEventListener('load', onPageLoad)
        }

    }, [])


  return loading


}