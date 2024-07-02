import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { useNavigate } from "react-router-dom";
import { db, auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { DefineOrder } from './DefineOrder';
import "./Vivero.css";
import { Delete } from './Delete';

export const Vivero = () => {
    const [eliminar, setEliminar] = useState(false);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const { whichVivero, setCheckedItems, checkedItems, cantidadFilas, setCantidadFilas, cantidadColumnas, setCantidadColumnas, cuadricula, setCuadricula } = useContext(AppContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user || !user.email || !whichVivero) {
                    console.log('User or Vivero ID is not available.');
                    return;
                }

                const docRef = doc(collection(db, user.email), whichVivero);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();

                    setCantidadColumnas(data.cantidadColumnas);
                    setCantidadFilas(data.cantidadFilas);

                    if (Array.isArray(data.checkedItems)) {
                        setCheckedItems(data.checkedItems);
                    } else {
                        console.log('checkedItems is not an array or does not exist.');
                    }
                } else {
                    console.log('No document found with the provided ID.');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        if (user && whichVivero) {
            fetchData();
        }
    }, [user, whichVivero, setCantidadColumnas, setCantidadFilas, setCheckedItems]);

    const eliminando = () => {
        if (!user || !user.email || !whichVivero) {
            console.log('User or Vivero ID is not available.');
            return;
        }
        setEliminar(true);
    };

    return (
        <div className='Vivero'>
            <div className="grid">
                <DefineOrder
                    cantidadColumnas={cantidadColumnas}
                    cantidadFilas={cantidadFilas}
                    checkedItems={checkedItems}
                    setCuadricula={setCuadricula}
                />
                <h1 className='Titulo'>{whichVivero}</h1>
                <div className='Cuadros'>
                    {cuadricula.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, cellIndex) => (
                                <div key={cellIndex} className="cell">
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={eliminando} className='Boton'>Eliminar Vivero</button>
                </div>
                {eliminar && <Delete whichVivero={whichVivero} setEliminar={setEliminar} />}
            </div>

        </div>
    );
};
