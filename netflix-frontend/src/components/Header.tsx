// react
import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
// components
import { Bell, Search, ArrowDown } from "./Icons"
// css
import "./css/Header.css"

const Header: React.FC = () => {
	const { user, logout } = useAuth()
	const [userPopup, setUserPopup] = React.useState(false)
	return (
		<header className="header">
			<div className="header_left">
				<div className="logo">
					<img
						src="/brand_assets/Netflix_Logo_RGB.png"
						alt="Netflix Logo"
					/>
				</div>
				<div className="links">
					<Link to="/">Accueil</Link>
					<a href="#">Séries</a>
					<Link to="/films">Films</Link>
					<a href="#">Nouveautés les plus regardées</a>
					<a href="#">Ma liste</a>
					<a href="#">Explorer par langue</a>
				</div>
			</div>
			<div className="header_right">
				<div className="search">
					<Search />
				</div>
				<div className="links">
					<a href="#">Jeunesse</a>
				</div>
				<div className="notifications">
					<Bell />
				</div>
				{user && (
					<div className="links profile">
						<a onClick={() => setUserPopup(!userPopup)}>
							{user.username}
							<ArrowDown />
							{userPopup && (
								<div className="popup">
									<div className="links">
										<a onClick={logout}>Déconnecter</a>
									</div>
								</div>
							)}
						</a>
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
