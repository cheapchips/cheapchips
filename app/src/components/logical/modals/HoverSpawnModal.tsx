import { useState, useEffect } from "react"

type hoverStatusPlacement = "top" | "bottom" | "left" | "right"

const HoverSpawnModal = (props:{parentElemId:string, placement:hoverStatusPlacement}) => {

    useEffect(() => {
        handleParentPosition()
    }, [])

    const [validParent, setValidParent] = useState<boolean>(false)
    const [left, setLeft] = useState<number | undefined>()
    const [top, setTop] = useState<number | undefined>()

    const handleParentPosition = () => {
        const parent = document.getElementById(props.parentElemId)
        if(!parent){
            console.log('parent not valid')
            return
        }
        const parentOffsets = parent.getBoundingClientRect()
        // console.log(parentOffsets)
        setValidParent(true)
        handlePosition(parentOffsets)
    }

    const handlePosition = (parentOffsets:DOMRect) => {

        const xCenter = (parentOffsets.left + parentOffsets.right) / 2
        const yCenter = (parentOffsets.top + parentOffsets.bottom) / 2
        if(props.placement === "bottom"){
            setTop(parentOffsets.bottom)
            setLeft(xCenter)
        }
    }

    const styles = {
        ctn: `
            ${!validParent ? "hidden" : ""}
            flex justify-center items-center w-fit
            absolute
            border border-lightBorder dark:border-darkBorder
            bg-lightBg dark:bg-darkBg
            rounded-md
            drop-shadow-2xl
            z-[99]
            xl:p-2 xl:m-2
            lg:p-1 lg:m-1
            md:p-1 md:m-1
            2xl:text-xs
            xl:text-xxs
            lg:text-xxxs
            md:text-xxxxs
            sm:text-xxxxs
            font-content
        `,
    }

    return (
        <>
            {validParent && left && top
            ?
                <div className={styles.ctn} style={{left: left, top: top}}>
                    <span>This is a hover tip</span>
                </div>
            :
                <></>
            }
        </>
        
    )    
}


export default HoverSpawnModal



