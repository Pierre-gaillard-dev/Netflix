import { Router } from "express"
import genreController from "../controllers/genreController"

const router: Router = Router()

router.get("/", genreController.getAllGenres)
router.get("/:id", genreController.getGenreById)
router.get("/:id/films", genreController.getGenreFilms)
router.post("/", genreController.CreateGenre)
router.put("/:id", genreController.updateGenre)
router.delete("/:id", genreController.deleteGenre)

export default router
