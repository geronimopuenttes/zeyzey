import React from 'react';
import "./Home.css"
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export function Home() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const handleClick = () => {
        user ? navigate("/crearvivero") : navigate("/inicio");
    }
    return (
        <div className='paginaHome'>
            <div className='cuadroUno'>
                <div className='Contenido'>
                    <h1 className='Titulo'>¡Zey Zey significa ser feliz!</h1>
                </div>
                <div className='BotonDiv'>
                    <div className='Contenido'>
                        <h3 className='Subtitulo'>Ser independiente y ser saludable te hara feliz</h3>
                        <h3 className='Subtitulo'>Construyamos tu vivero</h3>
                    </div>
                    <button className='Boton' onClick={handleClick}>Crear Vivero</button>
                </div>
            </div>
        </div>
    );
};
