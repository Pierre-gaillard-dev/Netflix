import { Request, Response } from "express"
import db from "../models"
import { FilmAttributes, GenreAttributes } from "../types/express"
const Film = db.models.Films
const Genre = db.models.Genres
const rel_film_genre = db.models.Rel_FilmGenre

const filmController = {
	async getAllFilms(req: Request, res: Response): Promise<void> {
		try {
			const max = req.query.max ? parseInt(req.query.max as string) : 50
			const films = await Film.findAll({
				include: ["genres"],
				limit: max,
			})
			res.status(200).json(films)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching films" })
		}
	},
	async getFilmById(req: Request, res: Response): Promise<void> {
		try {
			const film = await Film.findByPk(req.params.id, {
				include: ["genres"],
			})
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
	async getFilmGenres(req: Request, res: Response): Promise<void> {
		try {
			const filmId = req.params.id
			const film = await Film.findByPk(filmId)
			if (!film) {
				res.status(404).json({ message: "Film not found" })
				return
			}
			const genres = await rel_film_genre.findAll({
				where: { film_id: filmId },
				include: ["genre"],
			})
			res.status(200).json(genres)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching film genres" })
		}
	},
	async createFilm(req: Request, res: Response): Promise<void> {
		try {
			const film = await Film.create(req.body)
			res.status(201).json(film)
		} catch (error: any) {
			if (error.name === "SequelizeUniqueConstraintError") {
				res.status(409).json({ message: "Film already exists" })
				return
			}
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
	async addGenre(req: Request, res: Response): Promise<void> {
		try {
			const film = (await Film.findByPk(req.params.id, {
				include: ["genres"],
			})) as unknown as FilmAttributes
			if (!film) {
				res.status(404).json({ message: "Film not found" })
				return
			}

			const genre = (await Genre.findByPk(
				req.body.genreId
			)) as unknown as GenreAttributes
			if (!genre) {
				res.status(404).json({ message: "Genre not found" })
				return
			}

			if (film.genres!.find((g: any) => g.id === genre.id)) {
				res.status(409).json({ message: "Genre already added" })
				return
			}

			await rel_film_genre.create({
				film_id: film.id,
				genre_id: genre.id,
			})
			res.status(200).json({ message: "Genre added to film" })
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error adding genre to film" })
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
