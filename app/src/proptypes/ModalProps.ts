import WrapperProps from "./WrapperProps";

export default interface ModalProps extends WrapperProps {
    title: string
    size: "Big" | "Medium" | "Small"
    onClickClose: () => void
}