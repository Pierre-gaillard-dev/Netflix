// React
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// API calls
import { getFilmById } from "../api/films"
// Types
import { Film_type } from "../types"
// Css
import "./css/FilmDetail.css"

const FilmDetail = () => {
	const id = useParams<{ id: string }>().id
	const [film, setFilm] = useState<Film_type | null>(null)

	useEffect(() => {
		getFilmById(Number(id)).then((film) => setFilm(film))
	}, [])

	return (
		<>
			<div className="hero">
				<img src={film?.image} alt="Film" />
				<div className="description">
					<h1>{film?.name}</h1>
					<p>{film?.description}</p>
				</div>
			</div>
		</>
	)
}

export default FilmDetail
