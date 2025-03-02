import { Sequelize } from "sequelize"
import dotenv from "dotenv"
import config from "./config"

dotenv.config()
let sequelize: Sequelize

const thisConfig = config[process.env.NODE_ENV || "development"]

if (config[process.env.NODE_ENV || "development"].url) {
	sequelize = new Sequelize(thisConfig.url, thisConfig.parameters)
} else {
	sequelize = new Sequelize(
		thisConfig.database,
		thisConfig.username,
		thisConfig.password,
		thisConfig.parameters
	)
}

export default sequelize

/*
import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const url = process.env.DB_HOST_PROD
  ?.replace("[DB_NAME]", process.env.DB_NAME || "")
  .replace("[DB_USER]", process.env.DB_USER || "")
  .replace("[DB_PASSWORD]", process.env.DB_PASSWORD || "")
  .replace("[DB_HOST]", process.env.DB_HOST || "")
  .replace("[element]", process.env.element || "")

const sequelize =
	process.env.NODE_ENV == "dev"
		? new Sequelize(
				process.env.DB_NAME || "netflix",
				process.env.DB_USER || "postgres",
				process.env.DB_PASSWORD || "password",
				{
					host: process.env.DB_HOST || "localhost",
					dialect: "postgres",
					logging: false,
				}
		  )
		: new Sequelize(process.env.DB_HOST_PROD!, {
				dialect: "postgres",
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
				},
		  })
export default sequelize
*/
