import { useState, useEffect } from "react"

export default function useResponsiveSizes(watchElem = "jackpot_container"):[number | undefined, number, number] {

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

    // ok?

    const blockContainerSize = Math.floor(containerWidth! / 10)
    const blockSize = Math.floor(containerWidth! / 90)
    return [containerWidth, blockContainerSize, blockSize]
    
}