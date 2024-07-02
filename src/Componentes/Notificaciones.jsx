import React, { useState, useContext } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppContext } from '../App';
import "./Notificaciones.css";

export const Notificaciones = () => {
    const [user] = useAuthState(auth);
    const { viveroAgua, setViveroAgua, viveroMan, setViveroMan } = useContext(AppContext);
    const [checkedAgua, setCheckedAgua] = useState({});
    const [checkedMan, setCheckedMan] = useState({});

    const handleCheckboxChange = (e, type) => {
        const { name, checked } = e.target;
        if (type === 'agua') {
            setCheckedAgua((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else if (type === 'man') {
            setCheckedMan((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        }
    };

    const handleSubmitAgua = async () => {
        const today = new Date();
        const updatedViveroAgua = viveroAgua.filter(vivero => !checkedAgua[vivero]);
        for (const vivero in checkedAgua) {
            if (checkedAgua[vivero]) {
                try {
                    const docRef = doc(db, user.email, vivero);
                    await updateDoc(docRef, {
                        FechaAgua: today,
                    });
                } catch (error) {
                    console.error('Error updating document:', error);
                }
            }
        }
        setViveroAgua(updatedViveroAgua);
        setCheckedAgua({});
    };

    const handleSubmitMan = async () => {
        const today = new Date();
        const updatedViveroMan = viveroMan.filter(vivero => !checkedMan[vivero]);
        for (const vivero in checkedMan) {
            if (checkedMan[vivero]) {
                try {
                    const docRef = doc(db, user.email, vivero);
                    await updateDoc(docRef, {
                        FechaMantenimiento: today,
                    });
                } catch (error) {
                    console.error('Error updating document:', error);
                }
            }
        }
        setViveroMan(updatedViveroMan);
        setCheckedMan({});
    };

    const renderAguaCheckboxes = () => {
        return viveroAgua.map((vivero) => (
            <div className='DivNotif' key={vivero}>
                <div className='Agua'>
                    <input
                        type="checkbox"
                        id={`agua-${vivero}`}
                        name={vivero}
                        checked={checkedAgua[vivero] || false}
                        onChange={(e) => handleCheckboxChange(e, 'agua')}
                    />
                    <label
                        htmlFor={`agua-${vivero}`}
                        className={`Boton1 ${checkedAgua[vivero] ? 'selected' : ''}`}
                    >
                        {vivero}
                    </label>
                </div>
            </div>
        ));
    };

    const renderManCheckboxes = () => {
        return viveroMan.map((vivero) => (
            <div className='DivNotif' key={vivero}>
                <div className='Mantenimiento'>
                    <input
                        type="checkbox"
                        id={`man-${vivero}`}
                        name={vivero}
                        checked={checkedMan[vivero] || false}
                        onChange={(e) => handleCheckboxChange(e, 'man')}
                    />
                    <label
                        htmlFor={`man-${vivero}`}
                        className={`Boton1 ${checkedMan[vivero] ? 'selected' : ''}`}
                    >
                        {vivero}
                    </label>
                </div>
            </div>
        ));
    };

    return (
        <div className='DivNotif'>
            <div className='Notif'>
                <div className='Agua'>
                    <h3 className='Tit'>Debes regar estos viveros</h3>
                    {renderAguaCheckboxes()}
                    {viveroAgua.length > 0 ? <button onClick={handleSubmitAgua} className='Boton'>Submit</button> : null}
                </div>
                <div className='Mantenimiento'>
                    <h3 className='Tit'>Necesitan mantenimiento</h3>
                    {renderManCheckboxes()}
                    {viveroMan.length > 0 ? <button onClick={handleSubmitMan} className='Boton'>Submit</button> : null}
                </div>
            </div>
        </div>
    );
};
