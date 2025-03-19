import { Request, Response } from "express"
import { Op } from "sequelize"
import db from "../models"

const Film = db.models.Films
const Serie = db.models.Series
const Season = db.models.Seasons
const Episode = db.models.Episodes

const SearchController = {
	async search(req: Request, res: Response) {
		const { name } = req.query
		console.log(name)
		if (!name) {
			res.status(400).json({ error: "Query is required" })
			return
		}
		const films = await Film.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
		})
		const series = await Serie.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
			include: "seasons",
			order: [["seasons", "seasonNumber", "ASC"]],
		})
		const seasons = await Season.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
			include: "episodes",
			order: [["episodes", "episodeNumber", "ASC"]],
		})
		const episodes = await Episode.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
		})
		res.status(200).json({ films, series, seasons, episodes })
	},
	async searchFilms(req: Request, res: Response) {
		const { name } = req.query
		if (!name) {
			res.status(400).json({ error: "Query is required" })
			return
		}
		const films = await Film.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
		})
		res.status(200).json(films)
	},
	async searchSeries(req: Request, res: Response) {
		const { name } = req.query
		if (!name) {
			res.status(400).json({ error: "Query is required" })
			return
		}
		const series = await Serie.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
			include: "seasons",
			order: [["seasons", "seasonNumber", "ASC"]],
		})
		res.status(200).json(series)
	},
}

export default SearchController
