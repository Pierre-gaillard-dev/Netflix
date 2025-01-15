"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { EpisodeAttributes } from "../types/express"

interface EpisodeCreationAttributes extends Optional<EpisodeAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Episodes
		extends Model<EpisodeAttributes, EpisodeCreationAttributes>
		implements EpisodeAttributes
	{
		public id!: number
		public name!: string
		public image!: string
		public duration!: number
		public episodeNumber!: number
		public description!: string
		public releaseDate!: Date
		public season_id!: number
		public readonly createdAt?: Date
		public readonly updatedAt?: Date

		static associate(models: any) {
			Episodes.belongsTo(models.Seasons, {
				foreignKey: "season_id",
				as: "season",
			})

			Episodes.hasMany(models.Rating_Episodes, {
				foreignKey: "episode_id",
				as: "ratings",
			})
		}
	}
	Episodes.init(
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
			episodeNumber: {
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
			season_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Episodes",
			tableName: "Episodes",
			timestamps: false,
		}
	)
	return Episodes
}
