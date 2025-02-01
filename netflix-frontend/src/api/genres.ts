import apiClient from "./apiClient"

export const getAllGenres = async () => {
	try {
		const response = await apiClient.get("/genres")
		return response.data
	} catch (error) {
		console.error("Error fetching genres:", error)
		throw error
	}
}

export const getGenreById = async (id: number) => {
	try {
		const response = await apiClient.get(`/genres/${id}`)
		return response.data
	} catch (error) {
		console.error("Error fetching genre:", error)
		throw error
	}
}
