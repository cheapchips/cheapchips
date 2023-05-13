import ButtonProps from "../../proptypes/ButtonProps"

const WalletButton = (props:ButtonProps) => {

    const walletButtonFunction = props.clickable === true ? props.onClickFunction : undefined
    const walletButtonStyles = {
        button: `
            text-xs break-normal
            text-white font-bold py-2 px-12 rounded
            bg-blue-500 hover:bg-blue-700
        `
    }

    return (
        <button className={walletButtonStyles.button} onClick={() => walletButtonFunction}>{props.text}</button>    
    )

}

export default WalletButton