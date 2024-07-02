import React from 'react';
import "./Vivero.css";
import { db, auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

export const Delete = ({ whichVivero, setEliminar }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const eliminarVivero = async () => {
        if (!user) {
            console.log('User is not authenticated');
            return;
        }

        try {
            const docRef = doc(collection(db, user.email), whichVivero);
            await deleteDoc(docRef);
            console.log(`Vivero with ID ${whichVivero} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting document:', error);
        }

        setEliminar(false);
        navigate("/viveros");
    };

    return (
        <div className="grid2">
            <div className='Delete'>
                <div className="Titulo">¿Estás seguro que deseas eliminar tu vivero?</div>
                <button className="Boton" onClick={eliminarVivero}>Si</button>
                <button className="Boton" onClick={() => setEliminar(false)}>No</button>
            </div>

        </div>
    );
};
