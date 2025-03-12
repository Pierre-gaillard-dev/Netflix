import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

interface History {
	history: string[]
	addHistory: (path: string) => void
	currentPage: () => string
	goBack: () => void
}

const HistoryContext = React.createContext<History>({
	history: [],
	addHistory: () => {},
	currentPage: () => "",
	goBack: () => {},
})

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [history, setHistory] = React.useState<string[]>([])
	const location = useLocation()

	const addHistory = (path: string) => {
		if (history.length > 0 && history[history.length - 1] === path) {
			return
		}

		setHistory([...history, path])
	}

	useEffect(() => {
		addHistory(window.location.pathname)
	}, [location])

	const currentPage = () => {
		return history[history.length - 1]
	}

	const goBack = () => {
		if (history.length > 1) {
			setHistory((prev) => prev.slice(0, -1))
			window.history.back()
		}
	}

	return (
		<HistoryContext.Provider
			value={{ history, addHistory, goBack, currentPage }}
		>
			{children}
		</HistoryContext.Provider>
	)
}

export const useHistory = () => {
	const context = React.useContext(HistoryContext)
	if (!context) {
		throw new Error("useHistory must be used within a HistoryProvider")
	}
	return context
}
