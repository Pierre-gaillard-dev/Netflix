import { Request, Response } from "express"
import db from "../models"
const Role = db.models.Roles

const roleController = {
	async getAllRoles(req: Request, res: Response): Promise<void> {
		try {
			const roles = await Role.findAll()
			res.status(200).json(roles)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching roles" })
		}
	},
	async getRoleById(req: Request, res: Response): Promise<void> {
		try {
			const role = await Role.findByPk(req.params.id)
			if (role) {
				res.status(200).json(role)
			} else {
				res.status(404).json({ message: "Role not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching role" })
		}
	},
	async createRole(req: Request, res: Response): Promise<void> {
		try {
			const role = await Role.create(req.body)
			res.status(201).json(role)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error creating role" })
		}
	},
	async updateRole(req: Request, res: Response): Promise<void> {
		try {
			const role = await Role.findByPk(req.params.id)
			if (role) {
				await role.update(req.body)
				res.status(200).json(role)
			} else {
				res.status(404).json({ message: "Role not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error updating role" })
		}
	},
	async deleteRole(req: Request, res: Response): Promise<void> {
		try {
			const role = await Role.findByPk(req.params.id)
			if (role) {
				await role.destroy()
				res.status(200).json({ message: "Role deleted" })
			} else {
				res.status(404).json({ message: "Role not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error deleting role" })
		}
	},
}

export default roleController
