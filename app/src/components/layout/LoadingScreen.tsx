
const LoadingScreen = () => {

    const loadingStyles = {
        ctn: `
            w-min-screen h-min-screen
            w-screen h-screen
            bg-lightBg
            dark:bg-darkBg
        `,
    }


    return (
        <div className={loadingStyles.ctn}>
        </div>
    )

}



export default LoadingScreen