import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./index.css"
import Header from "./components/Header.tsx"
import Home from "./pages/Home.tsx"
import Films from "./pages/Films.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/films" element={<Films />} />
				<Route path="*" element={<h1>Page not found</h1>} />
			</Routes>
		</Router>
	</StrictMode>
)
