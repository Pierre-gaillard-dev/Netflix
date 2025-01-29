import React, { useEffect, useState } from "react"
import { Film_type } from "../types"
import testImage from "../utils/testImage"

import "./css/VideoItem.css"

const VideoItem: React.FC<{
	film: Film_type | any
	type: "film" | "series" | "episode"
	showDetails?: boolean
}> = ({ film, type, showDetails = false }) => {
	const [isValidImage, setIsValidImage] = useState<boolean>(false)

	useEffect(() => {
		testImage(film.image).then((isValid) => setIsValidImage(isValid))
	}, [])

	return (
		<div className="videoItem">
			<div className="image_container">
				{isValidImage ? (
					<img src={film.image} alt="Image" />
				) : (
					<p>Image not found</p>
				)}
				<p></p>
				<p className="duration">{film.duration}</p>
			</div>
			{showDetails && (
				<>
					<p>{film.name}</p>
					<p>{film.description}</p>
				</>
			)}
		</div>
	)
}

export default VideoItem
