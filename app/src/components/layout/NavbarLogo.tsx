import logo from "../../assets/logo.png"

const NavbarLogo = () => {

    const navbarLogoStyles = {
        container: `
        flex justify-center place-items-center w-10
        `,
        img: `p-1.5 w-fit`,
    }

    return (
        <div className={navbarLogoStyles.container}>
            <img className={navbarLogoStyles.img} src={logo} alt="CheapChipsLogo" />
        </div>
    )
}

export default NavbarLogo