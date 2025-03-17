import { Router } from "express"
import userRoutes from "./user.routes"
import authRoutes from "./auth.routes"
import roleRoutes from "./role.routes"
import filmRoutes from "./film.routes"
import seriesRoutes from "./serie.routes"
import seasonRoutes from "./root.season.routes"
import episodesRoutes from "./root.episode.routes"
import genreRoutes from "./genre.routes"
import scrapRoutes from "./scrap.routes"

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
