// React
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
// Context
import { useAuth } from "../context/authContext"
import { useHistory } from "../context/historyContext"
// Components
import EpisodeList from "../components/EpisodeList"
import BetterImg from "../components/BetterImg"
import { ArrowLeft } from "../components/Icons"
// API calls
import { getSeasonByNumber } from "../api/series"
// types
import { Season_type } from "../types"
// Css
import "./css/DetailPage.css"
import "./css/SeasonDetail.css"

const Seasondetail = () => {
	const { user, loading } = useAuth()
	const { goBack } = useHistory()
	if (loading) {
		return <div>Loading...</div>
	}
	if (!user) {
		return <Navigate to="/login" />
	}

	const params = useParams<{ id: string; season: string }>()
	const serieId = params.id
	const seasonNumber = params.season
	const [season, setSeason] = useState<Season_type | null>(null)

	useEffect(() => {
		getSeasonByNumber(Number(serieId), Number(seasonNumber)).then((serie) =>
			setSeason(serie)
		)
	}, [])

	return (
		<div className="detail-page" id="season-detail">
			<div className="hero">
				<div className="imageContainer">
					<a href="#" onClick={goBack} className="back">
						<ArrowLeft />
					</a>
					<BetterImg src={season?.image} alt="Image de couverture" />
				</div>
				<div className="description">
					<h1>{season?.name}</h1>
					<p>{season?.description}</p>
				</div>
			</div>
			<EpisodeList
				serieId={Number(serieId)}
				seasonNumber={Number(seasonNumber)}
				title="Episodes"
				showDetails
				wrap
			/>
		</div>
	)
}

export default Seasondetail
