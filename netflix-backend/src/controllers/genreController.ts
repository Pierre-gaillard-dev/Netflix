import { Request, Response } from "express"
import { GenreAttributes } from "../types/express"
import db from "../models"
const Genres = db.models.Genres

const genreController = {
	getAllGenres: async (req: Request, res: Response) => {
		try {
			const genres = await Genres.findAll()
			res.status(200).json(genres)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error retrieving genres" })
		}
	},
	getGenreById: async (req: Request, res: Response) => {
		try {
			const genre = await Genres.findByPk(req.params.id)
			if (genre) {
				res.status(200).json(genre)
			} else {
				res.status(404).json({ message: "Genre not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching genre" })
		}
	},
	getGenreFilms: async (req: Request, res: Response) => {
		try {
			const max = req.query.max ? parseInt(req.query.max as string) : 50
			const genre = (await Genres.findByPk(req.params.id, {
				include: ["films"],
				limit: max,
			})) as unknown as GenreAttributes
			if (genre) {
				res.status(200).json(genre.films)
			} else {
				res.status(404).json({ message: "Genre not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching genre films" })
		}
	},
	CreateGenre: async (req: Request, res: Response) => {
		try {
			const genre = await Genres.create(req.body)
			res.status(201).json(genre)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error creating genre" })
		}
	},
	updateGenre: async (req: Request, res: Response) => {
		try {
			const genre = await Genres.findByPk(req.params.id)
			if (genre) {
				await genre.update(req.body)
				res.status(200).json(genre)
			} else {
				res.status(404).json({ message: "Genre not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error updating genre" })
		}
	},
	deleteGenre: async (req: Request, res: Response) => {
		try {
			const genre = await Genres.findByPk(req.params.id)
			if (genre) {
				await genre.destroy()
				res.status(200).json({ message: "Genre deleted" })
			} else {
				res.status(404).json({ message: "Genre not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error deleting genre" })
		}
	},
}

export default genreController
