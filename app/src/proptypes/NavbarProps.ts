import ButtonProps from "./ButtonProps"

export default interface NavbarProps {
    theme: string
    themeBtnOnClick: () => void
    walletConnected: boolean
    connectWalletProps: ButtonProps
}