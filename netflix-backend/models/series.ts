import { Model, Sequelize, DataTypes, Optional } from "sequelize"
import { SeriesAttributes } from "../types/express"

// Interface pour la création des séries
interface SeriesCreationAttributes extends Optional<SeriesAttributes, "id"> {}

class Series
	extends Model<SeriesAttributes, SeriesCreationAttributes>
	implements SeriesAttributes
{
	public id!: number
	public name!: string
	public image!: string
	public description!: string
	public releaseDate!: Date
	public readonly createdAt?: Date
	public readonly updatedAt?: Date

	static associate(models: any) {
		Series.hasMany(models.Seasons, {
			foreignKey: "serie_id",
			as: "seasons",
		})

		Series.belongsToMany(models.Actors, {
			through: "Rel_ActorSeries",
			foreignKey: "serie_id",
			otherKey: "actor_id",
			as: "serie_actors",
		})

		Series.belongsToMany(models.Genres, {
			through: "Rel_SeriesGenres",
			foreignKey: "serie_id",
			otherKey: "genre_id",
			as: "serie_genres",
		})
	}
}

// Initialisation du modèle avec Sequelize
export default (sequelize: Sequelize) => {
	Series.init(
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
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			releaseDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize, // Passer l'instance de sequelize ici
			modelName: "Series",
			tableName: "Series",
		}
	)

	return Series // Retourner le modèle correctement
}
