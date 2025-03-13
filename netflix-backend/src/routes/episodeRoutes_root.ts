import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import episodeController from "../controllers/episodeController"

const router: Router = Router({ mergeParams: true })

router.get("/", authMiddleware, episodeController.getAllEpisodes)
router.get("/:id", authMiddleware, episodeController.getEpisodeById)
router.post("/:id", authMiddleware, episodeController.createEpisode)
router.put("/:id", authMiddleware, episodeController.updateEpisode)
router.delete("/:id", authMiddleware, episodeController.deleteEpisode)

export default router
