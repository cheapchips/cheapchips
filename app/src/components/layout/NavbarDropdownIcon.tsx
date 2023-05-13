import arrowDown from "../../assets/icons/arrow-down.svg"

const NavbarDropdownIcon = () => {
    
    const dropdownIconStyles = {
        arrow: `w-4 h-4 ml-1.5 self-center bg-transparent`
    }

    return (
        <img src={arrowDown} className={dropdownIconStyles.arrow}></img>
    )
}

export default NavbarDropdownIcon