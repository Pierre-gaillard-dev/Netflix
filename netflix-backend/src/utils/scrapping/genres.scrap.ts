import db from "../../models"

const genres = db.models.Genres

const addGenreToDB = async (genre: any, contentType: "film" | "serie") => {
	const formattedGenre = {
		name: genre.name,
		contentType,
	}
	try {
		const existingGenre = (await genres.findOne({
			where: { name: formattedGenre.name },
		})) as any
		if (existingGenre) {
			if (
				existingGenre.contentType === contentType ||
				existingGenre.contentType === "both"
			) {
				console.log(formattedGenre.name, "Genre already exists")
				return
			}
			await genres.update(
				{ contentType },
				{ where: { name: formattedGenre.name } }
			)
			console.log(formattedGenre.name, "Genre updated")
		}

		await genres.create(formattedGenre)
		console.log(formattedGenre.name, "Genre added to DB")
	} catch (error: any) {
		if (error.name === "SequelizeUniqueConstraintError") {
			console.log(formattedGenre.name, "Genre already exists")
			return
		}
	}
}

const scrapGenres = async () => {
	const filmUrl = `https://api.themoviedb.org/3/genre/movie/list?language=fr`
	const serieUrl = `https://api.themoviedb.org/3/genre/tv/list?language=fr`
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	}

	console.log("Scraping films genres")
	await fetch(filmUrl, options)
		.then((res) => res.json())
		.then((json) => {
			console.log(json.genres.length, "films")
			json.genres.forEach((genre: any) => {
				addGenreToDB(genre, "film")
			})
		})
		.catch((err) => console.error(err))
	console.log("Scraping series genres")
	await fetch(serieUrl, options)
		.then((res) => res.json())
		.then((json) => {
			console.log(json.genres.length, "series")
			json.genres.forEach((genre: any) => {
				addGenreToDB(genre, "serie")
			})
		})
		.catch((err) => console.error(err))
}

export default scrapGenres
export { addGenreToDB }
