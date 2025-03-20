import React from "react"
import VideoItem from "./VideoItem"
import { getSeasonEpisodes } from "../api/series"

import { EpisodeList_type } from "../types"

import "./css/VideoItemList.css"

const FilmList: React.FC<{
	showDetails?: boolean
	serieId: number
	seasonNumber: number
	title?: string
	wrap?: boolean
}> = ({ showDetails, serieId, seasonNumber, title, wrap }) => {
	const [episodes, setEpisodes] = React.useState<EpisodeList_type>([])

	React.useEffect(() => {
		getSeasonEpisodes(serieId, seasonNumber).then((seasons) => {
			setEpisodes(seasons)
		})
	}, [serieId, seasonNumber])
	return (
		<div className="video-item-list-container serieListContainer">
			{title && <h2>{title}</h2>}
			<div
				className={"video-item-list serieList" + (wrap ? " wrap" : "")}
			>
				{episodes.map((episode) => (
					<VideoItem
						key={episode.id}
						item={episode}
						type={"episode"}
						showDetails={showDetails}
					/>
				))}
			</div>
		</div>
	)
}

export default FilmList
