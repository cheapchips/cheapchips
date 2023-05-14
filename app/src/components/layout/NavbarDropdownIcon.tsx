const NavbarDropdownIcon = () => {
    
    const dropdownIconStyles = {
        arrow: `w-4 h-4 ml-1.5 self-center fill-white`
    }

    return (
        <svg className={dropdownIconStyles.arrow} viewBox="0 0 512 298.04">
            <path d="M12.08 70.78c-16.17-16.24-16.09-42.54.15-58.7 16.25-16.17 42.54-16.09 58.71.15L256 197.76 441.06 12.23c16.17-16.24 42.46-16.32 58.71-.15 16.24 16.16 16.32 42.46.15 58.7L285.27 285.96c-16.24 16.17-42.54 16.09-58.7-.15L12.08 70.78z"/>
        </svg>
    )
}

export default NavbarDropdownIcon