require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
//ACÁ ESTA TODA LA CONFIGURACIÓN DE LA DB


//ACÁ SE REALIZA LA CONEXIÓN
//CREO UNA DATABASE LLAMADA: videogames
// CONEXIÓN CON SEQUELIZE, SE CREA NUEVA INSTANCIA, CON LA CONEXION A POSTGRES
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// 3)
//La relación entre ambas entidades debe ser de muchos a muchos ya que un videojuego puede pertenecer a varios géneros en simultaneo 
//y, a su vez, un género puede contener múltiples videojuegos distintos.
// EJEMPLO: CS 1.6 ---> GÉNERO: Shooter/Action al mismo tiempo
// Pero también hay muchos juegos dentro del genero shooter o del género action.

//Hago la relacion de muchos a muchos, mediante la tabla intermedia:

// mi tabla Genero, tiene un genero que pertenece a muchos videojuegos:
Videogame.belongsToMany(Genre, {through: "videogame_genre"}) // creo videogame_genre, la tabla intermedia
// mi tabla videogame, tiene un videojuego que pertenece a muchos generos
Genre.belongsToMany(Videogame, {through: "videogame_genre"})

// la tabla videogame_genre tiene:
// genreId y videogameId que se relacionan

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
