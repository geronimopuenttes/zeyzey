import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppContext } from '../App';
import { useNavigate } from "react-router-dom";
import { Notificaciones } from '../Componentes/Notificaciones';
import "./Viveros.css";

export const Viveros = () => {
    const { setSelectedVivero, setWhichVivero, viveroAgua, viveroMan } = useContext(AppContext);
    const [documentIds, setDocumentIds] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return;
        }

        const collectionRef = collection(db, user.email);

        const fetchDocumentIds = async () => {
            try {
                const querySnapshot = await getDocs(collectionRef);
                const ids = [];
                querySnapshot.forEach((doc) => {
                    ids.push(doc.id);
                });
                setDocumentIds(ids);
            } catch (error) {
                console.error('Error fetching document IDs:', error);
            }
        };

        fetchDocumentIds();
    }, [user]);

    const showVivero = async (id) => {
        setWhichVivero(id);
        setSelectedVivero(true);
        navigate("/vivero");
    };

    return (
        <div className='Viveros'>
            <div className='OpcionesViveros'>
                <div className='Fields'>
                    <h1 className='Titulo'>Tus Viveros</h1>
                </div>
                <ul className='Fields'>
                    {documentIds.map((id, index) => (
                        <div key={index} className='Fields'>
                            <button onClick={() => showVivero(id)} className='Boton'>{id}</button>
                        </div>
                    ))}
                </ul>
                {viveroAgua.length > 0 || viveroMan.length > 0 ? <Notificaciones /> : null}
            </div>
        </div>
    );
};
