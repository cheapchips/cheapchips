import WrapperProps from "./WrapperProps";

export default interface ModalSkeletonProps extends WrapperProps {
    title: string
    size: "Big" | "Medium" | "Small"
    onClickClose: () => void
}