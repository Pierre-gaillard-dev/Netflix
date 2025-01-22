"use strict"
import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { RoleAttributes } from "../types/express"

interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Roles
		extends Model<RoleAttributes, RoleCreationAttributes>
		implements RoleAttributes
	{
		public id!: number
		public name!: string
		public readonly createdAt?: Date
		public readonly updatedAt?: Date
		static associate(models: any) {
			Roles.hasOne(models.Users, {
				foreignKey: "role_id",
				as: "users",
			})
		}
	}
	Roles.init(
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
		},
		{
			sequelize,
			modelName: "Roles",
			tableName: "Roles",
		}
	)
	return Roles
}
