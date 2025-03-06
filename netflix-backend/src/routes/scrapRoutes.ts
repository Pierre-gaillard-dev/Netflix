import { Router } from "express"
import scrapController from "../controllers/scrapController"

const router: Router = Router()

router.get("/:start/:end", scrapController.scrap)

export default router
