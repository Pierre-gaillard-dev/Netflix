import dotenv from "dotenv"
dotenv.config()

export default {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		parameters: {
			host: process.env.DB_HOST || "localhost",
			dialect: "postgres",
			logging: false,
		},
	},
	production: {
		username: process.env.DB_USER_PROD,
		password: process.env.DB_PASSWORD_PROD,
		database: process.env.DB_NAME_PROD,
		parameters: {
			host: process.env.DB_HOST_PROD,
			dialect: "postgres",
			logging: false,
		},
	},
} as Record<string, any>
