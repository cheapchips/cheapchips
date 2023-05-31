import { useState, useEffect } from "react"

export default function useResponsiveIconSize(watchElem:string = "jackpot_container"): number {

    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined)

    useEffect(() => {
        function handleResize() {
            const container = document.getElementById(watchElem)
            setContainerWidth(container?.offsetWidth)
        }
      
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])
    const iconSize = Math.ceil(containerWidth! / 10 / 4)
    return iconSize
    
}