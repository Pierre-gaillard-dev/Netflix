"use strict"
import { QueryInterface, DataTypes } from "sequelize"
module.exports = {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("Rating_Films", {
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
			film_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Films",
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
		await queryInterface.dropTable("Rating_Films")
	},
}
