'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rel_ActorFilm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rel_ActorFilm.init({
    actor_id: DataTypes.INTEGER,
    film_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rel_ActorFilm',
  });
  return Rel_ActorFilm;
};