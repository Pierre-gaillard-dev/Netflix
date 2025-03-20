"use strict"
import { Model, DataTypes, Sequelize, Optional } from "sequelize"
import bcrypt from "bcrypt"
import { UserAttributes } from "../types/express"

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export default (sequelize: Sequelize) => {
	class Users
		extends Model<UserAttributes, UserCreationAttributes>
		implements UserAttributes
	{
		public id!: number
		public name!: string
		public email!: string
		public password!: string
		public birthDate!: Date
		public role_id!: number
		public readonly createdAt?: Date
		public readonly updatedAt?: Date

		public async checkPassword(password: string): Promise<boolean> {
			return await bcrypt.compare(password, this.password)
		}

		static associate(models: any) {
			Users.belongsTo(models.Roles, {
				foreignKey: "role_id",
				as: "role",
			})

			Users.hasMany(models.Rating_Films, {
				foreignKey: "user_id",
				as: "rating_films",
			})
			Users.belongsToMany(models.Films, {
				through: "Rating_Films",
				foreignKey: "user_id",
				otherKey: "film_id",
				as: "rated_films",
			})

			Users.hasMany(models.Rating_Episodes, {
				foreignKey: "user_id",
				as: "rating_episodes",
			})

			Users.belongsToMany(models.Episodes, {
				through: "Rating_Episodes",
				foreignKey: "user_id",
				otherKey: "episode_id",
				as: "rated_episodes",
			})
		}
	}
	Users.init(
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
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			birthDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Users",
			tableName: "Users",
			timestamps: true,
		}
	)

	Users.beforeCreate(async (user) => {
		user.password = await bcrypt.hash(user.password, 10)
	})

	Users.beforeUpdate(async (user) => {
		if (user.changed("password")) {
			user.password = await bcrypt.hash(user.password, 10)
		}
	})

	return Users
}
