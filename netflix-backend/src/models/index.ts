import fs from "fs"
import path from "path"
import { Sequelize, Model } from "sequelize"
import { ExtendedModelStatic } from "../types/sequelize"
import sequelize from "../config/sequelize"

const basename = path.basename(__filename)

interface DB {
	sequelize: Sequelize
	Sequelize: typeof Sequelize
	models: {
		[key: string]: ExtendedModelStatic<Model>
	}
}

const db: DB = {
	sequelize: sequelize,
	Sequelize: Sequelize,
	models: {},
}

// init all models
fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			(file.slice(-3) === ".ts" || file.slice(-3) === ".js") &&
			(file.indexOf(".test.ts") === -1 || file.indexOf(".test.js") === -1)
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
