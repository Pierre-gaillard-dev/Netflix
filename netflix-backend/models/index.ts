import fs from "fs"
import path from "path"
import { Sequelize, DataTypes, Model } from "sequelize"
import process from "process"
import { Dialect } from "sequelize/types"
import { ExtendedModelStatic } from "../types/sequelize"

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || "development"
const config = require(path.resolve(__dirname, "../config/config.json"))[env]

interface DB {
	sequelize: Sequelize
	Sequelize: typeof Sequelize
	models: {
		[key: string]: ExtendedModelStatic<Model>
	}
}

const db: DB = {
	sequelize: null as unknown as Sequelize,
	Sequelize: Sequelize,
	models: {},
}

let sequelize: Sequelize
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable]!, config)
} else {
	if (!config.database || !config.username) {
		throw new Error(
			"Database configuration is incomplete. Please check config.json."
		)
	}

	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password || "",
		{
			...config,
			dialect: config.dialect as Dialect,
		}
	)
}

db.sequelize = sequelize

// init all models
fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".ts" &&
			file.indexOf(".test.ts") === -1
		)
	})
	.forEach(async (file) => {
		const model = require(path.join(__dirname, file)).default(sequelize)
		db.models[model.name] = model
		console.log("chargement du model", model.name)
	})

// Appelle la méthode `associate` sur chaque modèle s'il existe
Object.keys(db.models).forEach((modelName) => {
	const model = db.models[modelName]
	if (model.associate) {
		model.associate(db.models)
	}
})

export default db
console.log("db.models", db.models)
