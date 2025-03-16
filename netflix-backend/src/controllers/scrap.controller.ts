import { Request, Response } from "express"
import db from "../models"
import scrapGenres from "../utils/scrapping/genres.scrap"
import scrapFilms from "../utils/scrapping/films.scrap"
import scrapSeries from "../utils/scrapping/series.scrap"

const roles = db.models.Roles

const scrapController = {
	async scrap(req: Request, res: Response): Promise<void> {
		try {
			const role = await roles.findByPk(1)
			if (!role) {
				roles.create({ id: 1, name: "admin" })
			}
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}

		try {
			const start = parseInt(req.params.start) || 0
			const end = parseInt(req.params.end) || 10

			await scrapGenres()
			scrapFilms(start, end)
			res.status(200).json({ message: "Scraping started" })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},
	async scrapGenres(req: Request, res: Response): Promise<void> {
		try {
			await scrapGenres()
			res.status(200).json({ message: "Genres scraped" })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},
	async scrapFilms(req: Request, res: Response): Promise<void> {
		try {
			const start = parseInt(req.params.start) || 1
			const end = parseInt(req.params.end) || 10

			scrapFilms(start, end)
			res.status(200).json({ message: "Films scraped" })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},
	async scrapSeries(req: Request, res: Response): Promise<void> {
		try {
			const start = parseInt(req.params.start) || 0
			const end = parseInt(req.params.end) || 10

			scrapSeries(start, end)
			res.status(200).json({ message: "Series scraped" })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},
}

export default scrapController
