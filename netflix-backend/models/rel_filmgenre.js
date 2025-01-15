'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rel_FilmGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rel_FilmGenre.init({
    genre_id: DataTypes.INTEGER,
    film_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rel_FilmGenre',
  });
  return Rel_FilmGenre;
};