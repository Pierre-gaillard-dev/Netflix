import apiClient from "./apiClient"

export const getAllFilms = async () => {
	try {
		const response = await apiClient.get("/films")
		console.log(response.data.length)
		return response.data
	} catch (error) {
		console.error("Error fetching films:", error)
		throw error
	}
}

export const getFilmById = async (id: number) => {
	try {
		const response = await apiClient.get(`/films/${id}`)
		return response.data
	} catch (error) {
		console.error("Error fetching film:", error)
		throw error
	}
}

export const getFilmGenres = async (id: number) => {
	try {
		const response = await apiClient.get(`/films/${id}/genres`)
		return response.data
	} catch (error) {
		console.error("Error fetching film genres:", error)
		throw error
	}
}

export const getFilmByGenre = async (genreId: number) => {
	try {
		const response = await apiClient.get(`/genres/${genreId}/films`)
		return response.data
	} catch (error) {
		console.error("Error fetching films by genre:", error)
		throw error
	}
}
