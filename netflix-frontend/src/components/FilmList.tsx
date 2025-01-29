import React from "react"
import VideoItem from "./VideoItem"

import { FilmList_type } from "../types"

import "./css/FilmList.css"

const FilmList: React.FC<{ films: FilmList_type; showDetails?: boolean }> = ({
	films = [],
	showDetails,
}) => {
	return (
		<div className="filmList">
			{films.map((film) => (
				<VideoItem
					key={film.id}
					film={film}
					type={"film"}
					showDetails={showDetails}
				/>
			))}
		</div>
	)
}

export default FilmList
