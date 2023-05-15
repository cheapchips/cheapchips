import { useEffect, useState } from "react"

export default function useTheme():[string, () => void] {
    
    const [theme, setTheme] = useState<string | null>(null)

    useEffect(() => {
        detectTheme()
    }, [])

    useEffect(() => {
        if(!theme) return
        const bodyClassList = document.documentElement.classList;
        theme === "dark" ? bodyClassList.add("dark") : bodyClassList.remove("dark")
    }, [theme])

    const detectTheme = () => {
        setTheme(window.matchMedia('(prefers-color-scheme:dark)').matches ? "dark" : "light")
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return [theme!, toggleTheme]

}