import { Router } from "express"
import episodeController from "../controllers/episodeController"

const router: Router = Router({ mergeParams: true })

router.get("/", episodeController.getEpisodeBySeasonIdAndEpisodeNumber)
router.get(
	"/:episode_number",
	episodeController.getEpisodeBySerieIdAndseasonNumberAndEpisodeNumber
)

export default router
