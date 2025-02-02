import React from "react"
import { Bell, Search } from "./Icons"

import "./css/Header.css"
import { Link } from "react-router-dom"

const Header: React.FC = () => {
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
				<div className="profile"></div>
			</div>
		</header>
	)
}

export default Header
