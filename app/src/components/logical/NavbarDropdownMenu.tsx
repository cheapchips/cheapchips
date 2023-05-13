import { useState } from "react"
import NavbarDropdownProps from "../../proptypes/NavbarDropdownProps"
import NavbarDropdownIcon from "../layout/NavbarDropdownIcon"

const NavbarDropdownMenu = (props:NavbarDropdownProps) => {

    const [visible, setVisible] = useState(false)

    const navDropdownStyles = {
        mainCtn: `flex flex-row`,
        dropdownCtn: `
        absolute flex flex-col
        w-24 h-fit mt-5
        bg-zinc-800 rounded-lg
        border-2 border-zinc-700
        `,
        dropdownItem: `
        text-xs
        self-center p-2
        hover:text-slate-300
        `,
    }

    const dropdownOptions = props.dropdownOpts.map(opt => <button onClick={() => window.open(opt.url, '_blank')} className={navDropdownStyles.dropdownItem}>{opt.title}</button>)
  
    return (
        <div className={navDropdownStyles.mainCtn} onMouseOver={() => setVisible(true)}  onMouseOut={() => setVisible(false)}>
            <button>{props.buttonText}</button>
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