
import { useState, useEffect } from "react"

export default function useModal(): [boolean, () => void] {

    const [visible, setVisible] = useState<boolean>(false)
    const bodyClassList = document.documentElement.classList;
    const modalClassList = document.getElementById("modal")?.classList;

    useEffect(() => {
        handleFocus()
        console.log(visible)
    }, [visible])

    function handleFocus():void {
        // visible ? bodyClassList.add('blurred') : bodyClassList.remove('blurred')
    }

    function toggleVisible():void {
        setVisible(!visible)
    }

    return [visible, toggleVisible]

}