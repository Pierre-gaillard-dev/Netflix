"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { GenreAttributes } from "../types/express"

interface GenreCreationAttributes extends Optional<GenreAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Genres
		extends Model<GenreAttributes, GenreCreationAttributes>
		implements GenreAttributes
	{
		public id!: number
		public name!: string
		public image!: string
		public description!: string
		static associate(models: any) {
			Genres.belongsToMany(models.Films, {
				through: "Rel_FilmGenres",
				foreignKey: "genre_id",
				otherKey: "film_id",
				as: "genre_films",
			})

			Genres.belongsToMany(models.Series, {
				through: "Rel_SerieGenres",
				foreignKey: "genre_id",
				otherKey: "film_id",
				as: "genre_series",
			})
		}
	}
	Genres.init(
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
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Genres",
			tableName: "Genres",
		}
	)
	return Genres
}
