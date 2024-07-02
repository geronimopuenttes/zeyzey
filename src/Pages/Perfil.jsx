import { useAuthState } from "react-firebase-hooks/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { useContext } from "react";
import { AppContext } from "../App";
import { auth } from "../firebase-config";
import { Notificaciones } from '../Componentes/Notificaciones';
import "./Perfil.css";

export const Perfil = () => {
    const [user] = useAuthState(auth);
    const { currentUser, viveroAgua, viveroMan } = useContext(AppContext);

    const handlePasswordReset = async () => {
        if (!user || !user.email) {
            console.error("No authenticated user found or user has no email.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, user.email);
            alert("Se envio un correo para el cambio de tu contraseña");
        } catch (error) {
            console.error("Error al cambiar contraseña", error);
            alert('Error al enviar email de cambio de contraseña');
        }
    };

    return (
        <div className="Perf">
            <div className="Perfil">
                <h1 className="Titulo">Hola @{currentUser}</h1>
                <button onClick={handlePasswordReset} className="Boton">Cambiar contraseña</button>
                <div className="Not">
                    {viveroAgua.length > 0 || viveroMan.length > 0 ? <Notificaciones /> : null}
                </div>
            </div>
        </div>
    );
};
