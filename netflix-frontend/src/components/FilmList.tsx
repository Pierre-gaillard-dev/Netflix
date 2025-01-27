import React from "react"
import FilmItem from "./FilmItem"

import { FilmList_type } from "../types"

const FilmList: React.FC<{ films: FilmList_type }> = function ({ films = [] }) {
	return (
		<div className="FilmList">
			{films.map((film) => (
				<FilmItem key={film.id} {...film} />
			))}
		</div>
	)
}

export default FilmList
