const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUID4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    sumnary: {
      type: DataTypes.TEXT
    },
    score: {
      type: DataTypes.REAL
    },
    healthScore: {
      type: DataTypes.REAL,
    },
    instructions: {
      type: DataTypes.TEXT
    }
  });
};
