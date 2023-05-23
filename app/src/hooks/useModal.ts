
import { useState } from "react"

export default function useModal(): [boolean, () => void] {

    const [visible, setVisible] = useState<boolean>(false)

    function toggleVisible():void {
        setVisible(!visible)
    }

    return [visible, toggleVisible]

}