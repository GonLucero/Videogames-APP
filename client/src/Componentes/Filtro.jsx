// 18)
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGeneros, filtradoXGenero, ordenXCreado, ordenAsc, ordenDesc } from "../actions/index";
import "../EstilosCss/Filtro.css";
// me llega como prop una funcion paginado, que setea la numero de la pagina
export function Filter({paginado}) {
  const dispatch = useDispatch()
  const generos = useSelector((store) => store.generos); // me traigo todos los generos

  useEffect(() => {
    dispatch(getGeneros()); // apenas arrancar ejecuta la accion para traerme todos los generos
  }, []); 


  // Filtrado por genero
  const handleFilter = (e) => {
    dispatch(filtradoXGenero(e.target.value)) // despacho la funcion fitrado x genero donde le paso( el genero seleccionado)
    paginado(e, 1); // pongo para que me muestre la pagina 1
  };


  // Ordenado
  const handleOrder = (e) => {
    // si lo que me llega es un ordenado de ascendente
    if (e.target.value === "asc_nombre" || e.target.value === "asc_rating") {
      dispatch(ordenAsc(e.target.value)); //
    } else if (e.target.value === "desc_nombre" || e.target.value === "desc_rating") {
      dispatch(ordenDesc(e.target.value)); // acá e mando la opcion elegida
    } else {
      dispatch(filtradoXGenero(e.target.value));
    }
  };

  // Filtrado por API/DB
  const handleCreator = (e) => {
    if (e.target.value === "Api" || e.target.value === "Created") { // si cambio la opcion
      dispatch(ordenXCreado(e.target.value)); // voy a la accion y le paso lo seleccionado
      paginado(e, 1); // coloco la pagina en 1
    } else { // en el caso de ser all, me traigo todos los videojuegos
      dispatch(filtradoXGenero(e.target.value));
      paginado(e, 1); // coloco la pagina en 1
    }
    
  };

  return (
    <div className="filter">
         <div>
        <div>Filter by Genre</div>
        <select onChange={(e) => handleFilter(e)}>
          <option default>All</option>
          {generos.map((G) => (
            <option value={G.name}>{G.name}</option>
          ))}
        </select>
      </div>
      <div>
        <div>Filter by Source</div>
        <select onChange={(e) => handleCreator(e)} >
          <option default>All</option>
          <option value="Api">From API</option>
          <option value="Created">Created</option>
        </select>
      </div>
       <div>
        <div>Order</div>
        <select onChange={(e) => handleOrder(e)}>
          <option value="All" default>All</option>
          <option value="asc_nombre">(A-Z)</option>
          <option value="desc_nombre">(Z-A)</option>
          <option value="desc_rating">Rating  ⬆</option>
          <option value="asc_rating">Rating  ⬇</option>
       
        </select>
      </div>

   
     
     
    </div>
  );
}

export default Filter;