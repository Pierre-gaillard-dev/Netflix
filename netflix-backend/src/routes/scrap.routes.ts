import { Router } from "express"
import scrapController from "../controllers/scrap.controller"

const router: Router = Router()

router.get("/:start/:end", scrapController.scrap)

export default router
