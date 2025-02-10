// react
import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
	const [mail, setMail] = useState("")
	const [password, setPassword] = useState("")
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			await login(mail, password)
			navigate("/")
		} catch (error) {
			alert("Invalid username or password")
		}
	}

	return (
		<>
			<h1>Connexion</h1>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Adresse mail"
					value={mail}
					onChange={(e) => setMail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Connexion</button>
			</form>
		</>
	)
}

export default Login
