import { useState } from "react"

const NavbarDropdownMenu = (props: {buttonText:string, dropdownOptions:string[]}) => {

    const [visible, setVisible] = useState(true)

    const navDropdownStyles = {
        mainWrapper: ``,
        dropdownCtn: `
        absolute flex flex-col
        w-24 h-24 h-fit
        bg-zinc-700 rounded-lg
        border-2 border-zinc-600
        `,
        dropdownItem: `
        self-center p-2
        hover:text-slate-300
        `,
    }

    const dropdownOptions = props.dropdownOptions.map(opt => <button className={navDropdownStyles.dropdownItem}>{opt}</button>)
  
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