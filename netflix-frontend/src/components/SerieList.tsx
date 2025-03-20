import React from "react"
import VideoItem from "./VideoItem"
import { getAllSeries, getSeriesByGenre } from "../api/series"

import { SerieList_type } from "../types"

import "./css/VideoItemList.css"

const FilmList: React.FC<{
	showDetails?: boolean
	genreId?: number
	title?: string
	max?: number
	wrap?: boolean
}> = ({ showDetails, genreId, title, max, wrap }) => {
	const [series, setSeries] = React.useState<SerieList_type>([])
	const maxSeries = max ? max : 50

	React.useEffect(() => {
		if (genreId) {
			getSeriesByGenre(genreId, maxSeries).then((Series) =>
				setSeries(Series)
			)
		} else {
			getAllSeries(maxSeries).then((Series) => setSeries(Series))
		}
	}, [genreId])
	return (
		<div className="video-item-list-container serieListContainer">
			{title && <h2>{title}</h2>}
			<div
				className={"video-item-list serieList" + (wrap ? " wrap" : "")}
			>
				{series.map((serie) => (
					<VideoItem
						key={serie.id}
						item={serie}
						type={"series"}
						showDetails={showDetails}
					/>
				))}
			</div>
		</div>
	)
}

export default FilmList
