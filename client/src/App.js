import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Inicio from './Componentes/Inicio';
import Principal from './Componentes/Principal';
import BarradeBusqueda from './Componentes/BarradeBusqueda';
import Detalle from './Componentes/Detalle';
import Crear from './Componentes/Crear';
//ACÁ ABAJO LO QUE HAGO ES RENDERIZAR LOS COMPONENTES SEGUN SU RUTA
//hago el ruteo

//10) envuelvo todo en browserRouter
function App() {
  return (
    <BrowserRouter>
    
    <div className="App">
      {/* Con el Routes envuelvo cada ruta, y se mueve solo entre esas rutas */}
    <Routes>
      <Route exact path="/" element={<Inicio/>} />
      <Route exact path="/home" element={<Principal/>} />   
      <Route exact path="/results/:name" element={<BarradeBusqueda/>} />
      <Route exact path="/videogames/:id" element={<Detalle/>}/>
      <Route path="/create" exact element={<Crear/>} />
      
    </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
