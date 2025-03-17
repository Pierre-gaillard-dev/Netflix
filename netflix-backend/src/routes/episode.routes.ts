import { Router } from "express"
import episodeController from "../controllers/episode.controller"

const router: Router = Router({ mergeParams: true })

router.get("/", episodeController.getEpisodesBySerieIdAndseasonNumber)
router.get(
	"/:episodeNumber",
	episodeController.getEpisodeBySerieIdAndseasonNumberAndEpisodeNumber
)

export default router
