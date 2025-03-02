"use strict"
import { Model, DataTypes, Sequelize, Optional } from "sequelize"
import { ActorAttributes } from "../types/express"

interface ActorCreationAttributes extends Optional<ActorAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Actors
		extends Model<ActorAttributes, ActorCreationAttributes>
		implements ActorAttributes
	{
		public id!: number
		public name!: string
		public image!: string
		public description!: string

		static associate(models: any) {
			Actors.belongsToMany(models.Series, {
				through: "Rel_ActorSeries",
				foreignKey: "actor_id",
				otherKey: "serie_id",
				as: "actor_series",
			})

			Actors.belongsToMany(models.Films, {
				through: "Rel_ActorFilms",
				foreignKey: "actor_id",
				otherKey: "film_id",
				as: "actor_films",
			})
		}
	}
	Actors.init(
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
			modelName: "Actors",
			tableName: "Actors",
		}
	)
	return Actors
}
