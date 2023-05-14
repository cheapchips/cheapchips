import { useState } from "react"
import NavbarDropdownProps from "../../proptypes/NavbarDropdownProps"
import NavbarDropdownIcon from "../layout/NavbarDropdownIcon"

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
            <NavbarDropdownIcon />
            {visible ?
            <>
                <div className={navDropdownStyles.dropdownCtn}>
                    {dropdownOptions}
                </div>
            </>
            : ""} 
        </div>
    )


}

export default NavbarDropdownMenu