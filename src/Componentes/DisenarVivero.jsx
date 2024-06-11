import './Vivero.css';
import React, { useContext, useEffect, useState } from 'react';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DefineOrder } from './DefineOrder';
import { AppContext } from '../App';

export const DisenarVivero = ({ cantidadColumnas, cantidadFilas, checkedItems, formSubmitted2, nombreVivero }) => {
    const [user] = useAuthState(auth);
    const { cuadricula, setCuadricula } = useContext(AppContext);
    const today = new Date();


    useEffect(() => {
        const createCollection = async () => {
            try {
                if (!user) {
                    console.error('User not authenticated');
                    return;
                }

                // Reference the collection using the user's email
                const collectionRef = collection(db, user.email);

                // Specify your own document ID
                const documentId = nombreVivero;

                // Create the document data
                const documentData = {
                    cantidadColumnas: cantidadColumnas,
                    cantidadFilas: cantidadFilas,
                    checkedItems: checkedItems,
                    FechaMantenimiento: today,
                    FechaAgua: today,
                };

                // Add a document to the collection with the specified document ID and data
                await setDoc(doc(collectionRef, documentId), documentData);
            } catch (error) {
                console.error('Error adding document: ', error);
                throw error; // Rethrow the error to handle it in the handleSubmit function
            }
        };

        if (cuadricula.length > 0 && user && formSubmitted2) { // Execute only when formSubmitted2 is true
            createCollection();
        }

    }, [cantidadColumnas, cantidadFilas, checkedItems, cuadricula, user, formSubmitted2]);

    return (
        <div className="grid">
            <DefineOrder
                cantidadColumnas={cantidadColumnas}
                cantidadFilas={cantidadFilas}
                checkedItems={checkedItems}
                setCuadricula={setCuadricula}
            />
            <h1 className='Titulo'>{nombreVivero}</h1>
            {cuadricula.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className="cell">
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
