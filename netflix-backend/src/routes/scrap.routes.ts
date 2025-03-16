import { Router } from "express"
import scrapController from "../controllers/scrap.controller"

const router: Router = Router()

router.get("/genres", scrapController.scrapGenres)
router.get("/films", scrapController.scrapFilms)
router.get("/films/:end", scrapController.scrapFilms)
router.get("/films/:start/:end", scrapController.scrapFilms)
router.get("/series", scrapController.scrapSeries)
router.get("/series/:end", scrapController.scrapSeries)
router.get("/series/:start/:end", scrapController.scrapSeries)
router.get("/:start/:end", scrapController.scrap)

export default router
