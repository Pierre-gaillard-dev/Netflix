import { Request, Response } from "express"
import db from "../models"
const Episode = db.models.Episodes

const episodeController = {
	async getAllEpisodes(req: Request, res: Response): Promise<void> {
		try {
			const episodes = await Episode.findAll()
			res.status(200).json(episodes)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching episodes" })
		}
	},
	async getEpisodesBySeasonId(req: Request, res: Response): Promise<void> {
		try {
			const season_id = req.params.id
			const season = await db.models.Seasons.findByPk(season_id)
			if (!season) {
				res.status(404).json({
					message: `Season not found`,
					detail: `The season with the id ${season_id} does not exist`,
				})
			}
			const episodes = await Episode.findAll({
				where: { season_id: season_id },
			})
			res.status(200).json(episodes)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching episodes" })
		}
	},
	async getEpisodeById(req: Request, res: Response): Promise<void> {
		try {
			const episode = await Episode.findByPk(req.params.id)
			if (episode) {
				res.status(200).json(episode)
			} else {
				res.status(404).json({ message: "Episode not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching episode" })
		}
	},
	async createEpisode(req: Request, res: Response): Promise<void> {
		try {
			const season_id = req.params.id
			const season = await db.models.Seasons.findByPk(season_id)
			if (!season) {
				res.status(404).json({
					message: `Season not found`,
					detail: `The season with the id ${season_id} does not exist`,
				})
			}

			const episode = await Episode.create({ ...req.body, season_id })
			res.status(201).json(episode)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error creating episode" })
		}
	},
	async updateEpisode(req: Request, res: Response): Promise<void> {
		try {
			const episode = await Episode.findByPk(req.params.id)
			if (episode) {
				await episode.update(req.body)
				res.status(200).json(episode)
			} else {
				res.status(404).json({ message: "Episode not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error updating episode" })
		}
	},
	async deleteEpisode(req: Request, res: Response): Promise<void> {
		try {
			const episode = await Episode.findByPk(req.params.id)
			if (episode) {
				await episode.destroy()
				res.status(200).json({ message: "Episode deleted" })
			} else {
				res.status(404).json({ message: "Episode not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error deleting episode" })
		}
	},
}

export default episodeController
