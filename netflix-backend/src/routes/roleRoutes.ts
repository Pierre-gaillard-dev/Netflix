import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleWare"
import roleController from "../controllers/roleController"

const router: Router = Router()

router.get("/", authMiddleware, roleController.getAllRoles)
router.get("/:id", authMiddleware, roleController.getRoleById)
router.post("/", authMiddleware, roleController.createRole)
router.put("/:id", authMiddleware, roleController.updateRole)
router.delete("/:id", authMiddleware, roleController.deleteRole)

export default router
