import { useState } from "react"
import NavbarDropdownProps from "../../proptypes/NavbarDropdownProps"

const NavbarDropdownMenu = (props:NavbarDropdownProps) => {

    const [visible, setVisible] = useState(false)

    const navDropdownStyles = {
        mainWrapper: ``,
        dropdownCtn: `
        absolute flex flex-col
        w-24 h-24 h-fit
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
        <div className={navDropdownStyles.mainWrapper} onMouseOver={() => setVisible(true)}  onMouseOut={() => setVisible(false)}>
            <button>{props.buttonText}</button>
            {visible ?
                <div className={navDropdownStyles.dropdownCtn}>
                    {dropdownOptions}
                </div>
            : ""} 
        </div>
    )


}

export default NavbarDropdownMenu