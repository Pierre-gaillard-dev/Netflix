"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { Rel_ActorSeriesAttributes } from "../types/express"

interface Rel_ActorSeriesCreationAttributes
	extends Optional<Rel_ActorSeriesAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Rel_ActorSeries
		extends Model<
			Rel_ActorSeriesAttributes,
			Rel_ActorSeriesCreationAttributes
		>
		implements Rel_ActorSeriesAttributes
	{
		public id!: number
		public actor_id!: number
		public serie_id!: number
		public readonly createdAt?: Date
		public readonly updatedAt?: Date

		static associate(models: any) {
			// define association here
		}
	}
	Rel_ActorSeries.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			actor_id: {
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
			modelName: "Rel_ActorSeries",
			tableName: "Rel_ActorSeries",
		}
	)
	return Rel_ActorSeries
}
