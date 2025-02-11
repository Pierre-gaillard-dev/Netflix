// react
import { useState } from "react"
import { useAuth } from "../context/authContext"
import { Link, useNavigate } from "react-router-dom"
// components
import BetterInput from "../components/BetterInput"
// css
import "./css/Login.css"

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
		<section id="login">
			<h1>Connexion</h1>

			<form onSubmit={handleSubmit}>
				<BetterInput
					type="email"
					inputId="email"
					label="Email"
					labelSize={12}
					height={40}
					value={mail}
					onchange={(e) => setMail(e.target.value)}
				/>
				<BetterInput
					type="password"
					inputId="password"
					label="Password"
					labelSize={12}
					height={40}
					value={password}
					onchange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Connexion</button>
			</form>
			<Link to="/register">S'inscrire</Link>
		</section>
	)
}

export default Login
