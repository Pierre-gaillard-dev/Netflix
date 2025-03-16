import db from "../../models"
import seasons from "../../models/seasons"
const Genres = db.models.Genres
const Series = db.models.Series
const Seasons = db.models.Seasons
const Episodes = db.models.Episodes
import {
	SerieAttributes,
	SeasonAttributes,
	EpisodeAttributes,
	GenreAttributes,
} from "../../types/express"

const addSerieToDB = async (serie: any) => {
	const formattedSerie = {
		name: serie.name,
		image: `https://image.tmdb.org/t/p/w500${serie.backdrop_path}`,
		description: serie.overview,
		releaseDate: new Date(serie.first_air_date),
	}

	const genres = serie.genres.map((g: any) => g.name)
	try {
		let new_serie
		// check if serie already exists
		const existingSerie = (await Series.findOne({
			where: { name: formattedSerie.name },
		})) as unknown as SerieAttributes
		if (existingSerie) {
			console.log(formattedSerie.name, "Serie already exists")
			new_serie = existingSerie
		} else {
			new_serie = (await Series.create(
				formattedSerie
			)) as unknown as SerieAttributes
			console.log(formattedSerie.name, "Serie added to DB")
		}

		serie.genres && addGenresToSerie(new_serie.id, genres)
		serie.seasons && addSeasonsToSerie(new_serie.id, serie.seasons)
		return new_serie.id
	} catch (error: any) {
		console.error(error)
	}
}

const addGenresToSerie = async (serieId: number, genres: string[]) => {
	genres.forEach(async (genre: string) => {
		const genreId = (
			(await Genres.findOne({
				where: { name: genre },
			})) as unknown as GenreAttributes
		)?.id
		if (!genreId) {
			console.log(genre, "Genre not found")
			return
		}
		const rel = await db.models.Rel_SerieGenre.findOne({
			where: { serie_id: serieId, genre_id: genreId },
		})
		if (!rel) {
			await db.models.Rel_SerieGenre.create({
				serie_id: serieId,
				genre_id: genreId,
			})
		}
	})
}

const addSeasonsToSerie = async (serie_id: number, seasons: any[]) => {
	const seasonsIds = await Promise.all(
		seasons.map(async (season) => {
			return await addSeasonToDB(season, serie_id)
		})
	)
	return seasonsIds
}

const addSeasonToDB = async (season: any, serie_id: number) => {
	const formattedSeason = {
		name: season.name,
		image: `https://image.tmdb.org/t/p/w500${season.poster_path}`,
		seasonNumber: season.season_number,
		description: season.overview,
		releaseDate: new Date(season.air_date),
		serie_id,
	}
	try {
		let new_season: SeasonAttributes
		// check if season already exists
		const existingSeason = (await Seasons.findOne({
			where: { name: formattedSeason.name, serie_id },
		})) as unknown as SeasonAttributes
		if (existingSeason) {
			new_season = existingSeason
			console.log(formattedSeason.name, "Season already exists")
		} else {
			new_season = (await Seasons.create(
				formattedSeason
			)) as unknown as SeasonAttributes
			console.log(formattedSeason.name, "Season added to DB")
		}

		const episodes = await fetchEpisodes(serie_id, season.season_number)
		if (episodes) {
			addEpisodesToSeason(episodes, new_season.id)
		}

		return new_season
	} catch (error: any) {
		console.error(error)
	}
}

const fetchEpisodes = async (serie_id: number, season_number: number) => {
	const url = `https://api.themoviedb.org/3/tv/${serie_id}/season/${season_number}?language=fr-FR`
	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	})
	const data = await response.json()
	const episodes = data.episodes
	return episodes
}

const addEpisodesToSeason = async (episodes: any[], season_id: number) => {
	episodes.forEach(async (episode) => {
		const formattedEpisode = {
			name: episode.name,
			image: `https://image.tmdb.org/t/p/w500${episode.still_path}`,
			episodeNumber: episode.episode_number,
			description: episode.overview,
			releaseDate: new Date(episode.air_date),
			duration: episode.runtime || 0,
			season_id,
		}
		try {
			let new_episode: EpisodeAttributes
			// check if episode already exists
			const existingEpisode = (await Episodes.findOne({
				where: { name: formattedEpisode.name, season_id },
			})) as unknown as EpisodeAttributes

			if (existingEpisode) {
				new_episode = existingEpisode
				console.log(formattedEpisode.name, "Episode already exists")
			} else {
				new_episode = (await Episodes.create(
					formattedEpisode
				)) as unknown as EpisodeAttributes
				console.log(formattedEpisode.name, "Episode added to DB")
			}
			return new_episode
		} catch (error: any) {
			console.error(error)
		}
	})
}

const scrapSeries = async (from: number, to: number) => {
	const url = `https://api.themoviedb.org/3/tv/popular?language=fr-FR&page=`
	for (let i = from; i <= to; i++) {
		const response = await fetch(url + i, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		})
		const data = await response.json()
		const series = data.results
		console.log(data, "series", url + i)

		for (const serie of series) {
			await scrapSerieById(serie.id)
		}
	}
}

const scrapSerieById = async (id: number) => {
	const url = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR`
	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	})
	const serie = await response.json()
	const serieId = await addSerieToDB(serie)
}

export default scrapSeries
