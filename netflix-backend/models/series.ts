"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { SeriesAttributes } from "../types/express"

interface SeriesCreationAttributes extends Optional<SeriesAttributes, "id"> {}

module.exports = (sequelize: Sequelize) => {
	class Series
		extends Model<SeriesAttributes, SeriesCreationAttributes>
		implements SeriesAttributes
	{
		public id!: number
		public name!: string
		public image!: string
		public description!: string
		public releaseDate!: Date
		public readonly createdAt?: Date
		public readonly updatedAt?: Date
		static associate(models: any) {
			Series.hasMany(models.Seasons, {
				foreignKey: "serie_id",
				as: "seasons",
			})

			Series.belongsToMany(models.Actors, {
				through: "Rel_ActorSeries",
				foreignKey: "serie_id",
				otherKey: "actor_id",
				as: "actors",
			})

			Series.belongsToMany(models.Genres, {
				through: "Rel_SeriesGenres",
				foreignKey: "serie_id",
				otherKey: "genre_id",
				as: "genres",
			})
		}
	}
	Series.init(
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
			modelName: "Series",
			tableName: "series",
		}
	)
	return Series
}
