import { Request, Response } from "express"
import db from "../models"
const Series = db.models.Series
const Seasons = db.models.Seasons
const Episodes = db.models.Episodes

const episodeController = {
	async getAllEpisodes(req: Request, res: Response): Promise<void> {
		try {
			const max = req.query.max ? parseInt(req.query.max as string) : 50
			if (max < 1) {
				res.status(400).json({ message: "Invalid value for max" })
				return
			}
			const episodes = await Episodes.findAll({
				limit: max,
			})
			res.status(200).json(episodes)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching episodes" })
		}
	},
	async getEpisodesBySeasonId(req: Request, res: Response): Promise<void> {
		try {
			// Check if the season exists
			const season_id = req.params.id
			const season = await Seasons.findByPk(season_id)
			if (!season) {
				res.status(404).json({
					message: `Season not found`,
					detail: `The season with the id ${season_id} does not exist`,
				})
			}

			const episodes = await Episodes.findAll({
				where: { season_id: season_id },
			})
			res.status(200).json(episodes)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching episodes" })
		}
	},
	async getEpisodesBySerieIdAndseasonNumber(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			// Check if the serie exists
			const serie_id = req.params.id
			const serie = await Series.findByPk(serie_id)
			if (!serie) {
				res.status(404).json({
					message: `Serie not found`,
					detail: `The serie with the id ${serie_id} does not exist`,
				})
				return
			}
			// check if the season exists
			const seasonNumber = req.params.season_number
			const season = (await Seasons.findOne({
				where: { serie_id, seasonNumber },
			})) as any
			if (!season) {
				res.status(404).json({
					message: `Season not found`,
					detail: `The season with the number ${seasonNumber} does not exist for the serie with the id ${serie_id}`,
				})
				return
			}
			const episodes = await Episodes.findAll({
				where: { season_id: season.id },
			})
			res.status(200).json(episodes)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching episodes" })
		}
	},
	async getEpisodeById(req: Request, res: Response): Promise<void> {
		try {
			const episode = await Episodes.findByPk(req.params.id)
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
	async getEpisodeBySeasonIdAndEpisodeNumber(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			// check if the season exists
			const season_id = req.params.id
			const season = await Seasons.findByPk(season_id)
			if (!season) {
				res.status(404).json({
					message: `Season not found`,
					detail: `The season with the id ${season_id} does not exist`,
				})
			}
			// check if the episode exists
			const episodeNumber = req.params.episodeNumber
			const episode = await Episodes.findOne({
				where: { season_id, episodeNumber },
			})
			if (episode) {
				res.status(200).json(episode)
			} else {
				res.status(404).json({ message: "Episode not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching episodes" })
		}
	},
	async getEpisodeBySerieIdAndseasonNumberAndEpisodeNumber(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			// Check if the serie exists
			const serie_id = req.params.id
			const serie = await Series.findByPk(serie_id)
			if (!serie) {
				res.status(404).json({
					message: `Serie not found`,
					detail: `The serie with the id ${serie_id} does not exist`,
				})
				return
			}
			// check if the season exists
			const seasonNumber = req.params.season_number
			const season = (await Seasons.findOne({
				where: { serie_id, seasonNumber },
			})) as any
			if (!season) {
				res.status(404).json({
					message: `Season not found`,
					detail: `The season with the number ${seasonNumber} does not exist for the serie with the id ${serie_id}`,
				})
				return
			}
			// check if the episode exists
			const episodeNumber = req.params.episodeNumber
			const episode = await Episodes.findOne({
				where: { season_id: season.id, episodeNumber },
			})
			if (episode) {
				res.status(200).json(episode)
			} else {
				res.status(404).json({ message: "Episode not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching episodes" })
		}
	},
	async createEpisode(req: Request, res: Response): Promise<void> {
		try {
			// check if the season exists
			const season_id = req.params.id
			const season = await Seasons.findByPk(season_id)
			if (!season) {
				res.status(404).json({
					message: `Season not found`,
					detail: `The season with the id ${season_id} does not exist`,
				})
				return
			}

			// get the episode number
			let episodeNumber = req.body.episodeNumber
			if (!episodeNumber) {
				const episodes = await Episodes.findAll({
					where: { season_id },
				})
				episodeNumber = episodes.length + 1
			}

			// check if the episode exists
			const existing_episode = await Episodes.findOne({
				where: { season_id, episodeNumber },
			})
			if (existing_episode) {
				res.status(409).json({
					message: `Episode already exists`,
					detail: `The episode with the number ${episodeNumber} already exists for the season with the id ${season_id}`,
				})
				return
			}

			const episode = await Episodes.create({
				...req.body,
				season_id,
				episodeNumber,
			})
			res.status(201).json(episode)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error creating episode" })
		}
	},
	async updateEpisode(req: Request, res: Response): Promise<void> {
		try {
			const episode = await Episodes.findByPk(req.params.id)
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
			const episode = await Episodes.findByPk(req.params.id)
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
