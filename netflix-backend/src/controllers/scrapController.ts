import { Request, Response } from "express"
import db from "../models"
import scrapGenres from "../utils/scrapping/genres.scrap"
import scrapFilms from "../utils/scrapping/films.scrap"

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
}

export default scrapController
