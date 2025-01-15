'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Actors.belongsToMany(models.Series, {
        through: 'Rel_ActorSeries',
        foreignKey: 'actor_id',
        otherKey: 'serie_id',
        as: 'series'
      })

      Actors.belongsToMany(models.Films, {
        through: 'Rel_ActorFilms',
        foreignKey: 'actor_id',
        otherKey: 'film_id',
        as: 'films'
      })
    }
  }
  Actors.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Actors',
  });
  return Actors;
};