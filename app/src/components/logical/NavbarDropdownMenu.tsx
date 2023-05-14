import { useState } from "react"
import NavbarDropdownProps from "../../proptypes/NavbarDropdownProps"
import SvgIcon from "../layout/SvgIcon"

const NavbarDropdownMenu = (props:NavbarDropdownProps) => {

    const [visible, setVisible] = useState(false)

    const navDropdownStyles = {
        mainCtn: `flex flex-row`,
        dropdownCtn: `
        absolute flex flex-col
        w-24 h-fit mt-8 rounded-lg
        bg-slate-900
        border border-slate-700
        shadow-2xl
        `,
        dropdownIcon: `
        w-2.5 h-2.5 ml-1.5 self-center fill-white
        `,
        dropdownItem: `
        text-xs
        self-center p-2
        hover:text-amber-400
        `,
        dropdownBtn: `
        text-xs text-white
        py-2
        `
    }

    const dropdownOptions = props.dropdownOpts.map(opt => <button onClick={() => window.open(opt.url, '_blank')} className={navDropdownStyles.dropdownItem}>{opt.title}</button>)
  
    return (
        <div className={navDropdownStyles.mainCtn} onMouseOver={() => setVisible(true)}  onMouseOut={() => setVisible(false)}>
            <button className={navDropdownStyles.dropdownBtn}>{props.buttonText}</button>
            <SvgIcon style={navDropdownStyles.dropdownIcon} viewBox="0 0 512 298.04" pathD="M12.08 70.78c-16.17-16.24-16.09-42.54.15-58.7 16.25-16.17 42.54-16.09 58.71.15L256 197.76 441.06 12.23c16.17-16.24 42.46-16.32 58.71-.15 16.24 16.16 16.32 42.46.15 58.7L285.27 285.96c-16.24 16.17-42.54 16.09-58.7-.15L12.08 70.78z" />
            {visible ?
            <>
                <div className={navDropdownStyles.dropdownCtn}>
                    {dropdownOptions}
                </div>
            </>
            : null} 
        </div>
    )


}

export default NavbarDropdownMenu