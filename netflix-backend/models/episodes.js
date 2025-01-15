'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Episodes.belongsTo(models.Seasons, {
        foreignKey: 'season_id',
        as: 'season'
      })

      Episodes.hasMany(models.Rating_Episodes, {
        foreignKey: 'episode_id',
        as: 'ratings'
      })
    }
  }
  Episodes.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    episodeNumber: DataTypes.INTEGER,
    description: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    season_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Episodes',
  });
  return Episodes;
};