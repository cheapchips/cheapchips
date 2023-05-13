export default interface ButtonProps {
    onClickFunction: (React.MouseEventHandler<HTMLButtonElement> | undefined)
    text: string
    clickable: boolean
    active: boolean
}