export default interface ButtonProps {
    onClickFunction: () => Promise<void>
    text: string
    clickable: boolean
    active: boolean
}