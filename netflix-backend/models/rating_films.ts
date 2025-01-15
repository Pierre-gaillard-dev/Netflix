"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { Rating_FilmsAttributes } from "../types/express"

interface Rating_FilmsCreationAttributes
	extends Optional<Rating_FilmsAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Rating_Films
		extends Model<Rating_FilmsAttributes, Rating_FilmsCreationAttributes>
		implements Rating_FilmsAttributes
	{
		public id!: number
		public user_id!: number
		public film_id!: number
		public rating!: number
		static associate(models: any) {
			// define association here
		}
	}
	Rating_Films.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			film_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Rating_Films",
			tableName: "rating_films",
		}
	)
	return Rating_Films
}
