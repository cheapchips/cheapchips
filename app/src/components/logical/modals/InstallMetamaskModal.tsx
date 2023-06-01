import ModalSkeleton from "../ModalSkeleton"
import metamask_logo from "../../../assets/metamask_logo.png"

const InstallMetamaskModal = (props:{onClickClose:() => void, closeBtnDisabled?: boolean, fadeAnimationDisabled?: boolean}) => {

    const styles = {
       installBg: `
            bg-gradient-to-tr from-lightMainWrapperFrom via-lightMainWrapperVia to-lightMainWrapperTo
            dark:bg-gradient-to-tr dark:from-darkMainWrapperFrom dark:via-darkMainWrapperVia dark:to-darkMainWrapperTo
            backdrop-blur-3xl
       `,
       ctn: `
            flex grow justify-center items-center flex-col
       `,
       metamaskLogo: `
            w-24 h-24
       `,
       button: `
            p-2 rounded-md
            border border-lightBorder dark:border-darkBorder
            bg-lightBgActive dark:bg-darkBgActive
            hover:opacity-80
            active:opacity-50
       `,
    }

    const installMetamask = ():void => {
        window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", "_blank")
    }

    return (
        <ModalSkeleton title="Please install Metamask to continue!" size="Medium" customBg={styles.installBg} fadeAnimationDisabled={true} {...props} >
            <div className={styles.ctn}>
                <img className={styles.metamaskLogo} src={metamask_logo} alt="MetaMask" />
                <button className={styles.button} onClick={() => installMetamask()}>Click here to install metamask</button>
            </div>
        </ModalSkeleton>
    )
}

export default InstallMetamaskModal