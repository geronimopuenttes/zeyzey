import React from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import "./FormComponent.css";

export const FormComponent = ({ setComestibles, nombreVivero, setNoComestibles, setAncho, setLargo, setVivero, setGranja, setNombreVivero, setFormSubmitted, granja, vivero, comestibles, noComestibles, arrays }) => {
    const [user] = useAuthState(auth);
    const collectionRef = collection(db, user.email);

    const handleSubmit = async (event) => {
        const documentId = nombreVivero;
        event.preventDefault();
        try {
            const docRef = doc(collectionRef, documentId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                alert('El nombre del vivero ya existe. Por favor, elige otro nombre.');
            } else {
                if (granja || vivero) {
                    if (comestibles || noComestibles) {
                        setFormSubmitted(false);
                    } else {
                        alert('Por favor selecciona una de las opciones entre Comestibles o noComestibles');
                    }
                } else {
                    alert('Por favor selecciona una de las opciones entre Granja o Vivero');
                }
            }
        } catch (error) {
            console.error('Error checking document existence:', error);
            alert('Ocurrió un error al verificar la existencia del documento. Por favor, inténtalo de nuevo.');
        }
    };

    const handleTipoDeVivero = (checkboxNumber) => {
        if (checkboxNumber === 1) {
            setGranja(true);
            setVivero(false);
        } else if (checkboxNumber === 2) {
            setGranja(false);
            setVivero(true);
        }
    };

    const definirComestibles = () => {
        setComestibles(!comestibles);
    };

    const definirNoComestibles = () => {
        setNoComestibles(!noComestibles);
    };

    return (
        <div className='Formulario'>
            <form onSubmit={handleSubmit} className='DivForm'>
                <div className='Fields'>
                    <h1 className='Titulo'>Diseñemos tu vivero</h1>
                </div>
                <div className='Seccion1'>
                    <h3 className='Tit'>Nombre para tu vivero</h3>
                    <input
                        placeholder='Nombre'
                        onChange={(e) => setNombreVivero(e.target.value)}
                        required
                        className='Field'
                    />
                </div>
                <div className='Seccion2'>
                    <h3 className='Tit'>Medidas en centimetros</h3>
                    <input
                        placeholder='Ancho'
                        onChange={(e) => setAncho(e.target.value)}
                        required
                        type="number"
                        className='Field'
                    />
                    <input
                        placeholder='Largo'
                        onChange={(e) => setLargo(e.target.value)}
                        required
                        type="number"
                        className='Field'
                    />
                </div>

                <div className='Seccion3'>
                    <div className='DivNotif'>
                        <h3 className='Tit'>¿Diseñarás granja o vivero?</h3>
                        <label className='Fields'>
                            <input
                                type="checkbox"
                                checked={granja}
                                onChange={() => handleTipoDeVivero(1)}
                            />
                            Granja
                        </label>
                        <label className='Fields'>
                            <input
                                type="checkbox"
                                checked={vivero}
                                onChange={() => handleTipoDeVivero(2)}
                            />
                            Vivero
                        </label>
                    </div>
                </div>
                <div className='Seccion4'>
                    <div className='DivNotif'>
                        <h3 className='Tit'>Escoge uno o mas tipos de plantas</h3>
                        <label className='Fields'>
                            <input
                                type="checkbox"
                                checked={comestibles}
                                onChange={definirComestibles}
                            />
                            Comestibles
                        </label>
                        <label className='Fields'>
                            <input
                                type="checkbox"
                                checked={noComestibles}
                                onChange={definirNoComestibles}
                            />
                            No Comestibles
                        </label>
                    </div>

                </div>
                <input type='submit' onClick={arrays} className='Boton' />
            </form>
        </div>
    );
};