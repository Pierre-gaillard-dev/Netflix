import express from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import authController from "../controllers/auth.controller"

const router = express.Router()

router.get("/me", authMiddleware, authController.getMe)
router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.put("/password", authMiddleware, authController.updatePassword)

export default router
