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
		url: process.env.DB_FULL_URL_PROD,
		parameters: {
			dialect: "postgres",
			dialectOptions: {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
			},
		},
	},
} as Record<string, any>
