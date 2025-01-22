import { Router } from "express"
import seasonController from "../controllers/seasonController"
import episodeController from "../controllers/episodeController"

const router: Router = Router({ mergeParams: true })

router.get("/", seasonController.getAllSeasons)
router.get("/:id", seasonController.getSeasonById)
router.put("/:id", seasonController.updateSeason)
router.delete("/:id", seasonController.deleteSeason)

router.get("/:id/episodes", episodeController.getEpisodesBySeasonId)
router.post("/:id/episodes", episodeController.createEpisode)

export default router
