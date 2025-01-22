import { Router } from "express"
import filmController from "../controllers/filmController"

const router: Router = Router()

router.get("/", filmController.getAllFilms)
router.get("/:id", filmController.getFilmById)
router.post("/", filmController.createFilm)
router.put("/:id", filmController.updateFilm)
router.delete("/:id", filmController.deleteFilm)

export default router
