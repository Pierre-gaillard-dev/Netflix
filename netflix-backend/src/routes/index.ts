import { Router } from "express"
import userRoutes from "./UserRoutes"
import authRoutes from "./authRoutes"
import roleRoutes from "./roleRoutes"
import filmRoutes from "./filmRoutes"
import seriesRoutes from "./serie.routes"
import seasonRoutes from "./seasonRoutes_root"
import episodesRoutes from "./episodeRoutes_root"
import genreRoutes from "./genreRoutes"
import scrapRoutes from "./scrapRoutes"

const router: Router = Router({ mergeParams: true })

router.get("/", (req, res) => {
	res.send("Welcome to Netflix API")
})

router.use("/users", userRoutes)
router.use("/auth", authRoutes)
router.use("/roles", roleRoutes)
router.use("/films", filmRoutes)
router.use("/series", seriesRoutes)
router.use("/seasons", seasonRoutes)
router.use("/episodes", episodesRoutes)
router.use("/genres", genreRoutes)
router.use("/scrap", scrapRoutes)

export default router
