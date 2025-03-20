// react
import { useState } from "react"
import { useAuth } from "../context/authContext"
import { Link, useNavigate } from "react-router-dom"
// components
import BetterInput from "../components/BetterInput"
// css
import "./css/Register.css"
import axios from "axios"

const Register: React.FC = () => {
	const [mail, setMail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [name, setName] = useState("")
	const [birthDate, setBirthDate] = useState("")
	const [step, setStep] = useState(1)
	const [nextStepPressed, setNextStepPressed] = useState(false)
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (nextStepPressed) return
		if (!name) {
			alert("Name is required")
			return
		}
		if (!birthDate) {
			alert("Birthdate is required")
			return
		}
		try {
			await axios.post("http://localhost:3000/api/auth/register", {
				email: mail,
				password: password,
				name: name,
				birthDate: birthDate,
			})
			await login(mail, password)
			navigate("/")
		} catch (error) {
			alert("Invalid username or password")
		}
	}

	const handleNextStep = async () => {
		if (!mail) {
			alert("l'email est requis")
			return
		}
		if (!password) {
			alert("le mot de passe est requis")
			return
		}
		if (password !== confirmPassword) {
			alert("Les mots de passe ne correspondent pas")
			return
		}
		await axios
			.get(`http://localhost:3000/api/users/email/${mail}`)
			.then(() => {
				alert("adresse mail déjà utilisée")
				return
			})
			.catch((error) => {
				if (error.response.status === 404) {
					setNextStepPressed(true)
					setStep(2)
					setTimeout(() => setNextStepPressed(false), 500)
				}
			})
	}

	return (
		<section id="register">
			<h1>Inscription</h1>
			<form onSubmit={handleSubmit}>
				{step == 1 && (
					<>
						<BetterInput
							type="email"
							inputId="email"
							label="adresse mail"
							labelSize={12}
							height={40}
							value={mail}
							onchange={(e) => setMail(e.target.value)}
						/>
						<BetterInput
							type="password"
							inputId="password"
							label="mot de passe"
							labelSize={12}
							height={40}
							value={password}
							onchange={(e) => setPassword(e.target.value)}
						/>
						<BetterInput
							type="password"
							inputId="confirmPassword"
							label="confirmer le mot de passe"
							labelSize={12}
							height={40}
							value={confirmPassword}
							onchange={(e) => setConfirmPassword(e.target.value)}
						/>
					</>
				)}
				{step == 2 && (
					<>
						<BetterInput
							type="text"
							inputId="name"
							label="Nom"
							labelSize={12}
							height={40}
							value={name}
							onchange={(e) => setName(e.target.value)}
						/>
						<BetterInput
							type="date"
							inputId="birthDate"
							label="Date de naissance"
							labelSize={12}
							height={40}
							value={birthDate}
							onchange={(e) => setBirthDate(e.target.value)}
						/>
					</>
				)}
				{step == 2 ? (
					<>
						<button type="submit">Valider</button>
						<button
							type="button"
							className="back"
							onClick={() => setStep(1)}
						>
							Retour
						</button>
					</>
				) : (
					<button type="button" onClick={handleNextStep}>
						Suivant
					</button>
				)}
			</form>
			<div className="login">
				<p>
					Vous avez déjà un compte ?{" "}
					<span>
						<Link to="/login">Se connecter</Link>
					</span>
				</p>
			</div>
			<div className="disclaimer">
				<h3>Attention</h3>
				<p>
					Ce site est un projet fictif. Il n'est pas lié au service
					Netflix.
				</p>
				<p>Les données ne sont pas conservées de manière sécurisée.</p>
				<p className="bold underline">
					Veuillez utiliser une adresse mail et un mot de passe
					fictif.
				</p>
				<p>Aucune confirmation d'adresse mail ne vous sera demandée</p>
			</div>
		</section>
	)
}

export default Register
