export default interface ButtonProps {
    onClickFunction: () => Promise<void>
    clickable: boolean
    active: boolean
}