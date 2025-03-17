import React from "react"
import VideoItem from "./VideoItem"
import { getAllFilms, getFilmByGenre } from "../api/films"

import { FilmList_type } from "../types"

import "./css/videoItemList.css"

const FilmList: React.FC<{
	showDetails?: boolean
	genreId?: number
	title?: string
	max?: number
	wrap?: boolean
}> = ({ showDetails, genreId, title, max, wrap }) => {
	const [films, setFilms] = React.useState<FilmList_type>([])
	const maxFilms = max ? max : 50

	React.useEffect(() => {
		if (genreId) {
			getFilmByGenre(genreId, maxFilms).then((films) => setFilms(films))
		} else {
			getAllFilms(maxFilms).then((films) => setFilms(films))
		}
	}, [genreId])
	return (
		<div className="video-item-list-container filmListContainer">
			{title && <h2>{title}</h2>}
			<div className={"video-item-list filmList" + (wrap ? " wrap" : "")}>
				{films.map((film) => (
					<VideoItem
						key={film.id}
						item={film}
						type={"film"}
						showDetails={showDetails}
					/>
				))}
			</div>
		</div>
	)
}

export default FilmList
