import { Navbar } from "../common/navbar";

export const HomeNav = () => {
    const navItems = [
        { name: "Inicio", route: "/" },
        { name: "Registro", route: "/register" },
        { name: "Soporte", route: "/support" }
    ];
    return <Navbar navItems={navItems} brand={"/"}/>;
}