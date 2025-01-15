'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rel_ActorSerie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rel_ActorSerie.init({
    actor_id: DataTypes.INTEGER,
    serie_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rel_ActorSerie',
  });
  return Rel_ActorSerie;
};