import React, { useState } from "react"
// API
import apiClient from "../api/apiClient"
// components
import Overlay from "./Overlay"

const PasswordUpdateOverlay: React.FC<{ close: () => any }> = ({ close }) => {
	const [password, setPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const updatePassword = async (e: React.FormEvent) => {
		e.preventDefault()
		if (newPassword !== confirmPassword) {
			alert("Les mots de passe ne correspondent pas")
			return
		}

		const response = await apiClient.put("/auth/password", {
			password,
			newPassword,
		})

		if (response.status === 200) {
			close()
		}
	}
	return (
		<Overlay close={close}>
			<h2>Modifier votre mot de passe</h2>
			<form
				style={{
					display: "flex",
					flexDirection: "column",
					gap: ".15em",
				}}
				onSubmit={updatePassword}
			>
				<label htmlFor="password">Ancien mot de passe : </label>
				<input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={{ marginBottom: "1em" }}
				/>
				<label htmlFor="newPassword">Nouveau mot de passe : </label>
				<input
					type="password"
					name="newPassword"
					id="newPassword"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					style={{ marginBottom: "1em" }}
				/>
				<label htmlFor="confirmPassword">
					Confirmer le nouveau mot de passe :
				</label>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					style={{ marginBottom: "1em" }}
				/>
				<button
					style={{
						backgroundColor: "var(--netflix-red)",
						border: "none",
						borderRadius: "5px",
						padding: ".5em",
					}}
				>
					Modifier
				</button>
			</form>
		</Overlay>
	)
}

export default PasswordUpdateOverlay
