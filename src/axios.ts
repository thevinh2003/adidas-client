import axios from "axios";
import authAPI from "./apis/authAPI";

export const makeRequest = axios.create({
	baseURL: "http://localhost:8080",
	withCredentials: true,
});

// Add response interceptor
makeRequest.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		// Check if error status is 401 and message is "Access token expired". Try to refresh access token and resend request
		if (
			error.response.status === 401 &&
			(error.response.data.message === "Access token expired" ||
				error.response.data.message === "Try refreshtoken") &&
			!originalRequest._retry // Check if request has not been retried
		) {
			originalRequest._retry = true; // Set _retry to true to prevent infinite loop
			try {
				const newAccessToken = await authAPI.refreshToken();
				if (newAccessToken) {
					return makeRequest(originalRequest); // Resend original request
				} else {
					window.location.href = "/login";
					return
				}
			} catch (error) {
				window.location.href = "/login";
				return
			}
		}

		// Check if error status is 401 or 403 and redirect to login page
		if (
			(error.response.status === 401 || error.response.status === 403) &&
			error.response.data.redirect === "login"
		) {
			window.location.href = "/login";
			return Promise.reject(error);
		}
		return Promise.reject(error);
	}
);
