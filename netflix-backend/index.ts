import express from "express"
import dotenv from "dotenv"
import sequelize from "./config/sequelize"
import routes from "./routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

/* Middlewares */
app.use(express.json())
app.use("/api", routes)

sequelize
	.authenticate()
	.then(() => {
		console.log("Database connected successfully!")
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`)
		})
	})
	.catch((error) => {
		console.error("Database connection failed:", error)
	})
