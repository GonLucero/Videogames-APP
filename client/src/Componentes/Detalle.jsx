//32)
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideojuegoXId } from "../actions/index";
import "../EstilosCss/Detalle.css";
import NavBar from "./Navbar";

function GameDetail(props) {
  console.log(props)
  const dispatch = useDispatch();
  // me traigo la info del videojuego
  const videojuego = useSelector((store) => store.buscarVideojuegoXId);
  // me traigo la id, que queda escrita en la url
  const {id} = useParams();

  useEffect(() => {
    dispatch(getVideojuegoXId(id)); // apenas entre a la pagina, mandame la info
  }, []); 

  return (    
    
    
    <div className="containerr">
      {videojuego.image? // si me llego la informacion, renderizame todo
        <>
       <div><NavBar/></div>
      <div className="info">
      
     
        <div className="image">
        <div className="names"><p>{videojuego.name} <p className="genress">{videojuego.genres}</p></p>
        
          
        <div >
            <span className="ratingg">{videojuego.rating}</span>
              </div>
                </div>
                <div>

<h5 className="sub">Released Date: {videojuego.released} |  Platforms: {videojuego.platforms}</h5>
</div>
<div className="imgrating">
        {videojuego.image === null || !videojuego.image ?
              <img className = "img" src="https://www.alpha-editorial.com/images/loading.gif" alt="Link caido"/>
              : <img className="hola" src={videojuego.image} alt={videojuego.name} /> }
              <div className="text">
            <h2>Detail:</h2>
            <p>{videojuego.description}</p>
          </div>
        </div>
        </div>
       
      </div>
      </> // si todavia no llego pongo un loading
      : <img className = "img2" src="https://www.alpha-editorial.com/images/loading.gif" alt="Link caido"/>
    }
     
    </div>    
  );
}

export default GameDetail;