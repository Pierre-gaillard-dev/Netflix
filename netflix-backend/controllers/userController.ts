import { Request, Response } from "express"
import db from "../models"
const User = db.models.Users

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
	async CreateUser(req: Request, res: Response): Promise<void> {
		try {
			const user = await User.create(req.body)
			res.status(201).json(user)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error creating user" })
		}
	},
	async UpdateUser(req: Request, res: Response): Promise<void> {
		try {
			const user = await User.findByPk(req.params.id)
			if (user) {
				await user.update(req.body)
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
}

export default userController
