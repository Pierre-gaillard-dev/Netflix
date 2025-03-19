import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
// API calls
import { getFilmGenres } from "../api/genres"
// Components
import FilmList from "../components/FilmList"
import SelectMenu from "../components/SelectMenu"
//types
import { Genre_type } from "../types"
// Css
import "./css/Films.css"
import { useDevice } from "../context/deviceContext"

const Films: React.FC = () => {
	const { user, loading } = useAuth()
	const device = useDevice()
	if (loading) {
		return <div>Loading...</div>
	}
	if (!user) {
		return <Navigate to="/login" />
	}

	const [genres, setGenres] = useState<Genre_type[]>([])
	const [genre, setGenre] = useState<Genre_type | null>(null)

	useEffect(() => {
		getFilmGenres().then((genres) => setGenres(genres))
	}, [])

	return (
		<div className={"films-page" + (device.isMobile ? " mobile" : "")}>
			<div className="hero">
				<a onClick={() => setGenre(null)}>
					<h1>Films</h1>
				</a>
				<SelectMenu
					title="Genre"
					options={genres}
					value={genre}
					setValue={setGenre as any}
					gridColumns={4}
				/>
			</div>
			<FilmList
				genreId={genre?.id}
				wrap
				max={300}
				showDetails={device.isMobile}
			/>
		</div>
	)
}

export default Films
