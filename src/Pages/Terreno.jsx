import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import { AppContext } from "../App";
import { Notificaciones } from '../Componentes/Notificaciones';
import "./Terreno.css";
export const Terreno = () => {
    const [user] = useAuthState(auth);
    const { viveroAgua, viveroMan } = useContext(AppContext);

    return (
        <div className='Terreno'>
            <div className='Opciones'>
                <div className='Fields'>
                    <h1 className='Titulo'>Éste es tu terreno</h1>
                </div>
                <div className='opcionesViveros'>
                    <Link to="/viveros" className="link">Mis Viveros</Link>
                    <Link to="/crearvivero" className="link">Crear Nuevo Vivero</Link>
                </div>
                <div className='Not'>
                    {viveroAgua.length > 0 || viveroMan.length > 0 ? <Notificaciones /> : null}
                </div>
            </div>
        </div>
    );
};
