//29)
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { crearVideojuego, getGeneros, getVideojuegos } from "../actions/index";
import NavBar from "./Navbar";
import { useNavigate} from 'react-router-dom'
import "../EstilosCss/Crear.css";



export default function Create() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // me traigo los generos
    const generos = useSelector((store) => store.generos);
    // los divido a la mitad
    const generos1 = generos.slice(0, 10)
    const generos2 = generos.slice(10, 20)
    // me traigo la info de todos los juegos
    const videojuegos = useSelector((store) =>store.videojuegos)
    let plataformas = []
    // mapeo los juegos para sacar las plataformas
       videojuegos?.map((v) =>{
                for(let j = 0;j<v.platforms[0].length;j++){
           if(v.platforms[j]){
plataformas.push(v.platforms[j])

           }}})    

//ACÁ ELIMINO A LAS PLATAFORMAS REPETIDAS
   plataformas = plataformas.filter(function(item, pos) {
    return plataformas.indexOf(item) == pos;    
})

// DIVIDO A LA MITAD LAS PLATAFORMAS PARA MOSTRARLAS
let plataformas1 = plataformas.slice(0,9)
let plataformas2 = plataformas.slice(9,18)

// defino un estado local j
    const [j, setJ] = useState({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
    });
    // al inicio solicito generos y videojuegos
    useEffect(() => {
        dispatch(getGeneros());
        dispatch(getVideojuegos())
    }, []); 

   
    // cada vez que se modifique el input, me modifica el estado
    // si es generos o plataformas
    const ChangeInput = (e) => {
        if (e.target.name === "genres" || e.target.name === "platforms") {
            // pongo en arr el target inicial
        const arr = j[e.target.name];
        // luego seteo el estado
        setJ({
            ...j, // copio lo que habia antes
            [e.target.name]: arr.concat(e.target.value), //y pongo lo que tenia antes mas el nuevo valor
        });
    } else {
        setJ({ // y sino es  generos y platforms, directamente pongo lo que escribo en el input
            ...j,
            [e.target.name]: e.target.value,
        });
    }
    };

    
// funcion que se activa al tocar el boton submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // en un objeto pongo lo que tengo en el estado inicial
        const obj = {
        name: j.name,
        description: j.description,
        image: j.image,
        released: j.released,
        rating: j.rating,
        genres: j.genres,
        platforms: j.platforms,
        };

        // 30) Validaciones
        if (!obj.name) {
            alert("Please write the name of the videogame!")
            return
        }
        if (!obj.description) {
            alert("Please write the description of the videogame!")
            return
        }if (!obj.released) {
            alert("Please enter a release date!")
            return
        }if (obj.rating > 5 || obj.rating < 0) {
            alert("The rating must be between 0 and 5!")
            return
        }

        //acá despacho la accion pasandole el obj como payload
        dispatch(crearVideojuego(obj));
        e.target.reset(); // reseteo todo los target
        alert("Videogame created!"); //aviso con una alerta que se creó el videojuego
        
        // limpio todo el estado j, para una nueva creación
        setJ({
            name: "",
            description: "",
            image: "",
            released: "",
            rating: "",
            genres: [],
            platforms: [],
        });
        
        navigate("/home");
        
    };

return (
    
    <div className="container">
        <div className="gg"><NavBar/></div>
        <form
            id="survey-form"
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div>
            <div>
                <div className = "titulo">
                    <h1>Create your Videogame!</h1>
                    </div>
                <div className="divTitles">
                    <div>
                        <label>Name:</label>
                        <input
                        className="label"
                        type="text"
                        name="name"
                        value={j.name}
                        placeholder="Name"
                        ></input>
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                        className="desc"
                        type="text"
                        name="description"
                        value={j.description}
                        placeholder="Description"
                        row="5"
                        ></textarea>
                    </div>
                    <div>
                        <label >Released Date:</label>
                        <input
                        className="label"
                        type="date"
                        name="released"
                        value={j.released}
                        ></input>
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input
                        className="label"
                        type="text"
                        name="rating"
                        value={j.rating}
                        placeholder="Rating (0 - 5)"
                        ></input>
                    </div>
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                    className="label"
                    type="text"
                    name="image"
                    value={j.image}
                    placeholder="Image URL"
                    ></input>
                </div>
            </div>
                
                <button className="button"  type="submit">
                    Create!
                </button>
                
                
            </div>
            
        </form>
                    {/* Checkbox de generos */}
                    <div  onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)} className="generos">
                        <label className="generostitulo">Genres</label>
                        <div className="gendivs">
                            <div>
                                {generos1.map((gen) => (
                                <div key={gen.name}>
                                    <input
                                    className="generos2"
                                    type="checkbox"
                                    name="genres"
                                    value={gen.name}
                                    ></input>
                                    <label name={gen}>{gen.name}</label>
                                </div>
                                ))}
                            </div>
                            <div>
                                {generos2.map((gen) => (
                                <div key={gen.name}>
                                    <input
                                    className="generos2"
                                    type="checkbox"
                                    name="genres"
                                    value={gen.name}
                                    ></input>
                                    <label name={gen}>{gen.name}</label>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                                    {/* Checkbox de plataformas */}
                        <div  onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}className="plataformas">
                        <label className="generostitulo">Platforms</label>
                        <div className="gendivs">
                            <div>
                                {plataformas1.map((p) => (
                                <div key={p}>
                                    <input
                                    className="plataformas2"
                                    type="checkbox"
                                    name="platforms"
                                    value={p}
                                    ></input>
                                    <label name={p}>{p}</label>
                                </div>
                                ))}
                            </div>
                            <div>
                                {plataformas2.map((p) => (
                                <div key={p}>
                                    <input
                                    className="plataformas2"
                                    type="checkbox"
                                    name="platforms"
                                    value={p}
                                    ></input>
                                    <label name={p}>{p}</label>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                
     </div>
);
}