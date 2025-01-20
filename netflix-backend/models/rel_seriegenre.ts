"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { Rel_SerieGenreAttributes } from "../types/express"

interface Rel_SerieGenreCreationAttributes
	extends Optional<Rel_SerieGenreAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Rel_SerieGenre
		extends Model<
			Rel_SerieGenreAttributes,
			Rel_SerieGenreCreationAttributes
		>
		implements Rel_SerieGenreAttributes
	{
		public id!: number
		public genre_id!: number
		public serie_id!: number
		static associate(models: any) {
			// define association here
		}
	}
	Rel_SerieGenre.init(
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
			serie_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Rel_SerieGenre",
			tableName: "Rel_SerieGenre",
		}
	)
	return Rel_SerieGenre
}
