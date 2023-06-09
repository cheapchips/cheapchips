import { useEffect, useState } from "react"

export default function useTheme():[string, () => void] {
    
    const [theme, setTheme] = useState<string | null>(localStorage.getItem("THEME"))

    useEffect(() => {
        detectTheme()
        // console.log('theme', localStorage.getItem("THEME"))
    }, [])

    useEffect(() => {
        if(!theme) return
        const bodyClassList = document.documentElement.classList;
        // console.log('detected theme: ', theme)
        theme === "dark" ? bodyClassList.add("dark") : bodyClassList.remove("dark")
    }, [theme])

    const detectTheme = () => {
        if(theme) return
        setTheme(window.matchMedia('(prefers-color-scheme:dark)').matches ? "dark" : "light")
    }

    const toggleTheme = () => {
        const inverted_theme = (theme === "dark" ? "light" : "dark")
        setTheme(inverted_theme)
        localStorage.setItem("THEME", inverted_theme)
    }

    return [theme!, toggleTheme]

}