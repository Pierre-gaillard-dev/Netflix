import { Request, Response } from "express"
import Jwt from "jsonwebtoken"
import dotenv from "dotenv"
import db from "../models"
const User = db.models.Users as any

dotenv.config()

const generateToken = (user: any) => {
	return Jwt.sign(
		{ id: user.id, username: user.name },
		process.env.JWT_SECRET!,
		{
			expiresIn: "2h",
		}
	)
}

const authController = {
	async register(req: Request, res: Response): Promise<void> {
		try {
			const { email, password, name, birthDate } = req.body
			if (!email || !password || !name || !birthDate) {
				res.status(400).json({
					message: "Email, password, birthdate and name are required",
				})
			}

			const newUser = await User.create({
				email,
				password,
				name,
				birthDate,
				role_id: 1,
			})
			const token = generateToken(newUser)
			res.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
			})
			res.status(201).json({
				message: "User registered successfully",
				newUser,
			})
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error registering user" })
		}
	},

	async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body
			if (!email || !password) {
				res.status(400).json({
					message: "Email and password are required",
				})
			}

			const user = await User.findOne({ where: { email } })
			if (!user || !(await user.checkPassword(password))) {
				res.status(404).json({ message: "invalid email or password" })
			}

			const token = generateToken(user)

			res.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
			})

			res.status(200).json({
				message: "User logged in successfully",
			})
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error logging in user" })
		}
	},

	async logout(req: Request, res: Response): Promise<void> {
		try {
			res.clearCookie("token")
			res.status(200).json({ message: "User logged out successfully" })
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error logging out user" })
		}
	},
}

export default authController
