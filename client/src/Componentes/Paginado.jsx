//17)
import React from "react";

import "../EstilosCss/Paginado.css";

// videojuegosxpag = recibo la cantidad max de juegos a mostrar definido en cada ruta
// totalvideojuegos = recibo la info de los juegos, ya sea total, de la busqueda o filtrado
// paginado: es una funcion que setea el estado de la pagina, o sea para saber en que pagina estoy
export const Paginacion = ({ videojuegosXPag, totalVideojuegos, paginado }) => {
  const numerosdePagina = [];
  const numPaginas = Math.ceil(totalVideojuegos / videojuegosXPag) 
  // el numero de paginas queda definido por los juegos totales recibidos / los que voy a mostrar
// redondeo para arriba

// acá voy a pushear en un array numerosdePagina, la cantidad de numeros
  for (let i = 1; i <= numPaginas ; i++) {
    numerosdePagina.push(i);
  }

  return (
    
    <nav className="pagination">
     
     {/* Acá mapeo el array de numero de paginas */}
     {/* muestro la cantidad de numeros, y si toco alguno de esos botones, activo la funcion paginado */}
        {numerosdePagina.map((num) => (
          <div key={num} className="item">
            <button onClick={(e) => paginado(e, num)}>
              {num}
            </button>
          </div>
        ))}
    </nav>
  );
};