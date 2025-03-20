import apiClient from "./apiClient"

export const searchAll = async (query: string) => {
	try {
		const response = await apiClient.get(`/search?name=${query}`)
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export const searchMovies = async (query: string) => {
	try {
		const response = await apiClient.get(`/search?name=${query}`)
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export const searchSeries = async (query: string) => {
	try {
		const response = await apiClient.get(`/search?name=${query}`)
		return response.data
	} catch (error) {
		console.error(error)
	}
}
