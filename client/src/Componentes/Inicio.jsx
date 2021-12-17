// 11)  Creo mi componente de ingreso

import React from "react";
import { Link } from "react-router-dom";
import "../EstilosCss/Inicio.css"


export default function LandingPage() {

  return (
    <div class="background">
      <div class="title" >
        <h2>Welcome!</h2>
        <Link to="/home">
          <button type="submit">START</button>
        </Link>
        
        <h3>Developed by: Gonzalo Lucero</h3>
            
      </div>
      
    </div>
  );
}