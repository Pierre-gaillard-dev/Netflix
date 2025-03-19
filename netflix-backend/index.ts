import express from "express"
import dotenv from "dotenv"
import db from "./src/models"
import routes from "./src/routes"
import sequelize from "./src/config/sequelize"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()

console.log("ceci est une erreur")

const allowedOrigins = [
	"http://localhost:5173",
	"http://192.168.1.19:5173",
	"http://10.71.129.39:5173",
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

sequelize.sync({ alter: true }).then(() => {
	console.log("Database synced successfully!")
})

/* Middlewares */
app.use(express.json())
app.use(cors(CorsOptions))
app.use(cookieParser())
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
