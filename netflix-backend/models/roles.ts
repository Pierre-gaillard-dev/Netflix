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
		static associate(models: any) {
			Roles.hasOne(models.Users, {
				foreignKey: "role_id",
				as: "user",
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
			tableName: "roles",
		}
	)
	return Roles
}
