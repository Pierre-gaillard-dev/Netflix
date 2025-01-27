import express from "express"
import dotenv from "dotenv"
import db from "./models"
import routes from "./routes"
import sequelize from "./config/sequelize"
import cors from "cors"

dotenv.config()

const allowedOrigins = [
	"http://localhost:5173",
	"http://127.0.0.1:5173",
	"https://netflix.pierre-gaillard.mds-vannes.yt",
]

const CorsOptions: cors.CorsOptions = {
	origin: (origin: string | undefined, callback: Function) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true)
		} else {
			callback(new Error("Not allowed by CORS"))
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
}

const app = express()
const PORT = process.env.PORT || 3000

sequelize.sync({ force: true }).then(() => {
	console.log("Database synced successfully!")
})

/* Middlewares */
app.use(express.json())
app.use("/api", routes)
app.use(cors(CorsOptions))

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
