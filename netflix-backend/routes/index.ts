import { Router } from "express"
import userRoutes from "./UserRoutes"
import roleRoutes from "./roleRoutes"
import filmRoutes from "./filmRoutes"
import seriesRoutes from "./serieRoutes"
import seasonRoutes from "./seasonRoutes"
import episodesRoutes from "./episodeRoutes"

const router: Router = Router({ mergeParams: true })

router.use("/users", userRoutes)
router.use("/roles", roleRoutes)
router.use("/films", filmRoutes)
router.use("/series", seriesRoutes)
router.use("/seasons", seasonRoutes)
router.use("/episodes", episodesRoutes)

export default router
