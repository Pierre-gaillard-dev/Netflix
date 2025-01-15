'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Films extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Films.hasMany(models.Rating_Films, {
        foreignKey: 'film_id',
        as: 'ratings'
      })

      Films.belongsToMany(models.Genres, {
        through: 'Rel_FilmGenres',
        foreignKey: 'film_id',
        otherKey: 'genre_id',
        as: 'genres'
      })

      Films.belongsToMany(models.Actors, {
        through: 'Rel_ActorFilm',
        foreignKey: 'film_id',
        otherKey: 'actor_id',
        as: 'actors'
      })
    }
  }
  Films.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    description: DataTypes.STRING,
    releaseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Films',
  });
  return Films;
};