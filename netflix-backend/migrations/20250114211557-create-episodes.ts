"use strict"
import { QueryInterface, DataTypes } from "sequelize"
export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("Episodes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				type: DataTypes.STRING,
			},
			image: {
				type: DataTypes.STRING,
			},
			episodeNumber: {
				type: DataTypes.INTEGER,
			},
			description: {
				type: DataTypes.STRING,
			},
			releaseDate: {
				type: DataTypes.DATE,
			},
			duration: {
				type: DataTypes.INTEGER,
			},
			season_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Seasons",
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
		await queryInterface.dropTable("Episodes")
	},
}
