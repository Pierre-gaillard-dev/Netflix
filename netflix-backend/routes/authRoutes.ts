import express from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import authController from "../controllers/authContoller"

const router = express.Router()

router.get("/me", authMiddleware, authController.getMe)
router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/logout", authController.logout)

export default router
