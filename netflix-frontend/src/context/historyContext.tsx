import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

interface History {
	history: string[]
	addHistory: (path: string) => void
}

const HistoryContext = React.createContext<History>({
	history: [],
	addHistory: () => {},
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

	return (
		<HistoryContext.Provider value={{ history, addHistory }}>
			{children}
		</HistoryContext.Provider>
	)
}

export const useHistory = () => React.useContext(HistoryContext)
