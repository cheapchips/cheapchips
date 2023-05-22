import ButtonProps from "../../proptypes/ButtonProps"

const WalletButton = (props:ButtonProps) => {

    const walletButtonFunction = props.clickable === true ? props.onClickFunction : undefined
    const walletButtonStyles = {
        button: `
            bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-600 to-yellow-300
            active:opacity-75
            py-2 px-4 mx-1
            rounded shadow-inner shadow-md
            flex content-center
        `,
        text: `
            text-white text-xs font-bold
        `
    }
    
    return (
        <button className={walletButtonStyles.button} onClick={() => walletButtonFunction!()}>
            <span className={walletButtonStyles.text}>{props.text}</span>
        </button>    
    )

}

export default WalletButton