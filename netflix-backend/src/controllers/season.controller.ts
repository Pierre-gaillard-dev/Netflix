import { Request, Response } from "express"
import db from "../models"
const Season = db.models.Seasons

const seasonController = {
	async getAllSeasons(req: Request, res: Response): Promise<void> {
		try {
			const seasons = await Season.findAll({ include: "episodes" })
			res.status(200).json(seasons)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching seasons" })
		}
	},
	async getSeasonsBySerieId(req: Request, res: Response): Promise<void> {
		try {
			const serie_id = req.params.serie_id
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
				include: "episodes",
				order: [
					["seasonNumber", "ASC"],
					["episodes", "episodeNumber", "ASC"],
				],
			})
			res.status(200).json(seasons)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching seasons" })
		}
	},
	async getSeasonsBySerieIdAndSeasonNumber(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			// Check if the serie exists
			const serie_id = req.params.serie_id
			const serie = await db.models.Series.findByPk(serie_id)
			if (!serie) {
				res.status(404).json({
					message: `Serie not found`,
					detail: `The serie with the id ${serie_id} does not exist`,
				})
				return
			}
			// check if the season exists
			const seasonNumber = req.params.season_number
			const season = await Season.findOne({
				where: { serie_id, seasonNumber },
				include: "episodes",
				order: [["episodes", "episodeNumber", "ASC"]],
			})
			if (season) {
				res.status(200).json(season)
			} else {
				res.status(404).json({ message: "Season not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching seasons" })
		}
	},
	async getSeasonById(req: Request, res: Response): Promise<void> {
		try {
			const season = await Season.findByPk(req.params.id, {
				include: "episodes",
				order: [["episodes", "episodeNumber", "ASC"]],
			})
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
			// Check if the serie exists
			const serie_id = req.params.id
			const serie = await db.models.Series.findByPk(serie_id)
			if (!serie) {
				res.status(404).json({
					message: `Serie not found`,
					detail: `The serie with the id ${serie_id} does not exist`,
				})
				return
			}

			// sets the season number
			let seasonNumber: number = req.body.seasonNumber
			if (!seasonNumber) {
				const seasons = await Season.findAll({
					where: { serie_id: serie_id },
				})
				seasonNumber = seasons.length + 1
			}

			// Check if the season already exists
			const existingSeason = await Season.findOne({
				where: { serie_id, seasonNumber },
			})
			if (existingSeason) {
				res.status(409).json({
					message: `Conflict`,
					detail: `The season number ${seasonNumber} already exists for the serie with the id ${serie_id}`,
				})
				return
			}

			const season = await Season.create({
				...req.body,
				serie_id,
				seasonNumber,
			})
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
