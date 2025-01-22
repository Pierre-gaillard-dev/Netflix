"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { Rel_ActorFilmAttributes } from "../types/express"

interface Rel_ActorFilmCreationAttributes extends Rel_ActorFilmAttributes {}

class Rel_ActorFilm
	extends Model<Rel_ActorFilmAttributes, Rel_ActorFilmCreationAttributes>
	implements Rel_ActorFilmAttributes
{
	public id!: number
	public actor_id!: number
	public film_id!: number
	public readonly createdAt?: Date
	public readonly updatedAt?: Date
	static associate(models: any) {
		// define association here
	}
}

export default (sequelize: Sequelize) => {
	Rel_ActorFilm.init(
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
			film_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Rel_ActorFilm",
			tableName: "Rel_ActorFilm",
		}
	)
	return Rel_ActorFilm
}
