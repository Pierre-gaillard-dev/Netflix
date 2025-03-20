import React, { useState } from "react"
// context
import { useAuth } from "../context/authContext"
// API
import apiClient from "../api/apiClient"
// Components
import Overlay from "./Overlay"
import { Navigate } from "react-router-dom"

const DeleteAccountOverlay: React.FC<{
	close: () => any
}> = ({ close }) => {
	const { user, logout } = useAuth()
	const [deleted, setDeleted] = useState(false)
	if (deleted) {
		return <Navigate to="/login" />
	}
	if (!user) {
		return <p>erreur</p>
	}
	return (
		<Overlay close={close}>
			<h2>Supprimer le compte</h2>
			<p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
			<button
				onClick={() => {
					apiClient.delete(`/users/${user.id}`)
					logout()
					setDeleted(true)
				}}
				style={{
					backgroundColor: "red",
					border: "none",
					borderRadius: "5px",
					padding: "10px 20px",
					color: "white",
				}}
			>
				Supprimer
			</button>
		</Overlay>
	)
}

export default DeleteAccountOverlay
