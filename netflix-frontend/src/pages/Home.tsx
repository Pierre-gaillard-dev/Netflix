// React
import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { Navigate } from "react-router-dom"
// Components
import FilmList from "../components/FilmList"
// API
import { getFilmGenres } from "../api/genres"

import { Genre_type } from "../types"

function App() {
	const { user, loading } = useAuth()
	if (loading) {
		return <div>Loading...</div>
	}
	if (!user) {
		return <Navigate to="/login" />
	}

	const [genres, setGenres] = useState<Genre_type[]>([])

	useEffect(() => {
		getFilmGenres().then((genres) => setGenres(genres))
	}, [])

	return (
		<>
			<FilmList title="Tous les films du moment" />
			{genres.map((genre) => (
				<FilmList
					key={genre.id}
					genreId={genre.id}
					title={genre.name}
				/>
			))}
		</>
	)
}

export default App
