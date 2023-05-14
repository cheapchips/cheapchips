import ButtonProps from "../../proptypes/ButtonProps"

const WalletButton = (props:ButtonProps) => {

    const walletButtonFunction = props.clickable === true ? props.onClickFunction : undefined
    const walletButtonStyles = {
        button: `
        bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-500 to-yellow-300
        text-white text-xs font-bold
        py-1 px-2 mx-1
        rounded
        `
    }
    
    return (
        <button className={walletButtonStyles.button} onClick={() => walletButtonFunction}>{props.text}</button>    
    )

}

export default WalletButton