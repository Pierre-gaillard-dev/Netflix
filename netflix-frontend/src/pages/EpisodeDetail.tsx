// React
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
// Context
import { useAuth } from "../context/authContext"
import { useHistory } from "../context/historyContext"
// API calls
import { getEpisodeByNumber } from "../api/series"
// types
import { Episode_type } from "../types"
// components
import BetterImg from "../components/BetterImg"
import { ArrowLeft } from "../components/Icons"
// Css
import "./css/DetailPage.css"

const Seasondetail = () => {
	const { user, loading } = useAuth()
	const { goBack } = useHistory()

	if (loading) {
		return <div>Loading...</div>
	}
	if (!user) {
		return <Navigate to="/login" />
	}

	const params = useParams<{ id: string; season: string; episode: string }>()
	const serieId = params.id
	const seasonNumber = params.season
	const episodeNumber = params.episode
	const [episode, setEpisode] = useState<Episode_type | null>(null)

	useEffect(() => {
		getEpisodeByNumber(
			Number(serieId),
			Number(seasonNumber),
			Number(episodeNumber)
		).then((episode) => setEpisode(episode))
	}, [])

	return (
		<div className="detail-page">
			<div className="hero">
				<div className="imageContainer">
					<a href="#" onClick={goBack} className="back">
						<ArrowLeft />
					</a>
					<BetterImg src={episode?.image} alt="Image de couverture" />
				</div>
				<div className="description">
					<h1>{episode?.name}</h1>
					<p>{episode?.description}</p>
				</div>
			</div>
		</div>
	)
}

export default Seasondetail
