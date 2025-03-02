import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import seriesController from "../controllers/seriesController"
import seasonController from "../controllers/seasonController"

const router: Router = Router()

router.get("/", authMiddleware, seriesController.getAllSeries)
router.get("/:id", authMiddleware, seriesController.getSeriesById)
router.post("/", authMiddleware, seriesController.createSeries)
router.put("/:id", authMiddleware, seriesController.updateSeries)
router.delete("/:id", authMiddleware, seriesController.deleteSeries)

router.get("/:id/seasons", authMiddleware, seasonController.getSeasonsBySerieId)
router.post("/:id/seasons", authMiddleware, seasonController.createSeason)

export default router
