import { useState, useEffect } from "react"
import "./App.css"
import FilmList from "./components/FilmList"

import { FilmList_type } from "./types"

function App() {
	const [films, setFilms] = useState<FilmList_type>([])

	useEffect(() => {
		getFilms().then((new_films) => {
			setFilms(new_films)
		})
	})

	return (
		<>
			<h1>App</h1>
			<div>
				<h2>films</h2>
				<FilmList films={films} />
			</div>
		</>
	)
}

const getFilms: () => Promise<FilmList_type> = function () {
	return fetch("http://localhost:3000/api/films").then((res) => {
		return res.json()
	})
}

export default App
