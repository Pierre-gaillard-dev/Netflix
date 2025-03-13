import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import filmController from "../controllers/film.controller"

const router: Router = Router()

router.get("/", authMiddleware, filmController.getAllFilms)
router.get("/:id", authMiddleware, filmController.getFilmById)
router.get("/:id/genres", authMiddleware, filmController.getFilmGenres)
router.post("/", authMiddleware, filmController.createFilm)
router.post("/:id/genres", authMiddleware, filmController.addGenre)
router.put("/:id", authMiddleware, filmController.updateFilm)
router.delete("/:id", authMiddleware, filmController.deleteFilm)

export default router
