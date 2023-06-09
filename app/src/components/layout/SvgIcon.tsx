import SvgIconProps from "../../proptypes/SvgIconProps"

const SvgIcon = (props:SvgIconProps) => {
    return (
        <svg className={props.style} viewBox={props.viewBox}>
            <path d={props.pathD} />
        </svg>
    )
}

export default SvgIcon