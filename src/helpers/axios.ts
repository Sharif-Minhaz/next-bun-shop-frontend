import axios from "axios";

export const fetcher = axios.create({
	// baseURL: "http://localhost:5000/api/v1",
	baseURL: "https://next-bun-shop-backend.onrender.com/api/v1",
	withCredentials: true,
});
