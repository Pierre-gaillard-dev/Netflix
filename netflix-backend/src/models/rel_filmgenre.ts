"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { Rel_FilmGenreAttributes } from "../types/express"
import { GenreAttributes, FilmAttributes } from "../types/express"

interface Rel_FilmGenreCreationAttributes
	extends Optional<Rel_FilmGenreAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Rel_FilmGenre
		extends Model<Rel_FilmGenreAttributes, Rel_FilmGenreCreationAttributes>
		implements Rel_FilmGenreAttributes
	{
		public id!: number
		public genre_id!: number
		public film_id!: number
		public readonly createdAt?: Date
		public readonly updatedAt?: Date

		public genre?: GenreAttributes
		public film?: FilmAttributes
		static associate(models: any) {
			Rel_FilmGenre.belongsTo(models.Genres, {
				foreignKey: "genre_id",
				as: "genre",
			})
			Rel_FilmGenre.belongsTo(models.Films, {
				foreignKey: "film_id",
				as: "film",
			})
		}
	}
	Rel_FilmGenre.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			genre_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			film_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Rel_FilmGenre",
			tableName: "Rel_FilmGenre",
		}
	)
	return Rel_FilmGenre
}
