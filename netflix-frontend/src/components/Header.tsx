// react
import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
// components
import SearchBar from "./SearchBar"
import { Bell, ArrowDown } from "./Icons"
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
						src="https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460"
						alt="Netflix Logo"
					/>
				</div>
				<div className="links">
					<Link to="/">Accueil</Link>
					<Link to="/series">Séries</Link>
					<Link to="/films">Films</Link>
					<a href="#">Nouveautés les plus regardées</a>
					<a href="#">Ma liste</a>
					<a href="#">Explorer par langue</a>
				</div>
			</div>
			<div className="header_right">
				<div className="header-searchbar">
					<SearchBar placeholder="Chercher..." foldOnEmptySearch />
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
							{user.name}
							<ArrowDown />
							{userPopup && (
								<div className="popup">
									<div className="links">
										<Link to="/profile">Profil</Link>
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
