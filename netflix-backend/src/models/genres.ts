"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { GenreAttributes } from "../types/express"
import { FilmAttributes } from "../types/express"

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
		public contentType!: "serie" | "film" | "both"

		public readonly createdAt?: Date
		public readonly updatedAt?: Date

		public films?: FilmAttributes[]
		static associate(models: any) {
			Genres.belongsToMany(models.Films, {
				through: "Rel_FilmGenre",
				foreignKey: "genre_id",
				otherKey: "film_id",
				as: "films",
			})

			Genres.belongsToMany(models.Series, {
				through: "Rel_SerieGenre",
				foreignKey: "genre_id",
				otherKey: "serie_id",
				as: "series",
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
				unique: true,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			contentType: {
				type: DataTypes.ENUM("serie", "film", "both"),
				allowNull: true,
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
