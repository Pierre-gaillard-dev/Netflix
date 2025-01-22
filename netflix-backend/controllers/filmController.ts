import { Request, Response } from "express"
import db from "../models"
const Film = db.models.Films

const filmController = {
	async getAllFilms(req: Request, res: Response): Promise<void> {
		try {
			const films = await Film.findAll()
			res.status(200).json(films)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching films" })
		}
	},
	async getFilmById(req: Request, res: Response): Promise<void> {
		try {
			const film = await Film.findByPk(req.params.id)
			if (film) {
				res.status(200).json(film)
			} else {
				res.status(404).json({ message: "Film not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching film" })
		}
	},
	async createFilm(req: Request, res: Response): Promise<void> {
		try {
			const film = await Film.create(req.body)
			res.status(201).json(film)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error creating film" })
		}
	},
	async updateFilm(req: Request, res: Response): Promise<void> {
		try {
			const film = await Film.findByPk(req.params.id)
			if (film) {
				await film.update(req.body)
				res.status(200).json(film)
			} else {
				res.status(404).json({ message: "Film not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error updating film" })
		}
	},
	async deleteFilm(req: Request, res: Response): Promise<void> {
		try {
			const film = await Film.findByPk(req.params.id)
			if (film) {
				await film.destroy()
				res.status(200).json({ message: "Film deleted" })
			} else {
				res.status(404).json({ message: "Film not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error deleting film" })
		}
	},
}

export default filmController
