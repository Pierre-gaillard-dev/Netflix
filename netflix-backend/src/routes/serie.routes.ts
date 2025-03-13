// express
import { Router } from "express"
// middleware
import authMiddleware from "../middlewares/authMiddleWare"
// controller
import seriesController from "../controllers/series.controller"
// routes
import seasonRoutes from "./season.routes"

const router: Router = Router()

router.get("/", authMiddleware, seriesController.getAllSeries)
router.get("/:id", authMiddleware, seriesController.getSeriesById)
router.post("/", authMiddleware, seriesController.createSeries)
router.put("/:id", authMiddleware, seriesController.updateSeries)
router.delete("/:id", authMiddleware, seriesController.deleteSeries)

router.use("/:serie_id/seasons", seasonRoutes)

export default router
