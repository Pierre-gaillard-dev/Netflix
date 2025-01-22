import express from "express"
import dotenv from "dotenv"
import db from "./models"
import routes from "./routes"
import sequelize from "./config/sequelize"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

sequelize.sync({ force: true }).then(() => {
	console.log("Database synced successfully!")
})

/* Middlewares */
app.use(express.json())
app.use("/api", routes)

db.sequelize
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
