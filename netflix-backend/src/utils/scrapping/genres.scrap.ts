import db from "../../models"

const genres = db.models.Genres

const addGenreToDB = async (genre: any) => {
	const formattedGenre = {
		name: genre.name,
	}
	try {
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
	const url = `https://api.themoviedb.org/3/genre/movie/list?language=fr`
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
			console.log(json.genres.length, "films")
			json.genres.forEach((genre: any) => {
				addGenreToDB(genre)
			})
		})
		.catch((err) => console.error(err))
}

export default scrapGenres
export { addGenreToDB }
