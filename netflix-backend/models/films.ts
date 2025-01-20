"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { FilmAttributes } from "../types/express"

interface FilmCreationAttributes extends Optional<FilmAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Films
		extends Model<FilmAttributes, FilmCreationAttributes>
		implements FilmAttributes
	{
		public id!: number
		public name!: string
		public image!: string
		public duration!: number
		public description!: string
		public releaseDate!: Date
		public readonly createdAt?: Date
		public readonly updatedAt?: Date
		static associate(models: any) {
			Films.hasMany(models.Rating_Films, {
				foreignKey: "film_id",
				as: "film_ratings",
			})

			Films.belongsToMany(models.Genres, {
				through: "Rel_FilmGenres",
				foreignKey: "film_id",
				otherKey: "genre_id",
				as: "film_genres",
			})

			Films.belongsToMany(models.Actors, {
				through: "Rel_ActorFilm",
				foreignKey: "film_id",
				otherKey: "actor_id",
				as: "film_actors",
			})
		}
	}
	Films.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			releaseDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Films",
			tableName: "Films",
		}
	)
	return Films
}
