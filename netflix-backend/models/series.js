'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Series extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Series.hasMany(models.Seasons, {
        foreignKey: 'serie_id',
        as: 'seasons'
      })

      Series.belongsToMany(models.Actors, {
        through: 'Rel_ActorSeries',
        foreignKey: 'serie_id',
        otherKey: 'actor_id',
        as: 'actors'
      })

      Series.belongsToMany(models.Genres, {
        through: 'Rel_SeriesGenres',
        foreignKey: 'serie_id',
        otherKey: 'genre_id',
        as: 'genres'
      })
    }
  }
  Series.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    releaseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Series',
  });
  return Series;
};