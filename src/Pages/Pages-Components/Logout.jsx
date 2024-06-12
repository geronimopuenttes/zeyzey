import { useContext } from "react";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { AppContext } from "../../App";
import { useAuthState } from "react-firebase-hooks/auth";
import "../../Componentes/navbar.css";
import { useNavigate } from "react-router-dom";

export const HandleLogout = () => {
    const { setUserShow } = useContext(AppContext);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const signOff = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error.message);
        }
    };
    const loggOff = () => {
        signOff();
        navigate("/");
    };

    // Conditional rendering of the logout button
    return user && (
        <button onClick={loggOff} className="cerrarSesion">Cerrar Sesión</button>
    );
};
