import React, { useState, useEffect } from 'react';
import "./StringSelector.css";

export const StringSelector = ({ strings, maxPlantas, setFormSubmitted2, setCheckedStringsCount, checkedStringsCount, setCheckedItems, checkedItems, nombreVivero }) => {
    const [errorMessage, setErrorMessage] = useState("");

    // Function to handle checkbox change
    const handleCheckboxChange = (string) => {
        // Check if the string is already in the array
        if (checkedItems.includes(string)) {
            // If it is, remove it from the array
            setCheckedItems(checkedItems.filter(item => item !== string));
        } else {
            // If it's not, add it to the array
            setCheckedItems([...checkedItems, string]);
        }
    };

    // Function to count checked strings
    useEffect(() => {
        const checkedCount = checkedItems.length;
        setCheckedStringsCount(checkedCount); // Update the count of checked strings
    }, [checkedItems, setCheckedStringsCount]);

    const minPlantas = strings.length < Math.floor(maxPlantas / 2) ? 10 : Math.floor(maxPlantas / 2);
    const maxPlants = strings.length < maxPlantas ? strings.length : maxPlantas;

    const handleSubmit = async () => {
        try {
            if (strings.length < Math.floor(maxPlantas / 2)) {
                if (checkedStringsCount > maxPlantas || checkedStringsCount < strings.length) {
                    setErrorMessage("El número de plantas seleccionadas no cumple con los requisitos.");
                } else {
                    setFormSubmitted2(true);
                }
            } else {
                if (checkedStringsCount > maxPlantas || checkedStringsCount < Math.floor(maxPlantas / 2)) {
                    setErrorMessage("El número de plantas seleccionadas no cumple con los requisitos.");
                } else {
                    setFormSubmitted2(true);
                }
            }
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    };

    return (
        <div className='Strings'>
            <div className='Selector'>
                <h1 className='Titulo'>Selecciona las plantas</h1>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <h3 className='Tit'>Por favor selecciona un máximo de {maxPlants} y un mínimo de {minPlantas}</h3>
                <h3 className='Tit'>Cantidad de plantas seleccionadas: {checkedItems.length}</h3>
                <div className='Impresiones'>
                    {strings.map((string, index) => (
                        <div key={index} className='Fields'>
                            <input
                                type="checkbox"
                                id={string}
                                checked={checkedItems.includes(string)}
                                onChange={() => handleCheckboxChange(string)}
                            />
                            <label htmlFor={string} className='Letters'>{string}</label>
                        </div>
                    ))}
                </div>

                <button type='submit' onClick={handleSubmit} className='Boton'>Submit</button>
            </div>
        </div>
    );
};
