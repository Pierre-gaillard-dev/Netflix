import { Router } from "express"
import roleController from "../controllers/roleController"

const router: Router = Router()

router.get("/", roleController.getAllRoles)
router.get("/:id", roleController.getRoleById)
router.post("/", roleController.createRole)
router.put("/:id", roleController.updateRole)
router.delete("/:id", roleController.deleteRole)

export default router
