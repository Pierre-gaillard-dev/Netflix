"use strict"
import { QueryInterface, DataTypes } from "sequelize"
export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("Rating_Episodes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Users",
					key: "id",
				},
			},
			episode_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Episodes",
					key: "id",
				},
			},
			rating: {
				type: DataTypes.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		})
	},
	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable("Rating_Episodes")
	},
}
