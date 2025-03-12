// React
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
// Context
import { useAuth } from "../context/authContext"
import { useHistory } from "../context/historyContext"
// API calls
import { getFilmById } from "../api/films"
// Types
import { Film_type } from "../types"
// Css
import "./css/FilmDetail.css"
import { ArrowLeft } from "../components/Icons"

const FilmDetail = () => {
	const { user } = useAuth()
	const { goBack } = useHistory()
	if (!user) {
		return <Navigate to="/login" />
	}

	const id = useParams<{ id: string }>().id
	const [film, setFilm] = useState<Film_type | null>(null)

	useEffect(() => {
		getFilmById(Number(id)).then((film) => setFilm(film))
	}, [])

	return (
		<>
			<div className="hero">
				<div className="imageContainer">
					<a href="#" onClick={goBack} className="back">
						<ArrowLeft />
					</a>
					<img src={film?.image} alt="Film" />
				</div>
				<div className="description">
					<h1>{film?.name}</h1>
					<p>{film?.description}</p>
				</div>
			</div>
		</>
	)
}

export default FilmDetail
