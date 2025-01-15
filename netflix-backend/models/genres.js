'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Genres.belongsToMany(models.Films, {
        through: 'Rel_FilmGenres',
        foreignKey: 'genre_id',
        otherKey: 'film_id',
        as: 'films'
      })
      
      Genres.belongsToMany(models.Films, {
        through: 'Rel_FilmGenres',
        foreignKey: 'genre_id',
        otherKey: 'film_id',
        as: 'films'
      })
    }
  }
  Genres.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genres',
  });
  return Genres;
};