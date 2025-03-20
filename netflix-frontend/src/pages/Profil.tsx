import React, { useState } from "react"
import { Navigate } from "react-router-dom"
// context
import { useAuth } from "../context/authContext"
// components
import UpdateUserOverlay from "../components/UpdateUser.overlay"
import PasswordUpdateOverlay from "../components/PasswordUpdate.overlay"
import DeleteAccountOverlay from "../components/DeleteAccount.overlay"
// Css
import "./css/Profile.css"
import BetterImg from "../components/BetterImg"

const Profile: React.FC = () => {
	const { user, loading } = useAuth()
	const [updateOverlay, setUpdateOverlay] = useState(false)
	const [passwordUpdateOverlay, setPasswordUpdateOverlay] = useState(false)
	const [deleteOverlay, setDeleteOverlay] = useState(false)

	if (loading) {
		return <div>Loading...</div>
	}
	if (!user) {
		return <Navigate to="/login" />
	}

	const openUpdateOverlay = () => {
		setUpdateOverlay(true)
	}

	const closeUpdateOverlay = () => {
		setUpdateOverlay(false)
	}

	const openPasswordUpdateOverlay = () => {
		setPasswordUpdateOverlay(true)
	}

	const closePasswordUpdateOverlay = () => {
		setPasswordUpdateOverlay(false)
	}

	const openDeleteOverlay = () => {
		setDeleteOverlay(true)
	}

	const closeDeleteOverlay = () => {
		setDeleteOverlay(false)
	}

	return (
		<div className="page profile">
			{updateOverlay && <UpdateUserOverlay close={closeUpdateOverlay} />}
			{passwordUpdateOverlay && (
				<PasswordUpdateOverlay close={closePasswordUpdateOverlay} />
			)}
			{deleteOverlay && (
				<DeleteAccountOverlay close={closeDeleteOverlay} />
			)}
			<h1>Profile</h1>
			<div className="split">
				<div className="imageContainer">
					<BetterImg
						src="https
					://www.w3schools.com/howto/img_avatar.png"
					/>
				</div>
				<div className="info">
					<h2>Informations</h2>
					<p>Nom: {user.name}</p>
					<p>Email: {user.email}</p>
					<p>
						Date de naissance:{" "}
						{user.birthDate.toLocaleDateString("fr-FR")}
					</p>
				</div>
			</div>
			<div className="split center edit change-password">
				<button onClick={openUpdateOverlay}>Modifier</button>
				<a onClick={openPasswordUpdateOverlay}>
					Changer le mot de passe
				</a>
			</div>
			<div className="center delete">
				<a onClick={openDeleteOverlay}>Supprimer le compte</a>
			</div>
		</div>
	)
}

export default Profile
