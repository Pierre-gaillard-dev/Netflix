import { Router } from "express"
import seriesController from "../controllers/seriesController"
import seasonController from "../controllers/seasonController"

const router: Router = Router()

router.get("/", seriesController.getAllSeries)
router.get("/:id", seriesController.getSeriesById)
router.post("/", seriesController.createSeries)
router.put("/:id", seriesController.updateSeries)
router.delete("/:id", seriesController.deleteSeries)

router.get("/:id/seasons", seasonController.getSeasonsBySerieId)
router.post("/:id/seasons", seasonController.createSeason)

export default router
