import React from "react"
import VideoItem from "./VideoItem"
import { getSerieSeasons } from "../api/series"

import { SeasonList_type } from "../types"

import "./css/VideoItemList.css"

const FilmList: React.FC<{
	showDetails?: boolean
	serieId: number
	title?: string
	wrap?: boolean
}> = ({ showDetails, serieId, title, wrap }) => {
	const [seasons, setSeasons] = React.useState<SeasonList_type>([])

	React.useEffect(() => {
		getSerieSeasons(serieId).then((seasons) => {
			setSeasons(seasons)
		})
	}, [serieId])
	return (
		<div className="video-item-list-container serieListContainer">
			{title && <h2>{title}</h2>}
			<div
				className={"video-item-list serieList" + (wrap ? " wrap" : "")}
			>
				{seasons.map((season) => (
					<VideoItem
						key={season.id}
						item={season}
						type={"season"}
						showDetails={showDetails}
					/>
				))}
			</div>
		</div>
	)
}

export default FilmList
