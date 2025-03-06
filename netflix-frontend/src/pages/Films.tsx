import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
// API calls
import { getAllGenres } from "../api/genres"
// Components
import FilmList from "../components/FilmList"
import SelectMenu from "../components/SelectMenu"
//types
import { Genre_type } from "../types"

const Films: React.FC = () => {
	const { user } = useAuth()
	if (!user) {
		return <Navigate to="/login" />
	}

	const [genres, setGenres] = useState<Genre_type[]>([])
	const [genre, setGenre] = useState<Genre_type | null>(null)

	useEffect(() => {
		getAllGenres().then((genres) => setGenres(genres))
	}, [])

	return (
		<>
			<div className="hero">
				<h1>Films</h1>
				<SelectMenu
					title="Genre"
					options={genres}
					value={genre}
					setValue={setGenre as any}
					gridColumns={4}
				/>
			</div>
			<FilmList genreId={genre?.id} wrap max={300} />
		</>
	)
}

export default Films
