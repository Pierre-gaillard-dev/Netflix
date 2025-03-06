import axios from "axios"

const apiClient = axios.create({
	baseURL: "https://netflix.pierre-gaillard.mds-vannes.yt/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
})

export default apiClient
