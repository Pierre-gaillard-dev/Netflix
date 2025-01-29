"use strict"
import { QueryInterface, DataTypes } from "sequelize"
module.exports = {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("Rel_FilmGenre", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			genre_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Genres",
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
		await queryInterface.dropTable("Rel_FilmGenre")
	},
}
