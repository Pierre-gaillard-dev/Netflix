'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seasons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Seasons.hasMany(models.Episodes, {
        foreignKey: 'season_id',
        as: 'episodes'
      })

      Seasons.belongsTo(models.Series, {
        foreignKey: 'serie_id',
        as: 'serie'
      })
    }
  }
  Seasons.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    seasonNumber: DataTypes.INTEGER,
    description: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    serie_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Seasons',
  });
  return Seasons;
};