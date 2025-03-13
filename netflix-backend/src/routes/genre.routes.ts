import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import genreController from "../controllers/genre.controller"

const router: Router = Router()

router.get("/", authMiddleware, genreController.getAllGenres)
router.get("/films", authMiddleware, genreController.getFilmGenres)
router.get("/series", authMiddleware, genreController.getSerieGenres)
router.get("/:id", authMiddleware, genreController.getGenreById)
router.get("/:id/films", authMiddleware, genreController.getGenreFilms)
router.get("/:id/series", authMiddleware, genreController.getGenreSeries)
router.post("/", authMiddleware, genreController.CreateGenre)
router.put("/:id", authMiddleware, genreController.updateGenre)
router.delete("/:id", authMiddleware, genreController.deleteGenre)

export default router
