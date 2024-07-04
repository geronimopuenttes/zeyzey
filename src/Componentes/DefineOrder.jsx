import { set } from 'firebase/database';
import React, { useEffect } from 'react';

export const DefineOrder = ({ cantidadColumnas, cantidadFilas, checkedItems, setCuadricula, setCantidadPlantas }) => {
    useEffect(() => {
        const createGrid = () => {
            let counter = 0;
            let counter2 = 0;
            let cot = 0;
            const newCuadricula = [];
            for (let i = 0; i < cantidadFilas; i++) {
                const innerArray = [];
                if (cot === 0) {
                    for (let j = 0; j < cantidadColumnas; j++) {
                        innerArray.push(checkedItems[counter]);
                        counter2++;
                        setCantidadPlantas(counter2);
                        if (counter === checkedItems.length - 1) {
                            counter = 0;
                        } else {
                            counter++;
                        }
                    }
                    cot++;
                } else if (cot === 1) {
                    for (let j = 0; j < cantidadColumnas; j++) {
                        innerArray.push("Pasillo");
                    }
                    cot++;
                } else {
                    for (let j = 0; j < cantidadColumnas; j++) {
                        innerArray.push(checkedItems[counter]);
                        counter2++;
                        setCantidadPlantas(counter2);
                        if (counter === checkedItems.length - 1) {
                            counter = 0;
                        } else {
                            counter++;
                        }
                    }
                    cot = 0;
                }
                newCuadricula.push(innerArray);
            }
            console.log(counter2);
            return newCuadricula;
        };

        const applyGridAndDelay = async () => {
            const newCuadricula = createGrid();
            setCuadricula(newCuadricula);

            // Simulate a 300ms delay after setting the grid
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            await delay(300);
        };

        applyGridAndDelay();
    }, [cantidadColumnas, cantidadFilas, checkedItems, setCuadricula]);

    return null; // This component does not render anything
};


