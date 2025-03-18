// React
import React, { useState } from "react"
import { Link } from "react-router-dom"
// Context
import { useDevice } from "../context/deviceContext"
// Components
import BetterImg from "./BetterImg"
// types
import { Episode_type, Film_type, Season_type, Serie_type } from "../types"
// CSS
import "./css/VideoItem.css"

const VideoItem: React.FC<{
	item: Film_type | Serie_type | Season_type | Episode_type
	type: "film" | "series" | "season" | "episode"
	showDetails?: boolean
}> = ({ item, type, showDetails = false }) => {
	const device = useDevice()
	const [selected, setSelected] = useState<boolean>(false)
	let link = ""
	if ("seasonNumber" in item) {
		// season list
		link = getLink("season", item.seasonNumber)
	} else if ("episodeNumber" in item) {
		// episode list
		link = getLink("episode", item.episodeNumber)
	} else {
		// film or series list
		link = getLink(type, item.id)
	}

	return (
		<Link
			to={link}
			className={
				"videoItem" +
				(selected ? " selected" : "") +
				(device.isMobile ? " mobile" : "")
			}
			onMouseEnter={() => setSelected(true)}
			onMouseLeave={() => setSelected(false)}
		>
			<div className="image_container">
				<BetterImg src={item.image} alt={item.name} />
				{!showDetails && <p className="videoName">{item.name}</p>}
				{"duration" in item && item.duration > 0 && (
					<p className="duration">{`${Math.floor(
						item.duration / 60
					)}h ${item.duration % 60}min`}</p>
				)}
			</div>
			{showDetails && (
				<>
					<h3>{item.name}</h3>
				</>
			)}
		</Link>
	)
}

const getLink = (type: string, id: number) => {
	switch (type) {
		case "film":
			return `/films/${id}`
		case "series":
			return `/series/${id}`
		case "season":
			return `./seasons/${id}`
		case "episode":
			return `./episodes/${id}`
		default:
			return ""
	}
}

export default VideoItem
