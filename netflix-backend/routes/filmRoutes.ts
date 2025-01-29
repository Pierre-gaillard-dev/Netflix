import { Router } from "express"
import filmController from "../controllers/filmController"

const router: Router = Router()

router.get("/", filmController.getAllFilms)
router.get("/:id", filmController.getFilmById)
router.get("/:id/genres", filmController.getFilmGenres)
router.post("/", filmController.createFilm)
router.post("/:id/genres", filmController.addGenre)
router.put("/:id", filmController.updateFilm)
router.delete("/:id", filmController.deleteFilm)

export default router
