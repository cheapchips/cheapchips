import { useState } from "react"
import NavbarDropdownProps from "../../proptypes/NavbarDropdownProps"
import SvgIcon from "../layout/SvgIcon"

const DropdownMenu = (props:NavbarDropdownProps) => {

    const [visible, setVisible] = useState(false)

    const navDropdownStyles = {
        mainCtn: `
            flex flex-row
            md:text-xxxs
            lg:text-xxs
            xl:text-sm
        `,
        dropdownCtn: `
            absolute flex flex-col
            w-34 h-fit
            mt-8
            lg:mt-8
            md:mt-7
            rounded-md
            bg-lightBg
            dark:bg-darkBg
            border-lightBorder
            dark:border-darkBorder
            shadow-md border
            overflow-hidden
            z-50
            drop-shadow-2xl
        `,
        dropdownBtn: `
            text-lightText
            dark:text-darkText
            cursor-default
            py-2
        `,
        dropdownIcon: `
            w-2.5 h-2.5 ml-1.5 self-center
            fill-lightText
            dark:fill-darkText
        `,
        dropdownItem: `
            w-full
            self-center p-2
            active:opacity-75
            hover:bg-lightBgActive
            dark:hover:bg-darkBgActive
            hover:text-accentColor
            transition ease-in-out
            hover:scale-105
        `,
    }

    const dropdownOptions = props.dropdownOpts.map((opt, index) => 
    <button
        key={index}
        onClick={() => window.open(opt.url)}
        className={navDropdownStyles.dropdownItem}>
            {opt.title}
        </button>
    )
  
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

export default DropdownMenu