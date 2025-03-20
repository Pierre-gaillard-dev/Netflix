// React
import { Link } from "react-router-dom"
// Context
import { useHistory } from "../context/historyContext"
// Components
import { Film, Home, Profile, Serie } from "./Icons"
// CSS
import "./css/MobileNav.css"

const MobileNav: React.FC = () => {
	const { currentPage } = useHistory()

	if (currentPage() === "/login" || currentPage() === "/register") {
		return <></>
	}

	return (
		<nav className="mobile-nav">
			<div className="mobile-nav-links">
				<Link to="/">
					<Home />
					Accueil
				</Link>
				<Link to="/films">
					<Film />
					Films
				</Link>
				<Link to="/series">
					<Serie />
					Séries
				</Link>
				<Link to="/profile">
					<Profile />
					Profile
				</Link>
			</div>
		</nav>
	)
}

export default MobileNav
