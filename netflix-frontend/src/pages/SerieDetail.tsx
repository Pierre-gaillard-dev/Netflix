// React
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
// Context
import { useAuth } from "../context/authContext"
import { useHistory } from "../context/historyContext"
// Components
import SeasonList from "../components/SeasonList"
import { ArrowLeft } from "../components/Icons"
// API calls
import { getSerieById } from "../api/series"
// types
import { Serie_type } from "../types"
// Css
import "./css/DetailPage.css"
import "./css/SerieDetail.css"

const SerieDetail = () => {
	const { user } = useAuth()
	const { goBack } = useHistory()
	if (!user) {
		return <Navigate to="/login" />
	}

	const { id } = useParams<{ id: string }>()
	const [serie, setserie] = useState<Serie_type | null>(null)

	useEffect(() => {
		getSerieById(Number(id)).then((serie) => setserie(serie))
	}, [])

	return (
		<div className="detail-page" id="serie-detail">
			<div className="hero">
				<div className="imageContainer">
					<a href="#" onClick={goBack} className="back">
						<ArrowLeft />
					</a>
					<img src={serie?.image} alt="Film" />
				</div>
				<div className="description">
					<h1>{serie?.name}</h1>
					<p>{serie?.description}</p>
				</div>
			</div>
			<SeasonList serieId={Number(id)} title="Seasons" showDetails wrap />
		</div>
	)
}

export default SerieDetail
