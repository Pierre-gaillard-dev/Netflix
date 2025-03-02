"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { Rating_EpisodesAttributes } from "../types/express"

interface Rating_EpisodesCreationAttributes
	extends Optional<Rating_EpisodesAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Rating_Episodes
		extends Model<
			Rating_EpisodesAttributes,
			Rating_EpisodesCreationAttributes
		>
		implements Rating_EpisodesAttributes
	{
		public id!: number
		public user_id!: number
		public episode_id!: number
		public rating!: number
		public readonly createdAt?: Date
		public readonly updatedAt?: Date
		static associate(models: any) {
			// define association here
		}
	}
	Rating_Episodes.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			episode_id: {
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
			modelName: "Rating_Episodes",
			tableName: "Rating_Episodes",
		}
	)
	return Rating_Episodes
}
