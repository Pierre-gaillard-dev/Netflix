import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import userController from "../controllers/user.controller"

const router: Router = Router()

router.get("/", authMiddleware, userController.getAllUsers)
router.get("/:id", authMiddleware, userController.getUserById)
router.get("/email/:email", userController.checkEmail)
router.put("/:id", authMiddleware, userController.UpdateUser)
router.delete("/:id", authMiddleware, userController.DeleteUser)

export default router
