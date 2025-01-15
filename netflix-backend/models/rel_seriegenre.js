'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rel_SerieGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rel_SerieGenre.init({
    genre_id: DataTypes.INTEGER,
    serie_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rel_SerieGenre',
  });
  return Rel_SerieGenre;
};