//React
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//components
import Header from "./components/Header.tsx"
// auth
import AuthProvider from "./context/authContext.tsx"
//pages
import Home from "./pages/Home.tsx"
import FilmDetail from "./pages/FilmDetail.tsx"
import Films from "./pages/Films.tsx"
import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
//CSS
import "./index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/films" element={<Films />} />
					<Route path="/films/:id" element={<FilmDetail />} />
					<Route path="*" element={<h1>Page not found</h1>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Router>
		</AuthProvider>
	</StrictMode>
)
