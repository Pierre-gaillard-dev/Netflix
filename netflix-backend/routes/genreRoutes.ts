import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import genreController from "../controllers/genreController"

const router: Router = Router()

router.get("/", authMiddleware, genreController.getAllGenres)
router.get("/:id", authMiddleware, genreController.getGenreById)
router.get("/:id/films", authMiddleware, genreController.getGenreFilms)
router.post("/", authMiddleware, genreController.CreateGenre)
router.put("/:id", authMiddleware, genreController.updateGenre)
router.delete("/:id", authMiddleware, genreController.deleteGenre)

export default router
