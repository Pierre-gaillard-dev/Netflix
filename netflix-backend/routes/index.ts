import { Router } from "express"
import userRoutes from "./UserRoutes"
import roleRoutes from "./roleRoutes"

const router: Router = Router()

router.use("/users", userRoutes)
router.use("/roles", roleRoutes)

export default router
