import React, { useState } from "react"
// API
import apiClient from "../api/apiClient"
// context
import { useAuth } from "../context/authContext"
// components
import Overlay from "./Overlay"

const UpdateUserOverlay: React.FC<{
	close: () => any
}> = ({ close }) => {
	const { user, updateAuth } = useAuth()
	const [name, setName] = useState(user?.name)
	const [birthDate, setBirthDate] = useState(user?.birthDate.toDateString())

	const updateUser = async (e: React.FormEvent) => {
		e.preventDefault()
		const response = await apiClient.put(`/users/${user!.id}`, {
			name,
			birthDate,
		})

		if (response.status === 200) {
			updateAuth(
				user?.id,
				name,
				user?.email,
				birthDate ? new Date(birthDate) : user?.birthDate
			)
			close()
		}
	}
	return (
		<Overlay close={close}>
			<h2>Modifier les informations</h2>
			<form
				style={{
					display: "flex",
					flexDirection: "column",
					gap: ".15em",
				}}
				onSubmit={updateUser}
			>
				<label htmlFor="name">Nom : </label>
				<input
					type="text"
					name="name"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "1em" }}
				/>
				<label htmlFor="birthDate">Date de naissance : </label>
				<input
					type="date"
					name="birthDate"
					id="birthDate"
					value={birthDate}
					onChange={(e) => setBirthDate(e.target.value)}
					style={{ marginBottom: "1em" }}
				/>
				<button
					type="submit"
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

export default UpdateUserOverlay
