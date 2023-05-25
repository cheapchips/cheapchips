import ButtonProps from "../../proptypes/ButtonProps"

const WalletButton = (props:ButtonProps) => {

    const walletButtonFunction = props.clickable === true ? props.onClickFunction : undefined
    const walletButtonStyles = {
        button: `
            bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-600 to-yellow-300
            active:opacity-75
            py-2 px-4 mx-1
            rounded-md shadow-inner drop-shadow-md
            flex content-center
        `,
        buttonInactive: `
            flex justify-center items-center
            text-sm
            w-36 h-8
            bg-lightBgActive
            dark:bg-darkBgActive
            border
            border-lightBorder
            dark:border-darkBorder
            rounded-md shadow-inner drop-shadow-md
        `,

        text: `
            text-xs font-bold
            text-white
        `,
        textInactive: `
            text-lightText
            dark:text-darkText
            opacity-40
        `,

    }
    
    return (
        props.active
        ?
        <button className={walletButtonStyles.button} onClick={() => walletButtonFunction!()}>
            <span className={walletButtonStyles.text}>CONNECT WALLET</span>
        </button>
        :
        <div className={walletButtonStyles.buttonInactive}>
            <span className={walletButtonStyles.textInactive}>CONNECTED</span>
        </div>    
    )

}

export default WalletButton