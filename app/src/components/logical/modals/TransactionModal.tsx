import ModalSkeleton from "../ModalSkeleton";
import { useEffect, useState, useContext } from "react";
import cheapChipsLogo from "../../../assets/logo.png";
import metaMaskLogo from "../../../assets/metamask_logo.png";
import SvgIcon from "../../layout/SvgIcon";
import Web3Context from "../../../contexts/Web3Context";

const TransactionModal = (props:{txTitle:string, onClickClose:() => void}) => {
    
    const styles = {
        ctn: `
        flex flex-col grow
        justify-center items-center content-center
        overflow-y-auto
        p-2 gap-2
        `,
        createdTx: {
            metamaskLogo: `
            xl:w-20 xl:h-20 lg:w-16 lg:h-16 md:w-12 md:h-12 sm:w-6 sm:h-6
            animate-pulse
            `,
        },
        submittedTx: {
            icon: `
            xl:w-20 xl:h-20 lg:w-16 lg:h-16 md:w-12 md:h-12 sm:w-6 sm:h-6
            fill-lightBg dark:fill-darkBg
            stroke-[2] stroke-lightBorder dark:stroke-darkBorder
            animate-bounce-slow
            `,
        },
        deniedTx: {
            icon: `
            xl:w-20 xl:h-20 lg:w-16 lg:h-16 md:w-12 md:h-12 sm:w-6 sm:h-6
            fill-red-500 dark:fill-red-500
            animate-pulse
            `,
        },
        failedTx: {
            icon: `
            xl:w-20 xl:h-20 lg:w-16 lg:h-16 md:w-12 md:h-12 sm:w-6 sm:h-6
            fill-red-500 dark:fill-red-500
            animate-pulse
            `,
        },
        doneTx: {
            icon: `
            xl:w-20 xl:h-20 lg:w-16 lg:h-16 md:w-12 md:h-12 sm:w-6 sm:h-6
            animate-bounce
                `,
            }
        }
    
    const web3 = useContext(Web3Context)
    const [closeBtnVisible, setCloseBtnVisible] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(true)
        
    useEffect(() => {
        if(web3.tx.status === "nonexist") return
        handleStatus()
        console.log(web3.tx.errorMessage)
    }, [web3.tx.status, web3.tx.errorMessage])
    
    const handleStatus = () => {
        console.log(web3.tx.status)
        if(web3.tx.status === "done"){
            enableCloseBtn()
            setTimeout(() => {setVisible(false)}, 2500)
        }
        if(web3.tx.status === "denied" || web3.tx.status === "failed"){
            enableCloseBtn(1500)
        }
    }
    
    const enableCloseBtn = (delay?:number) => {
        if(!delay) setCloseBtnVisible(true)
        setTimeout(() => {
            setCloseBtnVisible(true)
        }, delay)
    }
    
    const CreatedTx = () => {
        return (
        <>
            <img className={styles.createdTx.metamaskLogo} src={metaMaskLogo} alt="MetaMaskLogo" />
            <span>Please confirm the transaction in Metamask!</span>
        </>
        )
    }
    
    const SubmittedTx = () => {
        return (
            <>
                <SvgIcon style={styles.submittedTx.icon}
                    viewBox="0 0 122.88 29.956"
                    pathD="M122.88,14.978c0,8.271-6.708,14.979-14.979,14.979s-14.976-6.708-14.976-14.979 C92.926,6.708,99.631,0,107.901,0S122.88,6.708,122.88,14.978L122.88,14.978z M29.954,14.978c0,8.271-6.708,14.979-14.979,14.979 S0,23.248,0,14.978C0,6.708,6.705,0,14.976,0S29.954,6.708,29.954,14.978L29.954,14.978z M76.417,14.978 c0,8.271-6.708,14.979-14.979,14.979c-8.27,0-14.978-6.708-14.978-14.979C46.46,6.708,53.168,0,61.438,0 C69.709,0,76.417,6.708,76.417,14.978L76.417,14.978z"
                />
                <span>Processing transaction...</span>
            </>
        )
    }
    
    const DeniedTx = () => {
        return (
            <>
                <SvgIcon style={styles.deniedTx.icon}
                    viewBox="0 0 95.23 122.88"
                    pathD="M10.52,22.54L10.52,22.54c2.11,0,4.08,0.63,5.73,1.71v-2.84c0-2.89,1.18-5.52,3.09-7.43c1.9-1.9,4.53-3.09,7.43-3.09l0,0 c2.23,0,4.3,0.7,6.01,1.9v-2.29c0-2.89,1.18-5.52,3.09-7.43C37.77,1.18,40.4,0,43.29,0l0,0c2.89,0,5.52,1.18,7.43,3.09 c1.9,1.9,3.09,4.53,3.09,7.43v2.32c1.68-1.15,3.71-1.82,5.9-1.82l0,0c2.89,0,5.52,1.18,7.43,3.09c1.9,1.9,3.09,4.54,3.09,7.43 v49.97c0.13,0.86,0.2,1.74,0.2,2.64v2.94l0.26-0.24c1.81-1.7,3.58-3.47,4.24-4.14c4.48-4.49,9.31-5.44,13.14-4.23 c1.73,0.55,3.23,1.53,4.41,2.83c1.17,1.29,2.03,2.89,2.46,4.69c1.01,4.25-0.36,9.6-5.64,14.32l-0.09,0.09l0,0l-0.02,0.02 l-23.12,23.34l0,0.01c-0.05,0.05-0.11,0.11-0.17,0.16c-3.38,3.25-6.69,5.47-10.29,6.9c-3.66,1.46-7.52,2.06-11.94,2.06H28.71 c-7.96,0-15.13-3.26-20.31-8.5C3.2,109.11,0,101.84,0,93.85V74.13c0-0.69,0.04-1.37,0.11-2.04C0.04,71.86,0,71.61,0.01,71.36v-38.3 c0-2.89,1.18-5.52,3.09-7.43C5,23.72,7.63,22.54,10.52,22.54L10.52,22.54z M66.14,83.55c-4.09-1.57-7.81-2.34-11.09-2.39 c-3.43-0.05-6.36,0.68-8.69,2.08c-2.26,1.35-3.98,3.38-5.07,5.96c-0.85,2.01-1.31,4.35-1.35,6.98l-4.76-0.06 c0.05-3.28,0.63-6.23,1.7-8.77c1.48-3.53,3.87-6.31,7.03-8.2c3.08-1.85,6.86-2.81,11.19-2.75c3.23,0.05,6.76,0.66,10.53,1.9v-4.16 c0-0.51-0.03-1.02-0.09-1.52c-0.1-0.22-0.16-0.45-0.19-0.7c-0.63-2.87-2.23-5.4-4.45-7.22c-2.22-1.81-5.05-2.91-8.12-2.91h-1.2 c-0.03,0-0.05,0-0.08,0c-0.03,0-0.05,0-0.08,0H35.17c-0.05,0-0.09,0-0.14,0c-0.05,0-0.09,0-0.14,0H18.64 c-0.25,0-0.5-0.04-0.73-0.12h-0.6c-3.06,0-5.87,1.08-8.07,2.87c-1.09,0.89-2.03,1.94-2.79,3.13c-1.07,1.9-1.67,4.11-1.67,6.46 v19.72c0,6.7,2.67,12.79,7.02,17.18c4.31,4.36,10.27,7.06,16.91,7.06h14.96c3.86,0,7.16-0.5,10.19-1.71c3-1.19,5.81-3.1,8.73-5.91 c0.03-0.03,0.06-0.06,0.09-0.09l0,0l0.03-0.03l23.09-23.31c0.07-0.08,0.15-0.17,0.24-0.24l1.59,1.79l-1.58-1.78 c3.83-3.39,4.89-7,4.23-9.74c-0.24-1-0.7-1.88-1.34-2.58c-0.63-0.7-1.42-1.22-2.32-1.5c-2.27-0.72-5.28,0.01-8.32,3.05 c-0.7,0.7-2.55,2.55-4.35,4.25c-1.7,1.59-3.45,3.12-4.6,3.77c-0.38,0.25-0.83,0.4-1.32,0.4C67.26,84.47,66.57,84.11,66.14,83.55 L66.14,83.55z M21.04,56.5h11.47V21.42c0-1.57-0.65-3.01-1.69-4.05c-1.04-1.04-2.47-1.69-4.05-1.69l0,0 c-1.57,0-3.01,0.65-4.05,1.69c-1.04,1.04-1.69,2.47-1.69,4.05v11.64V56.5L21.04,56.5z M37.56,56.5h11.47V10.52 c0-1.57-0.65-3.01-1.69-4.05c-1.04-1.04-2.47-1.69-4.05-1.69l0,0c-1.57,0-3.01,0.65-4.05,1.69c-1.04,1.04-1.69,2.47-1.69,4.05V56.5 L37.56,56.5z M53.97,56.54c4.38,0.29,8.34,2.2,11.27,5.14c0.07,0.07,0.13,0.14,0.2,0.2V21.53c0-1.57-0.65-3.01-1.69-4.05 c-1.04-1.04-2.47-1.68-4.05-1.68l0,0c-1.57,0-3.01,0.64-4.05,1.68c-1.04,1.04-1.69,2.47-1.69,4.05V56.54L53.97,56.54z M4.79,61.93 c0.09-0.09,0.17-0.19,0.26-0.28c2.89-2.95,6.8-4.86,11.2-5.12V33.06c0-1.57-0.64-3.01-1.68-4.05c-1.04-1.04-2.47-1.69-4.05-1.69 l0,0c-1.58,0-3.01,0.65-4.05,1.69c-1.04,1.04-1.68,2.47-1.68,4.05V61.93L4.79,61.93z"
                />
                <span>You denied the transaction.</span>
            </>
        )
        
    }
    
    const FailedTx = () => {
        return (
            <>
                <SvgIcon style={styles.failedTx.icon}
                    viewBox="0 0 122.881 122.88"
                    pathD="M61.44,0c16.966,0,32.326,6.877,43.445,17.996c11.119,11.118,17.996,26.479,17.996,43.444 c0,16.967-6.877,32.326-17.996,43.444C93.766,116.003,78.406,122.88,61.44,122.88c-16.966,0-32.326-6.877-43.444-17.996 C6.877,93.766,0,78.406,0,61.439c0-16.965,6.877-32.326,17.996-43.444C29.114,6.877,44.474,0,61.44,0L61.44,0z M80.16,37.369 c1.301-1.302,3.412-1.302,4.713,0c1.301,1.301,1.301,3.411,0,4.713L65.512,61.444l19.361,19.362c1.301,1.301,1.301,3.411,0,4.713 c-1.301,1.301-3.412,1.301-4.713,0L60.798,66.157L41.436,85.52c-1.301,1.301-3.412,1.301-4.713,0c-1.301-1.302-1.301-3.412,0-4.713 l19.363-19.362L36.723,42.082c-1.301-1.302-1.301-3.412,0-4.713c1.301-1.302,3.412-1.302,4.713,0l19.363,19.362L80.16,37.369 L80.16,37.369z M100.172,22.708C90.26,12.796,76.566,6.666,61.44,6.666c-15.126,0-28.819,6.13-38.731,16.042 C12.797,32.62,6.666,46.314,6.666,61.439c0,15.126,6.131,28.82,16.042,38.732c9.912,9.911,23.605,16.042,38.731,16.042 c15.126,0,28.82-6.131,38.732-16.042c9.912-9.912,16.043-23.606,16.043-38.732C116.215,46.314,110.084,32.62,100.172,22.708 L100.172,22.708z"
                />
                <span>Transaction failed.</span>
                <span className="w-1/2 text-red-300 text-center">Error: {(!web3.tx.errorMessage) ? "" : web3.tx.errorMessage}</span>
            </>
        )
    }
    
    
    const DoneTx = () => {
        return (
            <>
                <img className={styles.doneTx.icon} src={cheapChipsLogo} alt="CheapChipsLogo" />
                <span>Done!</span>
            </>
        )
    }

    if(!visible) return <></>
    return (
        web3.tx.status !== "nonexist" ?
        <ModalSkeleton title={props.txTitle} size="Tx" onClickClose={() => setVisible(false)} closeBtnDisabled={!closeBtnVisible}>
            <div className={styles.ctn}>
                {
                    web3.tx.status === "created" ? 
                        <CreatedTx />
                    :
                    web3.tx.status === "submitted" ?
                        <SubmittedTx />
                    : 
                    web3.tx.status === "done" ? 
                        <DoneTx />
                    :
                    web3.tx.status === "denied" ?
                        <DeniedTx />
                    :
                    web3.tx.status === "failed" ?
                        <FailedTx />
                    :
                    <></>
                }
            </div>
        </ModalSkeleton>
        :
        <></>
    )
}

export default TransactionModal