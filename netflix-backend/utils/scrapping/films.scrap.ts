import db from "../../models"
import { FilmAttributes } from "../../types/express"
import { GenreAttributes } from "../../types/express"

const films = db.models.Films

const addFilmToDB = async (film: any) => {
	const formattedFilm = {
		name: film.title,
		image: `https://image.tmdb.org/t/p/w500${film.backdrop_path}`,
		duration: film.runtime,
		description: film.overview,
		releaseDate: new Date(film.release_date),
	}
	const genres = film.genres.map((g: any) => g.name)
	try {
		const film = (await films.create(
			formattedFilm
		)) as unknown as FilmAttributes
		console.log(formattedFilm.name, "Film added to DB")
		film.genres && addGenresToFilm(film.id, genres)
		return film.id
	} catch (error: any) {
		if (error.name === "SequelizeUniqueConstraintError") {
			console.log(formattedFilm.name, "Film already exists")
			const film = (await films.findOne({
				where: { name: formattedFilm.name },
			})) as unknown as FilmAttributes
			if (film) {
				genres && addGenresToFilm(film.id, genres)
				console.log(formattedFilm.name, genres, "film updated")
			} else {
				console.error("film not found")
			}
			return film?.id
		}
	}
}

const addGenresToFilm = async (filmId: number, genres: string[]) => {
	genres.forEach(async (genre: string) => {
		const genreId = (
			(await db.models.Genres.findOne({
				where: { name: genre },
			})) as unknown as GenreAttributes
		)?.id
		if (!genreId) {
			console.log(genre, "Genre not found")
			return
		}
		const rel = await db.models.Rel_FilmGenre.findOne({
			where: { film_id: filmId, genre_id: genreId },
		})
		if (!rel) {
			await db.models.Rel_FilmGenre.create({
				film_id: filmId,
				genre_id: genreId,
			})
		}
	})
}

const scrapFilm = (id: number) => {
	const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	}

	fetch(url, options)
		.then((res) => res.json())
		.then((json) => addFilmToDB(json))
		.catch((err) => console.error(err))
}

const scrapFilms = async (From: number, To: number) => {
	for (let i = From; i <= To; i++) {
		const url = `https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=${i}`
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		}

		fetch(url, options)
			.then((res) => res.json())
			.then((json) => {
				console.log(json.results.length, "films")
				json.results.forEach((film: any) => {
					scrapFilm(film.id)
				})
			})
			.catch((err) => console.error(err))
	}
}

export default scrapFilms
