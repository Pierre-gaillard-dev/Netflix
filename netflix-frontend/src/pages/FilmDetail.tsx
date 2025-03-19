// React
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
// Context
import { useAuth } from "../context/authContext"
import { useHistory } from "../context/historyContext"
// Components
import BetterImg from "../components/BetterImg"
import { ArrowLeft } from "../components/Icons"
// API calls
import { getFilmById } from "../api/films"
// Types
import { Film_type } from "../types"
// Css
import "./css/DetailPage.css"

const FilmDetail = () => {
	const { user, loading } = useAuth()
	const { goBack } = useHistory()
	if (loading) {
		return <div>Loading...</div>
	}
	if (!user) {
		return <Navigate to="/login" />
	}

	const id = useParams<{ id: string }>().id
	const [film, setFilm] = useState<Film_type | null>(null)

	useEffect(() => {
		getFilmById(Number(id)).then((film) => setFilm(film))
	}, [])

	return (
		<div className="detail-page">
			<div className="hero">
				<div className="imageContainer">
					<a href="#" onClick={goBack} className="back">
						<ArrowLeft />
					</a>
					<BetterImg src={film?.image} alt="Image de couverture" />
				</div>
				<div className="description">
					<h1>{film?.name}</h1>
					<p>{film?.description}</p>
				</div>
			</div>
		</div>
	)
}

export default FilmDetail
