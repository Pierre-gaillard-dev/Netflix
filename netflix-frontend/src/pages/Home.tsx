import { useEffect, useState } from "react"
import FilmList from "../components/FilmList"
import { getAllGenres } from "../api/genres"

import { Genre_type } from "../types"

function App() {
	const [genres, setGenres] = useState<Genre_type[]>([])

	useEffect(() => {
		getAllGenres().then((genres) => setGenres(genres))
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
