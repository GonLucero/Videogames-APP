//1) Defino las entidades de la tabla videogame
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  sequelize.define('videogame', {// Defino la tabla videogame
    // id: sino pongo nada, sequelize me genera un id x defecto, que empieza en 1 y va sumando 1
    //en la API voy a tener id con numeros enteros también, el id de acá debe ser distinto, para no pisar
    // por eso genero un id de tipo UUID --> // otra forma es hashear, c/u lo hace a su conveniencia
    // Genera número random con letras y numeros, que va a ser único y especifico e irrepetible, datatype de sequelize
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,// En false: NO te permito que esté vacío este campo!
      primaryKey: true // va a ser la clave primaria
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT, // LE PONGO TEXT EN VEZ DE STRING, POR SI VA A SER MAS GRANDE
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY, // PONGO ASÍ XQ DE LA API ME DAN: "released": "2019-09-13"
    },
    rating: {
      type: DataTypes.DECIMAL, // A RATING ME LO DAN ASÍ: 3.25
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
