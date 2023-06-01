import logo from "../../assets/logo.png"

const LoadingScreen = () => {

    const styles = {
        ctn: `
            flex justify-center items-center
            w-min-screen h-min-screen
            w-screen h-screen
            bg-gradient-to-tr from-lightMainWrapperFrom via-lightMainWrapperVia to-lightMainWrapperTo
            dark:bg-gradient-to-tr dark:from-darkMainWrapperFrom dark:via-darkMainWrapperVia dark:to-darkMainWrapperTo
        `,
        logo: `
            w-40 h-40
            aspect-square
            animate-pulse
            -rotate-6
        `,
    }

    return (
        <div className={styles.ctn}>
            <img className={styles.logo} src={logo} alt="CheapChipsLogo" />
        </div>
    )

}



export default LoadingScreen