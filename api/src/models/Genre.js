// 2) Defino las entidades de la tabla genre
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('genre', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING
      }
    })
};