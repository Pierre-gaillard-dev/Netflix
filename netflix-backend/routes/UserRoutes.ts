import { Router } from "express"
import userController from "../controllers/userController"

const router: Router = Router()

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.post("/", userController.CreateUser)
router.put("/:id", userController.UpdateUser)
router.delete("/:id", userController.DeleteUser)

export default router
