const initialState = { //hago un estado inicial
  videojuegos: [],
  generos: [],
  buscarVideojuegoXId: [],
  videojuegosFiltrados: [],
  orden: "Select",
  filtrado: "All",
  buscarVideojuego: [],
  crearVideojuego: null,  
  buscarVideojuegoXNombre: [],
  
};

// 13)
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_VIDEOJUEGOS": // igual que el get de las actions
        return {
          ...state,// copio el estado anterior, para no modificarlo
          // acá le digo que en mi estado videojuegos, que inicialmente es un estado vacio:
          // se mandá todo lo que te mande la accion 
          videojuegos: action.payload,
        }
        //19)
        case "ORDEN_X_CREADO":
    return {
      ...state,
      videojuegosFiltrados: action.payload.videojuegos, // en videojuegos filtrado me traigo, los juegos segun el source
      filtrado: action.payload.source, // y en filtrado coloco el source utilizado
    };

    //22)
    case "ORDEN_ASC_NOMBRE":
        case "ORDEN_ASC_RATING":
        case "ORDEN_DESC_NOMBRE":
        case "ORDEN_DESC_RATING":
          return {
            ...state,
            videojuegosFiltrados: action.payload.videojuegosOrden, // entonces en videojuegos filtrados pongo, la info ordenada
            orden: action.payload.name, // en orden me guardo, la opcion seleccionada
          };

          //24)
          case "BUSCAR_VIDEOJUEGOS":
            return {
              ...state,
              buscarVideojuegoXNombre: action.payload, //en buscarvideojuegoxnombre meteme el action.payload
            };
            //27)
            case "CREAR_VIDEOGAME":
                return {
                  ...state,
                  crearVideojuego: action.payload, //en crearvideojuego meteme el action.payload
                };    
                //28)
                case "GET_GENEROS":
                    return {
                      ...state,
                      generos: action.payload, //en generos meteme el action.payload
                    };
                    //31)
                    case "GET_VIDEOJUEGO_X_ID":
                        return {
                          ...state,
                          buscarVideojuegoXId: action.payload,
                        };
                        //ESTOS LOS AGREGO PERO NO SE SI LOS USO:
                        case "RESET":
                            return {
                              ...state,
                              videojuegos: [],
                              videojuegosFiltrados: [],
                              orden: "Select",
                              filtrado: "All",
                            }
                            case "FILTRADO_X_GENERO":
                                return {
                                  ...state,
                                  videojuegosFiltrados: action.payload.videojuegoGenero,
                                  filtrado: action.payload.genero,
                                };
              
        default:
            return state;



    }
}
