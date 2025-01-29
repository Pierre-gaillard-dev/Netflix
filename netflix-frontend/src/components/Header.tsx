import React from "react"
import { Bell, Search } from "./Icons"

import "./css/Header.css"

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
					<a href="#">Accueil</a>
					<a href="#">Séries</a>
					<a href="#">Films</a>
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
