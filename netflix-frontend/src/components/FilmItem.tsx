import React from "react"
import { Film_type } from "../types"

const FilmItem: React.FC<Film_type> = (props) => {
	return (
		<div className="Item">
			<div className="image_container">
				<img src={props.image} />
				<p>{props.duration}</p>
			</div>
		</div>
	)
}

export default FilmItem
