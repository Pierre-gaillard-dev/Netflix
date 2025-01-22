import { Router } from "express"
import episodeController from "../controllers/episodeController"

const router: Router = Router({ mergeParams: true })

router.get("/", episodeController.getAllEpisodes)
router.get("/:id", episodeController.getEpisodeById)
router.post("/:id", episodeController.createEpisode)
router.put("/:id", episodeController.updateEpisode)
router.delete("/:id", episodeController.deleteEpisode)

export default router
