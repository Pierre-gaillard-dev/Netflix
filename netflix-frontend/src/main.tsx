//React
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//components
import Header from "./components/Header.tsx"
//pages
import Home from "./pages/Home.tsx"
import FilmDetail from "./pages/FilmDetail.tsx"
import Films from "./pages/Films.tsx"
//CSS
import "./index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/films" element={<Films />} />
				<Route path="/films/:id" element={<FilmDetail />} />
				<Route path="*" element={<h1>Page not found</h1>} />
			</Routes>
		</Router>
	</StrictMode>
)
