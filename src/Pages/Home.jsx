import React from 'react';
import "./Home.css"

export function Home() {
    return (
        <div className='paginaHome'>
            <div className='cuadroUno'>
                <div className='Contenido'>
                    <h1 className='Titulo'>¡Diseña tu propio vivero en casa!</h1>
                    <h2 className='Subtitulo'>¿Qué es la permacultura?</h2>
                    <p className='Text'>La permacultura es un enfoque sostenible en el diseño de sistemas agrícolas y comunidades humanas integradas con el entorno. Su enfoque se centra en la eficiencia de recursos y regeneración del suelo para lograr sistemas más equitativos y sostenibles.</p>
                </div>
                <div className='BotonDiv'><button className='Boton'>Crear Vivero</button></div>
            </div>
        </div>
    );
};
