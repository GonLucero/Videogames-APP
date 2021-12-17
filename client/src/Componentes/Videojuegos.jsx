// 16)
import React from "react";
import Carta from "../Componentes/Carta";
import "../EstilosCss/Videojuegos.css"

export default function Videojuegos({videojuegos}) {
  return (
    <div className="showing">
      {videojuegos.length > 0 ? // si hay videojuegos para mostrar en pantalla
      videojuegos.map((data) => (<Carta data={data} />)) // mapeo la info y renderizo Carta
      : <div>
      <img className="loading" src="https://www.alpha-editorial.com/images/loading.gif" alt="Link caido"/>
  </div>
      }
    </div>
  );
};

