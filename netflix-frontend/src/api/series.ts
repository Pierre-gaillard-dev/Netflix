import apiClient from "./apiClient"

export const getAllSeries = async (max?: number) => {
	try {
		const response = await apiClient.get(
			`/series${max ? `?max=${max}` : ""}`
		)
		console.log(response.data.length)
		return response.data
	} catch (error) {
		console.error("Error fetching series:", error)
		throw error
	}
}

export const getSeriesByGenre = async (genreId: number, max?: number) => {
	try {
		const response = await apiClient.get(
			`/genres/${genreId}/series${max ? `?max=${max}` : ""}`
		)
		return response.data
	} catch (error) {
		console.error("Error fetching series by genre:", error)
		throw error
	}
}

export const getSerieById = async (id: number) => {
	try {
		const response = await apiClient.get(`/series/${id}`)
		return response.data
	} catch (error) {
		console.error("Error fetching series:", error)
		throw error
	}
}

export const getSerieSeasons = async (id: number) => {
	try {
		const response = await apiClient.get(`/series/${id}/seasons`)
		return response.data
	} catch (error) {
		console.error("Error fetching series seasons:", error)
		throw error
	}
}

export const getSeasonByNumber = async (
	serieId: number,
	seasonNumber: number
) => {
	try {
		const response = await apiClient.get(
			`/series/${serieId}/seasons/${seasonNumber}`
		)
		return response.data
	} catch (error) {
		console.error("Error fetching season:", error)
		throw error
	}
}

export const getSeasonEpisodes = async (
	serieId: number,
	seasonNumber: number
) => {
	try {
		const response = await apiClient.get(
			`/series/${serieId}/seasons/${seasonNumber}/episodes`
		)
		return response.data
	} catch (error) {
		console.error("Error fetching season episodes:", error)
		throw error
	}
}

export const getEpisodeByNumber = async (
	serieId: number,
	seasonNumber: number,
	episodeNumber: number
) => {
	try {
		const response = await apiClient.get(
			`/series/${serieId}/seasons/${seasonNumber}/episodes/${episodeNumber}`
		)
		return response.data
	} catch (error) {
		console.error("Error fetching episode:", error)
		throw error
	}
}
