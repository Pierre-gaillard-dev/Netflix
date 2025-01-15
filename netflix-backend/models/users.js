"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Users.belongsTo(models.Roles, {
				foreignKey: "role_id",
				as: "role",
			})

			Users.hasMany(models.Rating_Films, {
				foreignKey: "user_id",
				as: "rating_films",
			})
			Users.belongsToMany(models.Films, {
				through: "Rating_Films",
				foreignKey: "user_id",
				otherKey: "film_id",
				as: "rated_films",
			})

			Users.hasMany(models.Rating_Episodes, {
				foreignKey: "user_id",
				as: "rating_episodes",
			})

			Users.belongsToMany(models.Episodes, {
				through: "Rating_Episodes",
				foreignKey: "user_id",
				otherKey: "episode_id",
				as: "rated_episodes",
			})
		}
	}
	Users.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			birthDate: DataTypes.DATE,
			role_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Users",
		}
	)
	return Users
}
