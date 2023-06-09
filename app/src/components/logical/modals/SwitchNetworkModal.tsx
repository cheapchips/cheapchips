import ModalSkeleton from "../ModalSkeleton";
import polygonLogo from "../../../assets/polygon-logo.png"


const SwitchNetworkModal = (props:{onClickClose:() => void, closeBtnDisabled?:boolean}) => {

    const styles = {
        ctn: `
            flex justify-center items-center grow flex-col gap-2 p-2
        `,
        polygonLogo: `
            xl:w-20 xl:h-20 lg:w-16 lg:h-16 md:w-12 md:h-12 sm:w-6 sm:h-6
            animate-pulse
        `,
        button: `
            p-2 rounded-md
            border border-lightBorder dark:border-darkBorder
            bg-lightBgActive dark:bg-darkBgActive
            hover:opacity-80
            active:opacity-50
        `,
    }

    const switchToCorrectNetwork = () => {
        if(!window.ethereum) return
        window.ethereum.request!({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x13881",
            rpcUrls: ["https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78"],
            chainName: "Polygon Testnet (Mumbai)",
            nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
            }]
        })
    }

    return (
        <ModalSkeleton title="Please switch your network" size="Medium" onClickClose={props.onClickClose} closeBtnDisabled={props.closeBtnDisabled}>

            <div className={styles.ctn}>
                <img className={styles.polygonLogo} src={polygonLogo} alt="PolygonLogo" />
                <span className="w-2/3 text-center">Please switch to Polygon Testnet to play CheapChips!</span>
                <button className={styles.button} onClick={() => switchToCorrectNetwork()}>Switch network</button>
            </div>

        </ModalSkeleton>
    )
}

export default SwitchNetworkModal