import React from 'react';
import { useState, useContext } from 'react';
import { FormComponent } from '../Componentes/FormComponent';
import { StringSelector, checkedStringsCount } from '../Componentes/StringSelector';
import { DisenarVivero } from '../Componentes/DisenarVivero';
import { AppContext } from '../App';
import "./CrearVivero.css";

const plantas = [
    ['Manzano', 'Naranjo', 'Limonero', 'Cerezo', 'Durazno', 'Ciruelo', 'Mango', 'Aguacate', 'Papayo', 'Mandarino', 'Almendro', 'Avellano', 'Níspero', 'Granado', 'Higuera', 'Cacao', 'Guayabo', 'Caqui', 'Litchi', 'Pera', 'Guanábana', 'Pomelo', 'Tamarindo', 'Anacardo', 'Maracuyá', 'Pera', 'Kiwi', 'Pitahaya', 'Uva', 'Membrillo', 'Carambola', 'Zapote', 'Mamey', 'Guayaba', 'Canela', 'Chirimoya', 'Noni', 'Tuna', 'Jackfruit', 'Longan', 'Macadamia', 'Dátil', 'Melocotón', 'Olivo', 'Feijoa', 'Mora', 'Frambuesa', 'Arándano', 'Grosella', 'Morera', 'Baya De Sauco', 'Ficus', 'Jujube', 'Nashi', 'Kiwiberry', 'Brevas'],
    ['Pino', 'Abeto', 'Cedro', 'Eucalipto', 'Ciprés', 'Secuoya', 'Fresno', 'Sauce', 'Álamo', 'Arce', 'Palma', 'Roble', 'Fresno', 'Álamo', 'Tilo', 'Árbol De Caucho', 'Árbol De Té', 'Acacia', 'Palo De Rosa', 'Ginkgo', 'Abedul', 'Tamarindo', 'Bambú'],
    ['Pimienta', 'Pimentón', 'Curry', 'Comino', 'Ajo', 'Cebolla', 'Canela', 'Jengibre En Polvo', 'Nuez Moscada', 'Clavo De Olor', 'Mostaza', 'Perejil', 'Cilantro', 'Albahaca', 'Romero', 'Tomillo', 'Orégano', 'Menta', 'Eneldo', 'Estragón', 'Salvia', 'Hinojo', 'Estragón', 'Laurel', 'Mejorana', 'Cebollino', 'Estragón', 'Ajedrea', 'Hierbabuena', 'Yuca', 'Curry', 'Cúrcuma'],
    ['Fresa', 'Frambuesa', 'Arándano', 'Morera', 'Grosella', 'Zarzamora', 'Carambola', 'Tuna', 'Kiwi', 'Anacardo', 'Maracuyá', 'Pitahaya', 'Litchi'],
    ['Garbanzo', 'Lenteja', 'Frijol', 'Guisante', 'Habichuela', 'Soya', 'Judía', 'Alubia', 'Chícharo', 'Fava', 'Pinto', 'Mungo', 'Azuki', 'Adzuki'],
    ['Papa', 'Yuca', 'Batata', 'Ñame', 'Boniato', 'Taro', 'Topinambur', 'Oca', 'Ulluco', 'Arracacha', 'Jícama', 'Malanga', 'Api'],
    ['Espinaca', 'Lechuga', 'Repollo', 'Zanahoria', 'Brócoli', 'Coliflor', 'Pepino', 'Apio', 'Pimiento', 'Chile', 'Tomate', 'Calabacín', 'Berenjena', 'Calabaza', 'Rábano', 'Remolacha', 'Maíz', 'Cebolla', 'Ajo', 'Judía', 'Guisante', 'Alcachofa', 'Espárrago', 'Guatila', 'Zucchini', 'Arveja'],
    ['Rosa', 'Tulipán', 'Girasol', 'Lirio', 'Margarita', 'Orquídea', 'Clavel', 'Hibisco', 'Azucena', 'Peonía', 'Narciso', 'Hortensia', 'Jacinto', 'Gladiolo', 'Geranio', 'Petunia', 'Pensamiento', 'Caléndula', 'Crisantemo', 'Dalia', 'Amapola', 'Aloe', 'Lavanda', 'Verbena', 'Lantana'],
    ['Helecho', 'Hiedra', 'Pothos', 'Ficus', 'Drácena', 'Costilla De Adan', 'Planta De Serpiente', 'Bambú De La Suerte', 'Palma De Interior', 'Potos', 'Croton', 'Schefflera', 'Filodendro', 'Crotón', 'Poto', 'Sansevieria', 'Cactus', 'Suculenta', 'Espatifilo', 'Aspidistra', 'Savila']
];

