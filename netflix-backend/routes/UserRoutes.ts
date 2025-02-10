import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import userController from "../controllers/userController"

const router: Router = Router()

router.get("/", authMiddleware, userController.getAllUsers)
router.get("/:id", authMiddleware, userController.getUserById)
router.put("/:id", authMiddleware, userController.UpdateUser)
router.delete("/:id", authMiddleware, userController.DeleteUser)

export default router
