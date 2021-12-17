require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');// tengo que instalar la dependencia axios--> npm install axios en /api
//importo en el back--> axios
const { API_KEY } = process.env;
// importo los  modelos
const { Videogame, Genre } = require('../db');

const router = Router();

// los filtros de ordenamiento y filtrado lo hago en el front-end
// o sea: Paginado, filtro, sort
// traigo info en el back y dsp lo laburo en el Front-end

// 4)
//desarrollo un servidor en Node/Express con las siguientes rutas:



// Ahora voy a hacer la ruta del GET

// hago un mismo ruteo para /videogames y /videogames?name="..."---> (con query)

router.get('/videogames', async function (req, res) {
  const { name } = req.query; // busco si hay un name x queery --> /videogames?name=gon --> name = gon
  
  try {
    // let juegosApi = []
    // let apiRAWG = `https://api.rawg.io/api/games?key=${API_KEY}`
    // for (let index = 0; index < 5; index++) {
    //   let juegos = (await axios.get(apiRAWG)).data
    //   let dataJuego = juegos.results.map((g) => {
    //     var juego = {
    //       name: g.name,
    //       image: g.background_image,
    //       genres: g.genres.map((gen) => gen.name).filter(p => p != null).join(', '),
    //       source: "Api",
    //       id: g.id,
    //       rating: g.rating,
          
    //       platforms: g.platforms.map((plat) => plat.platform.name).filter(p => p != null),
         
    //     };
        
    //     return juego
    //   })
    //   apiRAWG = juegos.next;
    //   juegosApi = juegosApi.concat(dataJuego)
    // }

    // Acá llamo al endpoint de la API, Y ME TRAE TODA LA DATA QUE VOY A NECESITAR
    var promises = [
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    ]
    // retorno 100 videojuegos
    let juegosApi = await Promise.all(promises);
    juegosApi= juegosApi.map((v) => v.data.results)
    juegosApi= juegosApi.flat().map((g) =>{
      return{
        // devolveme solamente lo que yo necesito traerme desde el back para mi aplicacion
          name: g.name,
          image: g.background_image,
          genres: g.genres.map((gen) => gen.name).filter(p => p != null).join(', '),
          source: "Api", // la forma mas eficiente de distinguir info de la api/db
          id: g.id,
          rating: g.rating,
          platforms: g.platforms.map((plat) => plat.platform.name).filter(p => p !== null),
      }
    })
    
    if (name) { //En el caso de que haya un nombre que me pasen x query:
      let juegosDB = await Videogame.findOne({where: {name: name}, include: [Genre]});
      if (juegosDB){
          let j = juegosDB
          juegosDBFull = {
              id: j.id,
              name: j.name,
              image: j.image,
              rating: j.rating,
              source: "Created",
              genres: j.genres.map(p => p.name).join(', '),
          }
          // filtro name dentro de todos los juegos de la Api
          let nombrejuego = (juegosApi.filter( vg => vg.name.toLowerCase().includes(name))).slice(0,15)
   //concateno, toda la info de todas las paginas
        res.json(nombrejuego.concat(juegosDBFull))

      } else {
        
        let nombrejuego = (juegosApi.filter( vg => vg.name.toLowerCase().includes(name))).slice(0,15)
    
        res.json(nombrejuego)
      }
    } else { // en caso de que no haya un query
      
      // me traigo todos los juegos de la base de datos
      let dbJuegos = await Videogame.findAll({ include: [Genre] })// incluyo al modelo genero para que me haga la relacion
      let jsonJuegos = dbJuegos.map((j) => j.toJSON())
      jsonJuegos.forEach(C => {
        C.source = "Created", 
        C.genres = C.genres.map((genre) => genre.name).filter(p => p != null).join(', ')
      });
      dudu = juegosApi.concat(jsonJuegos)
    
      res.json(dudu)
    }
  } catch (err) {
    res.status(404).json({ err })
  }
});


// 5)

router.get('/videogame/:id', async function (req, res) {
    const { id } = req.params;

    try { 
        if (id.includes("-")) { // si hay un - significa que es un id de la base de datos
            const juegoDB = await Videogame.findOne({ where: {id},
                include: {model: Genre, attributes: ['name'],
                through: {attributes: []}}})
                let d = juegoDB
                const info = {
                    id: d.id,
                    name: d.name,
                    image: d.image,
                    rating: d.rating,
                    description: d.description,
                    released: d.released,
                    platforms: d.platforms,
                    createdAt: d.createdAt,
                    updateAt: d.updatedAt,
                    genres: d.genres.map(p => p.name).join(', ')
                }
                return res.json(info)
        } else {
            const juegoAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                    
                let a = juegoAPI.data;
                const info = {
                    name: a.name,
                    image: a.background_image,
                    genres: a.genres && a.genres.map((p) =>
                        p.name).filter(p => p != null).join(', '),
                    description: a.description_raw,
                    released: a.released,
                    rating: a.rating,
                    platforms: a.platforms && a.platforms.map((p) =>
                        p.platform.name).filter(p => p != null).join(', ')
                }
                return res.json(info)
        }
    } catch (err) {
        res.status(404).json({ error: "ID not found" })
    }
})

// 6)
// obtener todos los generos de la api
// llamo 1 vez a la api, y me traigo todo a la base de datos.
router.get('/genres', async function (req, res) {
    try{
        const generosAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`) // me traigo la info de la api
        generosAPI.data.results.forEach(p => {
            Genre.findOrCreate({ // entrá al modelo Genero, y si no está lo crea, y si está no genera nada
                where: { name: p.name }
            })
        })
        const generosDB = await Genre.findAll() //Como esta ruta me va a traer los generos
        res.json(generosDB) // devolveme todas los generos
    } catch (err) {
        res.status(404).json({ err })
    }
})

// 7)


router.post('/videogame', async (req, res) => {
  const { name, description, image, released, rating, platforms, genres } = req.body;
  //[playstation,xbox]
  let plataformastring = platforms.join(', ') //"playstation,xbox"
//creo un nuevo videojuego   
  let juegoCreado = await Videogame.create({
    name,
    description,
    image, 
    released,
    rating,
    platforms: plataformastring,
  })
  // el genero lo tengo que encontrar en el modelo, ya que tiene todos los generos
      // entonces: dentro de ese modelo busco todos los generos que coincida con lo que me llega x body  
// [rpg,action,arcade]
  genres.forEach(async (g) => {
      let generosJuego = await Genre.findOne({ where: { name: g } })
      await juegoCreado .addGenre(generosJuego)  //addGenre --> metodo de sequelize que me permite traerme de la tabla, lo que le paso --> generosJuego
  })
    res.send('Videojuego creado!')
});
  
  



module.exports = router;