export const CrearVivero = () => {
    // State variables
    const [ancho, setAncho] = useState();
    const [largo, setLargo] = useState();
    const [nombreVivero, setNombreVivero] = useState("");
    const [strings, setStrings] = useState([]);
    const [granja, setGranja] = useState(false);
    const [vivero, setVivero] = useState(false);
    const [comestibles, setComestibles] = useState(false);
    const [noComestibles, setNoComestibles] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(true);
    const [formSubmitted2, setFormSubmitted2] = useState(false);
    const [checkedStringsCount, setCheckedStringsCount] = useState(0);
    const [maxPlantas, setMaxPlantas] = useState(0);
    const { setCheckedItems, checkedItems, cantidadFilas, setCantidadFilas, cantidadColumnas, setCantidadColumnas } = useContext(AppContext);

    let puerta = 0;

    const rowsCounter = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let remainingNumber = largo;
                let rowsCount = 0;
                let cincuentaOTreinta = 0;
                let filasConPlantas = 0;

                while (remainingNumber >= 30) {
                    if (cincuentaOTreinta === 0) {
                        cincuentaOTreinta++;
                        remainingNumber -= 30;
                        rowsCount++;
                        filasConPlantas++;
                    } else if (cincuentaOTreinta === 2) {
                        remainingNumber -= 30;
                        rowsCount++;
                        filasConPlantas++;
                        cincuentaOTreinta = 0;
                    } else {
                        remainingNumber -= 50;
                        rowsCount++;
                        cincuentaOTreinta++;
                    }
                }
                setCantidadFilas(rowsCount);
                setCantidadColumnas((ancho - puerta) / 30);
                cincuentaOTreinta = 0;
                const calculatedMaxPlantas = filasConPlantas * ((ancho - puerta) / 30);
                setMaxPlantas(Math.floor(calculatedMaxPlantas)); // Assuming you have a state for maxPlantas
                resolve(); // Resolve the promise when operations are completed
            }, 300); // Simulate a delay of 1 second
        });
    };


    const arrays = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let tempStrings = [];
                if (granja === true) {
                    if (comestibles === true) {
                        if (noComestibles === true) {
                            tempStrings = [...plantas];
                        } else {
                            tempStrings = [...plantas[0], ...plantas[2], ...plantas[3], ...plantas[4], ...plantas[5], ...plantas[6]];
                        }
                    } else if (noComestibles === true) {
                        tempStrings = [...plantas[1], ...plantas[7], ...plantas[8]];
                    }
                } else {
                    if (comestibles === true) {
                        if (noComestibles === true) {
                            tempStrings = [...plantas[2], ...plantas[3], ...plantas[4], ...plantas[5], ...plantas[6], ...plantas[7], ...plantas[8]];
                        } else {
                            tempStrings = [...plantas[2], ...plantas[3], ...plantas[4], ...plantas[5], ...plantas[6]];
                        }
                    } else if (noComestibles === true) {
                        tempStrings = [...plantas[7], ...plantas[8]];
                    }
                }
                setStrings(tempStrings);
                rowsCounter();
                resolve(); // Resolve the promise when operations are completed
            }, 200);
        });
    };


    return (
        <div className='Viveros'>
            <div className='Impresiones'>
                <div className='form' style={{ display: formSubmitted ? 'block' : 'none' }}>
                    <FormComponent
                        setFormSubmitted={setFormSubmitted}
                        setComestibles={setComestibles}
                        setNoComestibles={setNoComestibles}
                        setAncho={setAncho}
                        setLargo={setLargo}
                        setNombreVivero={setNombreVivero}
                        nombreVivero={nombreVivero}
                        granja={granja}
                        vivero={vivero}
                        setGranja={setGranja}
                        setVivero={setVivero}
                        comestibles={comestibles}
                        noComestibles={noComestibles}
                        arrays={arrays}
                    />
                </div>
                <div className='seleccionDePlantas' style={{ display: !formSubmitted && !formSubmitted2 ? 'block' : 'none' }}>
                    <StringSelector
                        strings={[].concat(...strings)}
                        maxPlantas={maxPlantas}
                        setFormSubmitted2={setFormSubmitted2}
                        setCheckedStringsCount={setCheckedStringsCount}
                        checkedStringsCount={checkedStringsCount}
                        checkedItems={checkedItems}
                        setCheckedItems={setCheckedItems}
                        nombreVivero={nombreVivero}
                    />
                </div>
                <div className='vivero' style={{ display: formSubmitted2 ? 'block' : 'none' }}>
                    <DisenarVivero
                        formSubmitted2={formSubmitted2}
                        nombreVivero={nombreVivero}
                        setNombreVivero={setNombreVivero}
                        cantidadColumnas={cantidadColumnas}
                        cantidadFilas={cantidadFilas}
                        checkedItems={checkedItems}
                    />
                </div>
            </div>
        </div>
    );
};
