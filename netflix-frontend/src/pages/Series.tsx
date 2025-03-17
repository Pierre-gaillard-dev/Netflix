import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
// API calls
import { getSeriesGenres } from "../api/genres"
// Components
import SerieList from "../components/SerieList"
import SelectMenu from "../components/SelectMenu"
//types
import { Genre_type } from "../types"
// Css
import "./css/Films.css"
import { useDevice } from "../context/deviceContext"

const Series: React.FC = () => {
	const { user } = useAuth()
	const device = useDevice()
	if (!user) {
		return <Navigate to="/login" />
	}

	const [genres, setGenres] = useState<Genre_type[]>([])
	const [genre, setGenre] = useState<Genre_type | null>(null)

	useEffect(() => {
		getSeriesGenres().then((genres) => setGenres(genres))
	}, [])
	return (
		<div className={"films-page" + (device.isMobile ? " mobile" : "")}>
			<div className="hero">
				<a onClick={() => setGenre(null)}>
					<h1>Séries</h1>
				</a>
				<SelectMenu
					title="Genre"
					options={genres}
					value={genre}
					setValue={setGenre as any}
					gridColumns={4}
				/>
			</div>
			<SerieList
				genreId={genre?.id}
				wrap
				max={300}
				showDetails={device.isMobile}
			/>
		</div>
	)
}

export default Series
