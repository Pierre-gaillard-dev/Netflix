import { Router } from "express"
import SearchController from "../controllers/Search.controller"

const router = Router()

router.get("/", SearchController.search)
router.get("/films", SearchController.searchFilms)
router.get("/series", SearchController.searchSeries)

export default router
