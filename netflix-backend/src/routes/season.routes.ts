import { Router } from "express"
import seasonController from "../controllers/season.controller"
import episodeRoutes from "./episode.routes"

const router: Router = Router({ mergeParams: true })

router.get("/", seasonController.getSeasonsBySerieId)
router.get(
	"/:season_number",
	seasonController.getSeasonsBySerieIdAndSeasonNumber
)
router.post("/", seasonController.createSeason)

router.use("/:season_number/episodes", episodeRoutes)

export default router
