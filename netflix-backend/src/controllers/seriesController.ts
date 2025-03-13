import { Request, Response } from "express"
import db from "../models"
const Series = db.models.Series

const seriesController = {
	async getAllSeries(req: Request, res: Response): Promise<void> {
		try {
			const series = await Series.findAll({ include: "seasons" })
			res.status(200).json(series)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching series" })
		}
	},
	async getSeriesById(req: Request, res: Response): Promise<void> {
		try {
			const series = await Series.findByPk(req.params.id, {
				include: "seasons",
			})
			if (series) {
				res.status(200).json(series)
			} else {
				res.status(404).json({ message: "Series not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error fetching series" })
		}
	},
	async createSeries(req: Request, res: Response): Promise<void> {
		try {
			const series = await Series.create(req.body)
			res.status(201).json(series)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error creating series" })
		}
	},
	async updateSeries(req: Request, res: Response): Promise<void> {
		try {
			const series = await Series.findByPk(req.params.id)
			if (series) {
				await series.update(req.body)
				res.status(200).json(series)
			} else {
				res.status(404).json({ message: "Series not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error updating series" })
		}
	},
	async deleteSeries(req: Request, res: Response): Promise<void> {
		try {
			const series = await Series.findByPk(req.params.id)
			if (series) {
				await series.destroy()
				res.status(200).json({ message: "Series deleted" })
			} else {
				res.status(404).json({ message: "Series not found" })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: "Error deleting series" })
		}
	},
}

export default seriesController
