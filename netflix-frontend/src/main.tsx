//React
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//components
import NavBar from "./components/NavBar.tsx"
// auth
import AuthProvider from "./context/authContext.tsx"
//pages
import Home from "./pages/Home.tsx"
import FilmDetail from "./pages/FilmDetail.tsx"
import Films from "./pages/Films.tsx"
import Series from "./pages/Series.tsx"
import SerieDetail from "./pages/SerieDetail.tsx"
import SeasonDetail from "./pages/SeasonDetail.tsx"
import EpisodeDetail from "./pages/EpisodeDetail.tsx"
import Profile from "./pages/Profil.tsx"
import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
//CSS
import "./index.css"
import { DeviceProvider } from "./context/deviceContext.tsx"
import { HistoryProvider } from "./context/historyContext.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<DeviceProvider>
			<AuthProvider>
				<Router>
					<HistoryProvider>
						<NavBar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/films" element={<Films />} />
							<Route path="/films/:id" element={<FilmDetail />} />
							<Route path="/series" element={<Series />} />
							<Route
								path="/series/:id"
								element={<SerieDetail />}
							/>
							<Route
								path="/series/:id/seasons/:season"
								element={<SeasonDetail />}
							/>
							<Route
								path="/series/:id/seasons/:season/episodes/:episode"
								element={<EpisodeDetail />}
							/>
							<Route path="/profile" element={<Profile />} />
							<Route path="*" element={<h1>Page not found</h1>} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</Routes>
					</HistoryProvider>
				</Router>
			</AuthProvider>
		</DeviceProvider>
	</StrictMode>
)
