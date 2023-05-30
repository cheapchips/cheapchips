import WrapperProps from "./WrapperProps";

export default interface ModalSkeletonProps extends WrapperProps {
    title: string
    size: "Big" | "Medium" | "Small" | "Tx"
    customBg?: string
    onClickClose: () => void
    closeBtnDisabled?: boolean
}