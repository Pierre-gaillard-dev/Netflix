import axios from "axios"

const apiClient = axios.create({
	baseURL: "https://netflix.pierre-gaillard.mds-vannes.yt/api",
	//baseURL: "http://192.168.1.19:3000/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
})

export default apiClient
