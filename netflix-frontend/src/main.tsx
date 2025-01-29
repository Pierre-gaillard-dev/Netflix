import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import Header from "./components/Header.tsx"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Header />
		<App />
	</StrictMode>
)
