import logo from "../../assets/logo.png"

const LoadingScreen = () => {

    const loadingStyles = {
        ctn: `
            flex justify-center items-center
            w-min-screen h-min-screen
            w-screen h-screen
            bg-lightBg
            dark:bg-darkBg
        `,
        logo: `
            w-40 h-40
            aspect-square
            animate-pulse
            -rotate-6
            `,
    }

    return (
        <div className={loadingStyles.ctn}>
            <img className={loadingStyles.logo} src={logo} alt="CheapChipsLogo" />
        </div>
    )

}



export default LoadingScreen