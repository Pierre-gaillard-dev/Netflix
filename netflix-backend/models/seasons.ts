"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { SeasonAttributes } from "../types/express"

interface SeasonCreationAttributes extends Optional<SeasonAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Seasons
		extends Model<SeasonCreationAttributes, SeasonAttributes>
		implements SeasonAttributes
	{
		public id!: number
		public name!: string
		public image!: string
		public seasonNumber!: number
		public description!: string
		public releaseDate!: Date
		public serie_id!: number
		public readonly createdAt?: Date
		public readonly updatedAt?: Date
		static associate(models: any) {
			Seasons.hasMany(models.Episodes, {
				foreignKey: "season_id",
				as: "episodes",
			})

			Seasons.belongsTo(models.Series, {
				foreignKey: "serie_id",
				as: "serie",
			})
		}
	}
	Seasons.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			seasonNumber: {
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
			serie_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Series",
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: "Seasons",
			tableName: "Seasons",
		}
	)
	return Seasons
}
