import { Router } from "express"
import genreController from "../controllers/genreController"

const router: Router = Router()

router.get("/", genreController.getAllGenres)
router.post("/", genreController.CreateGenre)
router.put("/:id", genreController.updateGenre)
router.delete("/:id", genreController.deleteGenre)

export default router
