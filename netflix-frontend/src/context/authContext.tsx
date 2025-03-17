// React
import { createContext, useContext, useEffect, useState } from "react"
import apiClient from "../api/apiClient"

// user interface
interface User {
	id: number
	username: string
}

interface AuthContextType {
	user: User | null
	login: (username: string, password: string) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		checkAuth()
	}, [])

	const checkAuth = async () => {
		/*
		// for testing purposes
		setUser({ id: 1, username: "test" })
		return
		*/
		try {
			const response = await apiClient.get("/auth/me")
			setUser(response.data)
		} catch (error) {
			setUser(null)
		}
	}

	const login = async (email: string, password: string) => {
		try {
			const response = await apiClient.post("/auth/login", {
				email,
				password,
			})
			setUser({
				id: response.data.user.id,
				username: response.data.user.name,
			})
			await checkAuth()
		} catch (error) {
			console.error(error)
		}
	}

	const logout = async () => {
		await apiClient.post("/auth/logout")
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}

export default AuthProvider
