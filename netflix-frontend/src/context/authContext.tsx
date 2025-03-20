// React
import { createContext, useContext, useEffect, useState } from "react"
import apiClient from "../api/apiClient"

// user interface
interface User {
	id: number
	name: string
	email: string
	birthDate: Date
}

interface AuthContextType {
	user: User | null
	loading: boolean
	updateAuth: (
		id?: number,
		name?: string,
		email?: string,
		birthDate?: Date
	) => void
	login: (username: string, password: string) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) {
			apiClient.defaults.headers.common["Authorization"] = token
			checkAuth()
		} else {
			setLoading(false)
		}
	}, [])

	const checkAuth = async () => {
		/*
		// for testing purposes
		setUser({ id: 1, username: "test" })
		return
		*/
		try {
			const response = await apiClient.get("/auth/me")
			if (response.status === 403) {
				setUser(null)
				setLoading(false)
				return
			}
			const user = response.data
			console.log(response.data)
			setUser({
				id: user.id,
				name: user.name,
				email: user.email,
				birthDate: new Date(user.birthDate),
			})
			setLoading(false)
		} catch (error) {
			setUser(null)
			setLoading(false)
		}
	}

	const updateAuth = async (
		id?: number,
		name?: string,
		email?: string,
		birthDate?: Date
	) => {
		setUser({
			id: id || user!.id,
			name: name || user!.name,
			email: email || user!.email,
			birthDate: birthDate || user!.birthDate,
		})
	}

	const login = async (email: string, password: string) => {
		try {
			const response = await apiClient.post("/auth/login", {
				email,
				password,
			})
			setUser({
				id: response.data.user.id,
				name: response.data.user.name,
				email: response.data.user.email,
				birthDate: new Date(response.data.user.birthDate),
			})
			localStorage.setItem("token", response.data.token)
			await checkAuth()
		} catch (error) {
			console.error(error)
		}
	}

	const logout = async () => {
		await apiClient.post("/auth/logout")
		setUser(null)
		localStorage.removeItem("token")
		apiClient.defaults.headers.common["Authorization"] = ""
	}

	return (
		<AuthContext.Provider
			value={{ user, login, logout, loading, updateAuth }}
		>
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
