import React, { useEffect, useState } from "react"
import { Film_type } from "../types"
import testImage from "../utils/testImage"

import "./css/VideoItem.css"
import { Link } from "react-router-dom"
import { useDevice } from "../context/deviceContext"

const VideoItem: React.FC<{
	film: Film_type | any
	type: "film" | "series" | "episode"
	showDetails?: boolean
}> = ({ film, type, showDetails = false }) => {
	const device = useDevice()
	const [isValidImage, setIsValidImage] = useState<boolean>(false)
	const [selected, setSelected] = useState<boolean>(false)
	const link = getLink(type, film.id)

	useEffect(() => {
		testImage(film.image).then((isValid) => setIsValidImage(isValid))
	}, [])

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
				{isValidImage ? (
					<img src={film.image} alt="Image" />
				) : (
					<p>Image not found</p>
				)}
				{!showDetails && <p className="videoName">{film.name}</p>}
				<p className="duration">{`${Math.floor(film.duration / 60)}h ${
					film.duration % 60
				}min`}</p>
			</div>
			{showDetails && (
				<>
					<p>{film.name}</p>
					<p>{film.description}</p>
				</>
			)}
		</Link>
	)
}

const getLink = (type: string, id: number) => {
	switch (type) {
		case "film":
			return `/films/${id}`
		default:
			return ""
	}
}

export default VideoItem
