import ButtonProps from "./ButtonProps"

export default interface NavbarProps {
    address?: string
    balance?: number
    walletConnected: boolean
    connectWalletProps: ButtonProps
}