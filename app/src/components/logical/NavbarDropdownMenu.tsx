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
        bg-blue-100
        dark:bg-slate-900
        border
        border-blue-200
        dark:border-slate-700
        shadow-md
        `,
        dropdownIcon: `
        w-2.5 h-2.5 ml-1.5 self-center fill-black dark:fill-white
        `,
        dropdownItem: `
        text-xs
        self-center p-2
        hover:text-amber-500
        dark:hover:text-amber-400
        hover:underline
        active:opacity-/75
        `,
        dropdownBtn: `
        text-xs py-2
        text-black
        dark:text-white
        cursor-default
        `
    }

    const dropdownOptions = props.dropdownOpts.map((opt, index) => <button key={index} onClick={() => window.open(opt.url, '_blank')} className={navDropdownStyles.dropdownItem}>{opt.title}</button>)
  
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