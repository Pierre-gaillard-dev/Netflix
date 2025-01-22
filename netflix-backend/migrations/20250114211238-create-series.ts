"use strict"
import { QueryInterface, DataTypes } from "sequelize"
export default {
	async up(queryInterface: QueryInterface, Sequelize: any) {
		await queryInterface.createTable("Series", {
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
			description: {
				type: DataTypes.STRING,
			},
			releaseDate: {
				type: DataTypes.DATE,
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
		await queryInterface.dropTable("Series")
	},
}
