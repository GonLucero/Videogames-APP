//25)

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { buscarVideojuegos } from "../actions/index";
import Videojuegos from "../Componentes/Videojuegos";
import { Paginacion } from "../Componentes/Paginado";
import "../EstilosCss/BarradeBusqueda.css";
import NavBar from "./Navbar";

export default function Search() {
  const dispatch = useDispatch();
  let { name } = useParams() // me traigo el nombre, que queda escrito en la url ->http://localhost:3000/results/name

  // en esta constate me guardo el estado, con la informacion de los resultados de la busqueda
  const buscarVideojuego = useSelector((state) => state.buscarVideojuegoXNombre);

  // cada vez que cambie el name, se va a despachar la accion de traerme la info con ese nombre
  useEffect(() => {
    dispatch(buscarVideojuegos(name));
  }, [name]); 
  
  // Paginacion
  function paginar(e, num) {
    e.preventDefault(); // para que no se actualice la pagina al activar el evento
    setPagina(num); // al activar paginar, se setea el estado con el numero de pagina
  }

  // creo un estado local pagina, inicialmente se encuentra en 1
  const [pagina, setPagina] = useState(1);
  // creo un estado local videojuegosXPag,
  const [videojuegosXPag] = useState(3); // acá seteo la cantidad de juegos a mostrar en la busqueda

  let ultimoJuegoXPag = pagina * videojuegosXPag; // el ultimo juego es la pagina x cantidad de juegos
  let primerJuegoXPag = ultimoJuegoXPag - videojuegosXPag; // el primer juego , empieza desde 0
  let juegosPaginaActual = buscarVideojuego.slice(primerJuegoXPag, ultimoJuegoXPag); // la info la corto con solo lo que voy a mostrar x pagina

  return (
    
    <div className="search">
      
        {buscarVideojuego.length > 0 ?  // si hay resultadosen la busqueda, renderizo:
        <>
        <div className="navbarrr"><NavBar/></div> 
          <h1>Search Results:</h1>
          <h2>{name}</h2> 
          {/* le paso la info de los juegos a mostrar en pantalla a videojuegos: */}
          < Videojuegos videojuegos={juegosPaginaActual} /> 
          <Paginacion
            videojuegosXPag={videojuegosXPag}
            totalVideojuegos={buscarVideojuego.length}
            paginado={paginar}
          />
        </>
        // Sino dejo el gif cargando
        :  <img className = "img2" src="https://www.alpha-editorial.com/images/loading.gif" alt="Link caido"/>
        }
    </div>
  )
};