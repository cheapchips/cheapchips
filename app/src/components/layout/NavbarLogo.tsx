import logo from "../../assets/logo.png"

const NavbarLogo = () => {

    const navbarLogoStyles = {
        container: `
        flex justify-center place-items-center w-10 h-10 rounded-full
        border
        border-lightBorder
        dark:border-darkBorder
        `,
        img: `p-1`,
    }

    return (
        <div className={navbarLogoStyles.container}>
            <img className={navbarLogoStyles.img} src={logo} alt="CheapChipsLogo" />
        </div>
    )
}

export default NavbarLogo