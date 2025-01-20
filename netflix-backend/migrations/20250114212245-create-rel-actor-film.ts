"use strict"
import { QueryInterface, DataTypes } from "sequelize"
export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("Rel_ActorFilms", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			actor_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Actors",
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
		await queryInterface.dropTable("Rel_ActorFilms")
	},
}
