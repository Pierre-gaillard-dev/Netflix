import { Request, Response } from "express"
import db from "../models"
const User = db.models.Users
import Jwt from "jsonwebtoken"

const userController = {
	async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const users = await User.findAll()
			res.status(200).json(users)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetchoing users" })
		}
	},
	async getUserById(req: Request, res: Response): Promise<void> {
		try {
			const user = await User.findByPk(req.params.id)
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({ message: "User not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching user" })
		}
	},
	async UpdateUser(req: Request, res: Response): Promise<void> {
		try {
			if (req.user!.id !== parseInt(req.params.id)) {
				res.status(403).json({ message: "Forbidden" })
				return
			}
			const user = await User.findByPk(req.params.id)
			if (user) {
				const { password, ...data } = req.body
				await user.update(data)
				res.status(200).json(user)
			} else {
				res.status(404).json({ message: "User not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error updating user" })
		}
	},
	async DeleteUser(req: Request, res: Response): Promise<void> {
		try {
			if (req.user!.id !== parseInt(req.params.id)) {
				res.status(403).json({ message: "Forbidden" })
				return
			}
			const user = await User.findByPk(req.params.id)
			if (user) {
				await user.destroy()
				res.status(200).json({ message: "User deleted" })
			} else {
				res.status(404).json({ message: "User not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error deleting user" })
		}
	},
	/**
	 * Check if email is already registered (200) or not (404)
	 * @param req
	 * @param res
	 */
	async checkEmail(req: Request, res: Response): Promise<void> {
		try {
			const user = await User.findOne({
				where: { email: req.params.email },
			})
			if (user) {
				res.status(200).json({ message: "Email already registered" })
			} else {
				res.status(404).json({ message: "Email not found" })
			}
		} catch (error) {
			res.status(500).json({ message: "Error checking email" })
		}
	},
}

export default userController
