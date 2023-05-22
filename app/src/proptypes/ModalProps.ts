import WrapperProps from "./WrapperProps";

export default interface ModalProps extends WrapperProps {
    size: "Big" | "Medium" | "Small"
    onClickClose: () => void
}