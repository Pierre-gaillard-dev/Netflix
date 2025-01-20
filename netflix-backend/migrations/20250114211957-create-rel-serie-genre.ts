"use strict"
import { QueryInterface, DataTypes } from "sequelize"
export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("Rel_SerieGenres", {
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
			serie_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Series",
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
		await queryInterface.dropTable("Rel_SerieGenres")
	},
}
