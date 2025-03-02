import { Request, Response } from "express"
import db from "../models"
const Season = db.models.Seasons

const seasonController = {
	async getAllSeasons(req: Request, res: Response): Promise<void> {
		try {
			const seasons = await Season.findAll()
			res.status(200).json(seasons)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching seasons" })
		}
	},
	async getSeasonsBySerieId(req: Request, res: Response): Promise<void> {
		try {
			const serie_id = req.params.id
			const serie = await db.models.Series.findByPk(serie_id)
			if (!serie) {
				res.status(404).json({
					message: `Serie not found`,
					detail: `The serie with the id ${serie_id} does not exist`,
				})
				return
			}
			const seasons = await Season.findAll({
				where: { serie_id: serie_id },
			})
			res.status(200).json(seasons)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching seasons" })
		}
	},
	async getSeasonById(req: Request, res: Response): Promise<void> {
		try {
			const season = await Season.findByPk(req.params.id)
			if (season) {
				res.status(200).json(season)
			} else {
				res.status(404).json({ message: "Season not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching season" })
		}
	},
	async createSeason(req: Request, res: Response): Promise<void> {
		try {
			const serie_id = req.params.id
			const serie = await db.models.Series.findByPk(serie_id)
			if (!serie) {
				res.status(404).json({
					message: `Serie not found`,
					detail: `The serie with the id ${serie_id} does not exist`,
				})
				return
			}

			const season = await Season.create({ ...req.body, serie_id })
			res.status(201).json(season)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error creating season" })
		}
	},
	async updateSeason(req: Request, res: Response): Promise<void> {
		try {
			const season = await Season.findByPk(req.params.id)
			if (season) {
				await season.update(req.body)
				res.status(200).json(season)
			} else {
				res.status(404).json({ message: "Season not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error updating season" })
		}
	},
	async deleteSeason(req: Request, res: Response): Promise<void> {
		try {
			const season = await Season.findByPk(req.params.id)
			if (season) {
				await season.destroy()
				res.status(200).json({ message: "Season deleted" })
			} else {
				res.status(404).json({ message: "Season not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error deleting season" })
		}
	},
}

export default seasonController
