import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./IniciarSesion.css";

export const IniciarSesion = () => {
    // State variables
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    useEffect(() => {
        // If user is already logged in, redirect to another page
        if (user) {
            navigate("/terreno");
        }
    }, [user, navigate]);

    // Function to handle user login
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            navigate("/terreno");
        } catch (error) {
            console.log(error.message);
        }
    };
    const registrarme = () => {
        navigate("/registro");
    }

    return (
        <div className="Iniciar" >
            <div className="IniciarSesion">
                <div className="Titulo">
                    <h1 className="Titulo">Iniciar Sesión</h1>
                </div>
                <div className="Fields">
                    <input className="Field"
                        placeholder="Email"
                        value={loginEmail}
                        onChange={(event) => setLoginEmail(event.target.value)}
                    />
                    <input className="Field"
                        placeholder="Contraseña"
                        type="password"
                        value={loginPassword}
                        onChange={(event) => setLoginPassword(event.target.value)}
                    />
                    <button onClick={handleLogin} className="Boton">Iniciar Sesión</button>
                </div>
                <div className="Fields">
                    <h3 className="Titulo">No tengo cuenta</h3>
                    <button onClick={registrarme} className="Boton">Registrarme</button>
                </div>
            </div >
        </div >
    );
};
