import axios from "axios";
import { getDecryptedCookie } from "@/lib/cookieStore";

const createFetcher = () => {
	const token = getDecryptedCookie("auth");

	return axios.create({
		// baseURL: "http://localhost:5000/api/v1",
		baseURL: "https://next-bun-shop-backend.onrender.com/api/v1",
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});
};

export let fetcher = createFetcher();

export const updateFetcherAuth = () => {
	fetcher = createFetcher();
};
