import axios from "axios";

export const fetcher = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	// baseURL: "http://localhost:5000/api/v1",
	withCredentials: true,
});
