import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import { HandleLogout } from "../Pages/Pages-Components/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import "./navbar.css";

export const Navbar = () => {
    const { currentUser } = useContext(AppContext);
    const [user] = useAuthState(auth);
    const location = useLocation();

    return (
        <div className="navbar">
            <div className="icon">
            </div>
            <div className="Contenedor">
                <h1 className="titulo">Bienvenido a Zey Zey</h1>
            </div>
            <div className="Contenedor">
                {location.pathname !== "/" && <Link to="/" className="link">Home</Link>}
                {!user ? <Link to="/inicio" className="link">Iniciar Sesion</Link> : null}
                {!user ? <Link to="/registro" className="link">Registrarme</Link> : null}
                {!user ? null : (location.pathname !== "/terreno" && <Link to="/terreno" className="link"> Mi Terreno</Link>)}
                {user ? (
                    <Link to="/perfil" className="perfil">
                        <h4 className="userName">@{currentUser}</h4>
                    </Link>
                ) : null}
                <HandleLogout />
            </div>
        </div>
    )
};
