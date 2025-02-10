import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import seasonController from "../controllers/seasonController"
import episodeController from "../controllers/episodeController"

const router: Router = Router({ mergeParams: true })

router.get("/", authMiddleware, seasonController.getAllSeasons)
router.get("/:id", authMiddleware, seasonController.getSeasonById)
router.put("/:id", authMiddleware, seasonController.updateSeason)
router.delete("/:id", authMiddleware, seasonController.deleteSeason)

router.get(
	"/:id/episodes",
	authMiddleware,
	episodeController.getEpisodesBySeasonId
)
router.post("/:id/episodes", authMiddleware, episodeController.createEpisode)

export default router
