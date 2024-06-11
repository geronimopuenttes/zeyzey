import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppContext } from '../App';

export const Pruebas = () => {
    const [user] = useAuthState(auth);
    const { dataFetched, setDataFetched, viveroAgua, setViveroAgua, viveroMan, setViveroMan } = useContext(AppContext);
    const [checkedAgua, setCheckedAgua] = useState({});
    const [checkedMan, setCheckedMan] = useState({});

    // Function to render checkboxes for viveroAgua
    const renderAguaCheckboxes = () => {
        return viveroAgua.map((vivero) => (
            <div key={vivero}>
                <input
                    type="checkbox"
                    id={`agua-${vivero}`}
                    name={vivero}
                    checked={checkedAgua[vivero] || false}
                    onChange={(e) => handleCheckboxChange(e, 'agua')}
                />
                <label htmlFor={`agua-${vivero}`}>{vivero}</label>
            </div>
        ));
    };

    // Function to render checkboxes for viveroMan
    const renderManCheckboxes = () => {
        return viveroMan.map((vivero) => (
            <div key={vivero}>
                <input
                    type="checkbox"
                    id={`man-${vivero}`}
                    name={vivero}
                    checked={checkedMan[vivero] || false}
                    onChange={(e) => handleCheckboxChange(e, 'man')}
                />
                <label htmlFor={`man-${vivero}`}>{vivero}</label>
            </div>
        ));
    };

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

    return (
        <div>
            <div>
                <h3>Debes regar estos viveros</h3>
                {renderAguaCheckboxes()}
                {viveroAgua.length > 0 ? <button onClick={handleSubmitAgua}>Submit</button> : null}
            </div>
            <div>
                <h3>Estos viveros necesitan mantenimiento</h3>
                {renderManCheckboxes()}
                {viveroMan.length > 0 ? <button onClick={handleSubmitMan}>Submit</button> : null}
            </div>
        </div>
    );
};
